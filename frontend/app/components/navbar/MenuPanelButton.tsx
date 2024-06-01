import NavOption from "@/app/interfaces/NavOption";
import Link from "next/link";

export default function MenuPanelButton({ link, label, icon } : NavOption) {
    return (
        <Link href={link} className="flex cursor-pointer px-2 py-4 hover:bg-gray-100 transition justify-start items-center gap-2">
            {icon}
            <p>{label}</p>
        </Link>
    )
}