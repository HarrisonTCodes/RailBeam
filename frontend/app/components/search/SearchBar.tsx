export default function SearchBar({ label, setState, state } : { label?: string, setState: (value: string) => void, state: string }) {
    return (
        <input 
            type="text"
            placeholder={label}
            className="border-2 border-gray-300 focus:border-gray-700 focus:outline-none rounded-xl focus:ring-0 py-2 px-2 text-xl w-80 transition"
            onChange={(ev) => setState(ev.target.value)}
            value={state}
        />
    )
}