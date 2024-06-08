"use client";

import { useState } from "react"
import SearchBar from "../components/search/SearchBar"
import { Add } from "@mui/icons-material";

export default function NewJourney() {
    const [journeyName, setJourneyName] = useState("")
    const [departFrom, setDepartFrom] = useState("")
    const [arriveAt, setArriveAt] = useState("")

    return (
        <div className="flex items-center justify-center h-[100vh]">
            <div className="flex flex-col items-center rounded-xl border-gray-300 border w-[80%] min-w-[350px] max-w-[500px]  shadow-lg py-2 gap-4">
                <p className="text-3xl flex items-center gap-2 text-primary font-semibold pt-2 pb-8">Create New Journey</p>
                <input 
                    placeholder="Journey name"
                    className="border-2 border-gray-300 focus:border-secondary focus:outline-none rounded-xl focus:ring-0 py-2 px-2 text-xl w-80 transition"
                    onChange={(ev) => setJourneyName(ev.target.value)}
                    value={journeyName}
                />
                <SearchBar label="Depart from" state={departFrom} setState={setDepartFrom} />
                <SearchBar label="Arrive at" state={arriveAt} setState={setArriveAt} />
                <button
                    className="w-80 flex rounded-xl bg-primary items-center justify-center mt-8 py-1 gap-2 hover:bg-highlight transition mb-8"
                >
                    <Add fontSize="large" htmlColor="#ffffff" />
                    <p className="font-bold text-white">Add Journey</p>
                </button>
            </div>
        </div>
    )
}