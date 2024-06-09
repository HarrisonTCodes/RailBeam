import JourneyInfo from "@/app/interfaces/JourneyInfo";

export default function Journey({ name, firstStation, secondStation } : JourneyInfo) {
    return (
        <div className="flex justify-between border border-gray-300 rounded-xl p-2 max-w-[810px] w-[90%] bg-white">
            <section>
                <p className="text-2xl font-medium text-primary">{name}</p>
            </section>
        </div>
    )
}