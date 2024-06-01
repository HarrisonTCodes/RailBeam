import { ReactElement } from "react";

export default function SmallButton({ icon, onClick } : { icon: ReactElement, onClick?: () => void }) {
    return (
        <button onClick={onClick} className="aspect-square border-2 border-gray-300 rounded-xl py-1 px-1 hover:bg-gray-100 transition">
            {icon}
        </button>
    )
}