import { useState } from "react";
import SearchOption from "./SearchOption";

export default function SearchBar({ label, setState, state } : { label?: string, setState: (value: string) => void, state: string }) {
    let [focused, setFocused] = useState(false)
    let [hovered, setHovered] = useState(false)

    return (
        <div className="flex flex-col">
            <input 
                type="text"
                placeholder={label}
                className="border-2 border-gray-300 focus:border-gray-700 focus:outline-none rounded-xl focus:ring-0 py-2 px-2 text-xl w-80 transition"
                onChange={(ev) => setState(ev.target.value)}
                value={state}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            {state.length >= 3 && (focused || hovered) &&
            <div 
                className="flex cursor-pointer w-80 bg-white border rounded-xl shadow-lg flex-col z-10 absolute top-44"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <SearchOption label="London Charing Cross" setState={setState} />
                <SearchOption label="London Bridge" setState={setState} />
                <SearchOption label="London Victoria" setState={setState} />
                <SearchOption label="London Cannon Street" setState={setState} />
            </div>
            }
        </div>
    )
}