import JourneyInfo from "@/app/interfaces/JourneyInfo";
import SmallButton from "../search/SmallButton";
import { Delete, OpenInNew } from "@mui/icons-material";

export default function JourneyWidget({ name, firstStation, secondStation } : JourneyInfo) {
    return (
        <div className="flex justify-between border border-gray-300 rounded-xl p-2 max-w-[600px] w-[90%] bg-white">
            <section className="max-w-[60%]">
                <p className="text-2xl font-medium text-primary">{name}</p>
                <p className="text-gray-400">{firstStation}</p>
                <p className="text-gray-400">{secondStation}</p>
            </section>
            <section className="flex items-center gap-4">
                <SmallButton icon={<OpenInNew fontSize="medium" htmlColor="#ffffff" />} />
                <SmallButton icon={<Delete fontSize="medium" htmlColor="#ffffff" />} />
            </section>
        </div>
    )
}