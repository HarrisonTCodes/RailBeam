import TrainInfo from "@/app/interfaces/TrainInfo";

export default function TrainWidget({ platform, fromCrs, departTime, estimatedDepartTime, toCrs, arriveTime, estimatedArriveTime, duration, averageDuration } : TrainInfo) {
    return (
        <div className="flex border-2 border-gray-300 rounded-xl max-w-[820px] w-[85%] divide-x-2">
            <section className="flex-1 flex-grow flex flex-col items-center gap-1">
                <p>{fromCrs} {platform ? `P${platform}` : ""}</p>
                <p className="text-3xl">{departTime}</p>
                <p className="text-gray-400">{estimatedDepartTime ? `${estimatedDepartTime}` : "Imminent"}</p>
            </section>
            <section className="flex-1 flex-grow flex flex-col items-center gap-1">
                <p>{toCrs}</p>
                <p className="text-3xl">{arriveTime}</p>
                <p className="text-gray-400">{estimatedArriveTime}</p>
            </section>
            <section className="flex-1 flex-grow flex flex-col items-center gap-1">
                <p>DURATION</p>
                <p className="text-3xl">{duration.toString()}m</p>
                <p className="text-gray-400">{duration > averageDuration ? "Slow" : "Fast"}</p>
            </section>
        </div>
    )
}