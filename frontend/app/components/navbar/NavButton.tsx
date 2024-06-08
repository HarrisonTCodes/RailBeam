import Link from "next/link";
import { ReactElement } from "react";
import NavOption from "@/app/interfaces/NavOption";

export default function NavButton({ link, label, icon } : NavOption) {
    return (
        <Link href={link} title={label} className="hidden w-16 sm:flex md:w-32 flex-row justify-center items-center rounded-xl p-1 bg-cream-100 hover:bg-cream-200 transition gap-2">
            {icon}
            <p className="hidden md:block text-primary font-bold">{label}</p>
        </Link>
    )
}