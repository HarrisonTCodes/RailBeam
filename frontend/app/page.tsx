"use client";

import { Search, Bookmark, BookmarkBorder, SwapHoriz } from "@mui/icons-material"
import SearchBar from "./components/search/SearchBar"
import SmallButton from "./components/search/SmallButton"
import { useMemo, useState } from "react"
import TrainInfo from "./interfaces/TrainInfo";
import TrainWidget from "./components/train/TrainWidget";

export default function Home() {
    const [saved, setSaved] = useState<boolean>(false)

    const [departFrom, setDepartFrom] = useState<string>("")
    const [arriveAt, setArriveAt] = useState<string>("")

    const [data, setData] = useState<TrainInfo[]>([])
    const [err, setErr] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    function getData(fromCrs: string, toCrs: string) {
        setData([])
        setLoading(true)
        setErr(false)
        fetch(`http://localhost:8000/service-id/${fromCrs}/${toCrs}`) //pull service ids
        .then(response => response.json())
        .then(serviceIds => {

            if (serviceIds.length == 0) { //if there are no services
                setErr(true)
            }

            serviceIds.map((id: string) => {
                fetch(`http://localhost:8000/service/${id}/${toCrs}`) //pull service data from id
                .then(response => {
                    setLoading(false)
                    return response.json()
                })
                .then(service => {
                    if (service) {
                        setData(data => [
                            ...data,
                            service
                        ])
                    }
                })
            })

        })
        .catch(err => {
            console.error(err)
            setErr(true)
        })
    }

    function switchStations () {
        let departTemp = departFrom
        let arriveTemp = arriveAt
        setDepartFrom(arriveTemp)
        setArriveAt(departTemp)
    }

    function compareTimes(a: string, b: string) { //handle sorting trains that go beyond midnight, as 00 < 23
        let aHours = Number(a[0] + a[1])
        let bHours = Number(b[0] + b[1])
        if (aHours < 3) { //assume trains before midnight will only ever be in the same journey group as trains before 3am
            a = `${aHours + 24}${a.slice(2)}`
            console.log("YES")
        } if (bHours < 3) {
            b = `${bHours + 24}${b.slice(2)}`
            console.log("YES")
        }
        return a > b ? 1 : -1
    }

    //all services, sorted by departure time
    const sortedData = useMemo(() => {
        let copy = [...data]
        copy.sort((a,b) => compareTimes(a.departTime, b.departTime))
        return copy
    }, [data])

    //average duration
    const averageDuration = useMemo(() => {
        let sum = data.reduce((accumulator: number, service: TrainInfo) => accumulator + service.duration, 0)
        return sum / data.length
    }, [data])

    return (
        <>
            <div className="pt-32 pb-8 px-2 flex flex-col md:flex-row justify-center items-center gap-8">
                <SearchBar label="Depart from" setState={setDepartFrom} state={departFrom} />
                <SearchBar label="Arrive at"  setState={setArriveAt} state={arriveAt} />
                <div className="flex gap-4">
                    <SmallButton icon={<Search fontSize="large" />} onClick={() => getData(departFrom, arriveAt)} />
                    <SmallButton icon={<SwapHoriz fontSize="large"/>} onClick={switchStations} />
                    <SmallButton icon={saved ? <Bookmark fontSize="large" /> : <BookmarkBorder fontSize="large" />} onClick={() => setSaved(!saved)}/>
                </div>
            </div>

            <div className="flex flex-col items-center gap-4 mb-16">
                {sortedData.map((train, index) => {
                    return <TrainWidget {...train} key={index} averageDuration={averageDuration} />
                })}
                {err ? <p className="text-3xl text-gray-400 pt-20 text-center">No services found.</p> : <></>}
                {loading && !err ? <p className="text-3xl text-gray-400 pt-20 text-center">Loading...</p> : <></>}
            </div>
        </>
    )
}