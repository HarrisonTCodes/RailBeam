import TrainInfo from "@/app/interfaces/TrainInfo";

export default function TrainWidget({ platform, fromCrs, departTime, estimatedDepartTime, toCrs, arriveTime, estimatedArriveTime } : TrainInfo) {
    function duration(t1: string, t2: string) {
        let [h1, m1] = t1.split(":").map((s) => Number(s))
        let [h2, m2] = t2.split(":").map((s) => Number(s))
        let h = (m2-m1) < 0 ? (h2-h1)-1 : h2-h1
        let m = (m2-m1) < 0 ? 60 + (m2-m1) : m2-m1
        return (60*h) + m
    }

    return (
        <div className="flex border-2 border-gray-300 rounded-xl max-w-[820px] w-[85%] divide-x-2">
            <section className="flex-1 flex-grow flex flex-col items-center gap-1 ">
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
                <p className="text-3xl">{duration(departTime, arriveTime)}m</p>
            </section>
        </div>
    )
}