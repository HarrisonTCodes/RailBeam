"use client";

import { useEffect, useMemo, useRef, useState } from "react"
import SmallButton from "../components/search/SmallButton";
import { Add, ArrowBack, Refresh, SwapHoriz } from "@mui/icons-material"
import Link from "next/link";
import JourneyInfo from "../interfaces/JourneyInfo";
import JourneyWidget from "../components/journey/JourneyWidget";
import Trains, { TrainsRef } from "../components/train/Trains";

export default function JourneysPage() {
    const [journeySearch, setJourneySearch] = useState("")
    const [journeys, setJourneys] = useState([])
    const [selectedJourney, setSelectedJourney] = useState<JourneyInfo|null>(null)
    const [switched, setSwitched] = useState(false)

    const trainsRef = useRef<TrainsRef>(null)

    useEffect(() => {
        setJourneys(JSON.parse(localStorage.getItem("journeys")!))
    }, [])

    useEffect(() => {
        if (selectedJourney !== null) {
            trainsRef.current?.getData(selectedJourney.firstStation, selectedJourney.secondStation)
        }
    }, [selectedJourney])

    const filteredJourneys = useMemo(() => {
        if (journeys === null) {
            return []
        }
        return journeys.filter((journey: JourneyInfo) => journey.name.toLowerCase().includes(journeySearch.toLowerCase()))
    }, [journeys, journeySearch])

    function deleteJourney(name: string) {
        let newJourneys = journeys.filter((journey: JourneyInfo) => journey.name != name)
        setJourneys(newJourneys)
        localStorage.setItem("journeys", JSON.stringify(newJourneys))
    }

    function openJourney(journey: JourneyInfo) {
        setSelectedJourney(journey)
        setSwitched(false)
    }

    function switchStations() {
        if (switched) {
            trainsRef.current?.getData(selectedJourney!.firstStation, selectedJourney!.secondStation)
        } else {
            trainsRef.current?.getData(selectedJourney!.secondStation, selectedJourney!.firstStation)
        }
        setSwitched(!switched)
    }

    return (
        <>
            {selectedJourney === null ?

            <>
            {/* list of journeys */}
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
            <div className="flex flex-col items-center gap-4 mb-16">
                {filteredJourneys.map((journey: JourneyInfo, index) => {
                    return <JourneyWidget {...journey} deleteFunction={() => deleteJourney(journey.name)} openFunction={() => openJourney(journey)} key={`journey${index}`} />
                })}
            </div>
            </>

            :

            <>
            {/* specific journey */}
            <p className="flex justify-center gap-2 pt-32 pb-4 text-center text-3xl font-semibold text-primary">
                <button onClick={() => setSelectedJourney(null)}>
                    <ArrowBack fontSize="large" htmlColor="#142c8e" />
                </button>
                {selectedJourney!.name}
            </p>
            <p className="text-center text-gray-400">
                {!switched ?
                `${selectedJourney.firstStation} to ${selectedJourney.secondStation}`
                :
                `${selectedJourney.secondStation} to ${selectedJourney.firstStation}`
                }
                </p>
            <div className="flex justify-center py-4 gap-4">
                <SmallButton icon={<SwapHoriz fontSize="large" htmlColor="#ffffff" />} onClick={switchStations} />
            </div>
            <Trains ref={trainsRef} />
            </>
            }
        </>
    )
}