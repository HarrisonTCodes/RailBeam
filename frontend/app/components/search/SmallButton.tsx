import { ReactElement } from "react";

export default function SmallButton({ icon, onClick } : { icon: ReactElement, onClick?: () => void }) {
    return (
        <button onClick={onClick} className="aspect-square size-[45px] rounded-xl py-1 px-1 bg-secondary hover:bg-highlight transition">
            {icon}
        </button>
    )
}