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
    dur = (datetime.strptime(t2, "%H:%M") - datetime.strptime(t1, "%H:%M")).total_seconds() / 60
    if dur < 0: dur = 1440 + dur #account for trains that depart and arrive on different days (late trains)
    return dur

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
        try:
            service_ids = [train_service["serviceIdPercentEncoded"] for train_service in train_services]
        except TypeError as type_error: #if no service ids returned (valid stations, but no live journeys)
            print(type_error)
            service_ids = []
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

        #get data about arrival calling point
        try:
            arrival_data = next(filter(lambda point: point["crs"] == to_crs, subsequent_calling_points))
        except Exception as error:
            print(error)
            raise HTTPException(status_code=400, detail="Bad request")
        
        #calculate cancellation and duration
        cancelled =  "Cancelled" in (arrival_data["et"], service_data["etd"])
        departTime = service_data["std"] if service_data["std"] else service_data["sta"] #when services are cancelled, std is sometimes null
        serviceDuration = duration(departTime, arrival_data["st"])
        
        return {
            "platform": service_data["platform"],
            "fromCrs": service_data["crs"],
            "departTime": departTime,
            "estimatedDepartTime": service_data["etd"] if not cancelled else "Cancelled",
            "toCrs": to_crs,
            "arriveTime": arrival_data["st"],
            "estimatedArriveTime": arrival_data["et"] if not cancelled else "Cancelled",
            "duration": serviceDuration,
            "cancelled": cancelled
        }
    
    else:
        raise HTTPException(status_code=400, detail="Bad request")

#get station names that begin with a given prompt
@app.get("/station/{prompt}")
def station(prompt: str):
    return [station_name.title() for station_name in stations.keys() if station_name[0:len(prompt)] == prompt]