from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from dotenv import load_dotenv
import requests
import os
import json

#FastAPI config
app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

load_dotenv()
token = os.getenv("TOKEN") #store OpenLDBWS API token here

#load station names/crs
with open("stations.json", "r") as file:
    stations = json.load(file)

#calculate duration between 2 string times
def duration(t1, t2):
    return (datetime.strptime(t2, "%H:%M") - datetime.strptime(t1, "%H:%M")) / 60

#GET service IDs from one station to another
@app.get("/service-id/{from_name}/{to_name}")
def service_id(from_name: str, to_name: str):
    #convert station names to crs
    (from_crs, to_crs) = (stations.get(from_name.lower()), stations.get(to_name.lower()))
    if not all((from_crs, to_crs)): raise HTTPException(status_code=400, detail="Bad request")
    
    #get IDs
    huxley_response = requests.get(f"https://huxley2.azurewebsites.net/departures/{from_crs}/to/{to_crs}/?accessToken={token}")

    if huxley_response.status_code == 200:
        train_services = huxley_response.json()["trainServices"]
        service_ids = [train_service["serviceIdPercentEncoded"] for train_service in train_services]
        return service_ids
    else:
        raise HTTPException(status_code=400, detail="Bad request")

#GET service info from ID, plus info about given calling point from station name
@app.get("/service/{service_id}/{to_name}")
def service(service_id: str, to_name: str):
    #convert station name to crs
    to_crs = stations.get(to_name.lower())
    if not to_crs: raise HTTPException(status_code=400, detail="Bad request")

    #get service info
    service_response = requests.get(f"https://huxley2.azurewebsites.net/service/{service_id}/?accessToken={token}")

    if service_response.status_code == 200:
        service_data = service_response.json()
        subsequent_calling_points = service_data["subsequentCallingPoints"][0]["callingPoint"]
        try:
            arrival_data = next(filter(lambda point: point["crs"] == to_crs, subsequent_calling_points))
        except Exception as error:
            print(error)
            raise HTTPException(status_code=400, detail="Bad request")
        return {
            "platform": service_data["platform"],
            "fromCrs": service_data["crs"],
            "departTime": service_data["std"],
            "estimatedDepartTime": service_data["etd"],
            "toCrs": to_crs,
            "arriveTime": arrival_data["st"],
            "estimatedArriveTime": arrival_data["et"],
            "duration": duration(service_data["std"], arrival_data["st"])
        }
    else:
        raise HTTPException(status_code=400, detail="Bad request")

#get station names that begin with a given prompt
@app.get("/station/{prompt}")
def station(prompt: str):
    return [station_name for station_name in stations.keys() if station_name[0:len(prompt)] == prompt]