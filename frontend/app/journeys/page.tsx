"use client";

import { useState } from "react"
import SmallButton from "../components/search/SmallButton";
import { Add } from "@mui/icons-material"
import Link from "next/link";

export default function JourneysPage() {
    const [journeySearch, setJourneySearch] = useState("")

    return (
        <>
            <p className="pt-32 pb-8 text-center text-3xl font-semibold text-primary">Train Journeys</p>
            <div className="pb-8 px-2 flex flex-col sm:flex-row justify-center items-center gap-8">
                <input 
                    type="text"
                    placeholder="Search journeys"
                    className="border-2 border-gray-300 focus:border-secondary focus:outline-none rounded-xl focus:ring-0 py-2 px-2 text-xl w-80 transition"
                    onChange={(ev) => setJourneySearch(ev.target.value)}
                    value={journeySearch}
                />
                <Link href={"/new-journey"}>
                    <SmallButton icon={<Add fontSize="large" htmlColor="#ffffff" />} />
                </Link>
            </div>
        </>
    )
}