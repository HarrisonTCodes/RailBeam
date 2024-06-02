"use client";

import Link from "next/link";
import { Person, Train, Bookmarks, Menu, Search } from '@mui/icons-material';
import NavButton from "./NavButton";
import MenuPanelButton from "./MenuPanelButton";
import { useState } from "react";

export default function Navbar() {
    const [menuPanelOpen, setMenuPanelOpen] = useState<boolean>(false)
    const buttonData = [
        {link:"/", label:"Search", icon:<Search fontSize="large" />},
        {link:"/journeys", label:"Journeys", icon:<Bookmarks fontSize="large" />},
        {link:"/account", label:"Account", icon:<Person fontSize="large" />}
    ]

    return (
        <nav className="w-full fixed border-b-2 border-gray-300 py-6 flex justify-between px-2 items-center bg-white z-10">
            <Link href={"/"} className="text-3xl">
                <p className="flex flex-row"><Train fontSize="large"/>RailBeam</p>
            </Link>

            <div className="flex gap-4">
                {buttonData.map((data) => {
                    return <NavButton {...data} key={data.label} />
                })}

                <div className="cursor-pointer flex sm:hidden flex-row items-center rounded-xl py-1 px-1 border-2 hover:bg-gray-100 transition"
                     onClick={() => setMenuPanelOpen(!menuPanelOpen)}
                >
                    <Menu fontSize="large" />
                </div>
            </div>
            {menuPanelOpen && 
            <div className="flex sm:hidden cursor-pointer w-[180px] absolute top-[80px] right-0 bg-white border rounded-xl shadow-lg flex-col">
                {buttonData.map((data) => {
                    return <MenuPanelButton {...data} key={data.label} />
                })}
            </div>
            }
        </nav>
    )
}