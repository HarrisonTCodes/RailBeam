"use client";

import { Login, Person, PersonAdd } from "@mui/icons-material"
import FormButton from "../components/form/FormButton"
import { useState } from "react"
import Link from "next/link";

export default function RegisterPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    return (
        <div className="flex items-center justify-center h-[100vh]">
            <div className="flex flex-col items-center rounded-xl border-gray-300 border w-[60%] min-w-[300px] max-w-[500px] h-[50%] shadow-lg py-2 gap-4">
                <p className="text-2xl flex items-center gap-2"><Person fontSize="large" /> Register for RailBeam</p>
                <input 
                    placeholder="Username"
                    className="border-2 border-gray-300 focus:border-gray-700 focus:outline-none rounded-xl focus:ring-0 py-2 px-2 text-lg w-72 transition"
                    onChange={(ev) => setUsername(ev.target.value)}
                    value={username}
                />
                <input 
                    placeholder="Password"
                    type="password"
                    className="border-2 border-gray-300 focus:border-gray-700 focus:outline-none rounded-xl focus:ring-0 py-2 px-2 text-lg w-72 transition"
                    onChange={(ev) => setPassword(ev.target.value)}
                    value={password}
                />
                <input 
                    placeholder="Confirm password"
                    type="password"
                    className="border-2 border-gray-300 focus:border-gray-700 focus:outline-none rounded-xl focus:ring-0 py-2 px-2 text-lg w-72 transition mb-8"
                    onChange={(ev) => setConfirmPassword(ev.target.value)}
                    value={confirmPassword}
                />
                <FormButton label="Register" icon={<PersonAdd fontSize="large" />} />
            </div>
        </div>
    )
}