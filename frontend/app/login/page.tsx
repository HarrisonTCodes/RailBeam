import { Login, Person } from "@mui/icons-material"
import InputField from "../components/form/InputField"
import FormButton from "../components/form/FormButton"

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center h-[100vh]">
            <div className="flex flex-col items-center rounded-xl border-gray-300 border w-[60%] min-w-[300px] max-w-[500px] h-[50%] shadow-lg py-2">
                <p className="text-2xl flex items-center gap-2"><Person fontSize="large" /> Login to RailBeam</p>
                <form action="" className="flex flex-col items-center gap-4 pt-4">
                    <InputField name="username" placeholder="Username" />
                    <InputField name="password" placeholder="Password" type="password" />
                    <FormButton label="Login" icon={<Login fontSize="large" />} type="submit" />
                </form>
            </div>
        </div>
    )
}