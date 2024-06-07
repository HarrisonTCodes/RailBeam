import { ReactElement } from "react";

export default function FormButton({ onClick, label, icon, type } : { onClick?: () => void, label: string, icon?: ReactElement, type?: "submit" }) {
    return (
        <button type={type} onClick={onClick} className="text-lg w-72 flex justify-center items-center rounded-xl p-1 border-2 hover:bg-gray-100 transition gap-4">
            {icon}
            {label}
        </button>
    )
}