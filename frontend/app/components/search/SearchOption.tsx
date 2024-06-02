export default function SearchOption({ label, setState } : { label: string, setState: (value: string) => void }) {
    return (
        <button 
            className="flex cursor-pointer px-2 py-4 hover:bg-gray-100 transition justify-start items-center gap-2" 
            onClick={() => setState(label)}
        >
            {label}
        </button>
    )
}