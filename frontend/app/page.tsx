"use client";

import { Search, Bookmark, BookmarkBorder } from "@mui/icons-material"
import SearchBar from "./components/search/SearchBar"
import SmallButton from "./components/search/SmallButton"
import { useEffect, useMemo, useState } from "react"
import TrainInfo from "./interfaces/TrainInfo";
import TrainWidget from "./components/train/TrainWidget";

export default function Home() {
    const [saved, setSaved] = useState<boolean>(false)

    const [departFrom, setDepartFrom] = useState<string>("")
    const [arriveAt, setArriveAt] = useState<string>("")

    const [data, setData] = useState<TrainInfo[]>([])
    const [err, setErr] = useState<boolean>()

    function getData(fromCrs: string, toCrs: string) {
        setData([])
        setErr(false)
        fetch(`http://localhost:8000/service-id/${fromCrs}/${toCrs}`) //pull service ids
        .then(response => response.json())
        .then(serviceIds => {

            if (serviceIds.length == 0) {
                setErr(true)
            }

            serviceIds.map((id: string) => {
                fetch(`http://localhost:8000/service/${id}/${toCrs}`) //pull service data from id
                .then(response => response.json())
                .then(service => {
                    setData(data => [
                        ...data,
                        service
                    ])
                })
            })

        })
        .catch(err => {
            console.error(err)
            setErr(true)
        })
    }

    function compareTimes(a: string, b: string) { //handle sorting trains that go beyond midnight, as 00 < 23
        let ah = Number(a[0]+a[1])
        let bh = Number (b[1]+b[1])
        if (ah < 3) { //assume trains before midnight will only ever be in the same journey group as trains before 3am
            a = `${ah+24}${a.slice(2)}`
        } if (bh < 3) {
            b = `${bh+24}${b.slice(2)}`
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
        let filteredData = [...data].filter((service: TrainInfo) => service.duration != 0) //remove cancelled trains (where duration is 0)
        let sum = filteredData.reduce((accumulator: number, service: TrainInfo) => accumulator + service.duration, 0)
        return sum / filteredData.length
    }, [data])

    return (
        <>
            <div className="pt-32 pb-8 px-2 flex flex-col md:flex-row justify-center items-center gap-8">
                <SearchBar label="Depart from" setState={setDepartFrom} />
                <SearchBar label="Arrive at"  setState={setArriveAt} />
                <div className="flex gap-4">
                    <SmallButton icon={<Search fontSize="large" />} onClick={() => getData(departFrom, arriveAt)} />
                    <SmallButton icon={saved ? <Bookmark fontSize="large" /> : <BookmarkBorder fontSize="large" />} onClick={() => setSaved(!saved)}/>
                </div>
            </div>

            <div className="flex flex-col items-center gap-4 mb-16">
                {sortedData.map((train, index) => {
                    return <TrainWidget {...train} key={index} averageDuration={averageDuration} />
                })}
                {err ? <p className="text-3xl text-gray-400 pt-20 text-center">No journeys found.</p> : <></>}
            </div>
        </>
    )
}