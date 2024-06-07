import Link from "next/link";
import { ReactElement } from "react";
import NavOption from "@/app/interfaces/NavOption";

export default function NavButton({ link, label, icon } : NavOption) {
    return (
        <Link href={link} title={label} className="hidden w-16 sm:flex md:w-32 flex-row justify-center items-center rounded-xl p-1 border-2 hover:bg-gray-100 transition gap-2">
            {icon}
            <p className="hidden md:block">{label}</p>
        </Link>
    )
}