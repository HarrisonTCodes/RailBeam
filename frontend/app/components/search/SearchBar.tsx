import { ChangeEvent, useState } from "react";
import SearchOption from "./SearchOption";

export default function SearchBar({ label, setState, state } : { label?: string, setState: (value: string) => void, state: string }) {
    let [focused, setFocused] = useState(false)
    let [hovered, setHovered] = useState(false)

    let [data, setData] = useState<string[]>([])

    function getData(prompt: string) {
        fetch(`http://localhost:8000/station/${prompt}`)
        .then(response => response.json())
        .then(stations => {
            stations.map((station: string) => {
                setData(data => [
                    ...data,
                    station
                ])
            })
        })
    }

    function onChange(ev: ChangeEvent<HTMLInputElement>) {
        setState(ev.target.value)
        if ([3, 9].includes(ev.target.value.length)) { //when input is either 3 or 9 characters long
            setData([])
            getData(ev.target.value)
        }
    }

    return (
        <div className="flex flex-col">
            <input 
                type="text"
                placeholder={label}
                className="border-2 border-gray-300 focus:border-gray-700 focus:outline-none rounded-xl focus:ring-0 py-2 px-2 text-xl w-80 transition"
                onChange={onChange}
                value={state}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            {state.length >= 3 && data.length > 0 && (focused || hovered) &&
            <div 
                className="flex cursor-pointer w-80 bg-white border rounded-xl shadow-lg flex-col z-1 absolute top-44 max-h-60 overflow-y-scroll"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {data.map((station) => {
                    return <SearchOption label={station} setState={setState} key={station}/>
                })}
            </div>
            }
        </div>
    )
}