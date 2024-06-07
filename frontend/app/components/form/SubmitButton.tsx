import { ReactElement } from "react";

export default function SubmitButton({ label, icon } : { label: string, icon?: ReactElement }) {
    return (
        <button type="submit" className="w-32 flex justify-center items-center rounded-xl p-1 border-2 hover:bg-gray-100 transition gap-2">
            {icon}
            {label}
        </button>
    )
}