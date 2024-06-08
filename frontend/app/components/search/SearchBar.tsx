import { ChangeEvent, useState } from "react";
import SearchOption from "./SearchOption";

export default function SearchBar({ label, setState, state } : { label?: string, setState: (value: string) => void, state: string }) {
    let [focused, setFocused] = useState(false)
    let [hovered, setHovered] = useState(false)

    let [data, setData] = useState<string[]>([])

    function getData(prompt: string) {
        fetch(`${process.env.apiBase}/station/${prompt}`)
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
        let backspace = (ev.target.value.length - state.length) == -1 //get whether backspace was pressed by comparing old and new values
        setState(ev.target.value) //set value to changed input
        if ([3, 9].includes(ev.target.value.length) && !backspace) { //when input is either 3 or 9 characters long, and backspace wasn't pressed
            setData([])
            getData(ev.target.value) //call API
        }
    }

    return (
        <div className="flex flex-col">
            <input 
                type="text"
                placeholder={label}
                className="border-2 border-gray-300 focus:border-secondary focus:outline-none rounded-xl focus:ring-0 py-2 px-2 text-xl w-72 transition"
                onChange={onChange}
                value={state}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            {state.length >= 3 && data.length > 0 && (focused || hovered) &&
            <div 
                className={`flex cursor-pointer w-72 bg-white border rounded-xl shadow-lg flex-col z-1 absolute max-h-60 overflow-y-scroll mt-12`}
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