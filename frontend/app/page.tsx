"use client";

import { Search, SwapHoriz } from "@mui/icons-material"
import SearchBar from "./components/search/SearchBar"
import SmallButton from "./components/search/SmallButton"
import { useRef, useState } from "react"
import Trains, { TrainsRef } from "./components/train/Trains";

export default function Home() {
    const [departFrom, setDepartFrom] = useState<string>("")
    const [arriveAt, setArriveAt] = useState<string>("")

    const trainsRef = useRef<TrainsRef>(null)

    function switchStations () {
        let departTemp = departFrom
        let arriveTemp = arriveAt
        setDepartFrom(arriveTemp)
        setArriveAt(departTemp)
    }

    return (
        <>
            <div className="pt-32 pb-8 px-2 flex flex-col md:flex-row justify-center items-center gap-8">
                <SearchBar label="Depart from" setState={setDepartFrom} state={departFrom} />
                <SearchBar label="Arrive at"  setState={setArriveAt} state={arriveAt} />
                <div className="flex gap-4">
                    <SmallButton icon={<Search fontSize="large" htmlColor="#ffffff" />} onClick={() => trainsRef.current?.getData(departFrom, arriveAt)} />
                    <SmallButton icon={<SwapHoriz fontSize="large" htmlColor="#ffffff" />} onClick={switchStations} />
                </div>
            </div>
            <Trains ref={trainsRef} />
        </>
    )
}