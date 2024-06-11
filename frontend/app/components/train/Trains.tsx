import TrainInfo from "@/app/interfaces/TrainInfo"
import { Warning } from "@mui/icons-material"
import { useState, Ref, useImperativeHandle, useMemo, forwardRef, useEffect } from "react"
import TrainWidget from "./TrainWidget"
import TrainWidgetSkeleton from "./TrainWidgetSkeleton"

export type TrainsRef = {
    getData: (fromName: string, toName: string) => void;
}

function Trains({}, ref: Ref<TrainsRef>) {
    const [data, setData] = useState<TrainInfo[]>([])
    const [err, setErr] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    function getData(fromName: string, toName: string) {
        //initialise states
        setData([])
        setLoading(true)
        setErr(false)
        
        fetch(`${process.env.apiBase}/service-id/${fromName}/${toName}`) //pull service ids
        .then(response => response.json())
        .then(serviceIds => {

            if (serviceIds.length == 0) { //if there are no services
                setErr(true)
            }

            serviceIds.map((id: string) => {
                fetch(`${process.env.apiBase}/service/${id}/${toName}`) //pull service data from id
                .then(response => {
                    setLoading(false)
                    return response.json()
                })
                .then(service => {
                    if (service) {
                        setData(data => [
                            ...data,
                            service
                        ])
                    }
                })
            })

        })
        .catch(err => {
            console.error(err)
            setErr(true)
        })
    }

    useImperativeHandle(ref, () => ({
        getData
    }))

    function compareTimes(a: string, b: string) { //handle sorting trains that go beyond midnight, as 00 < 23
        let aHours = Number(a[0] + a[1])
        let bHours = Number(b[0] + b[1])
        if (aHours < 3) { //assume trains before midnight will only ever be in the same journey group as trains before 3am
            a = `${aHours + 24}${a.slice(2)}`
        } if (bHours < 3) {
            b = `${bHours + 24}${b.slice(2)}`
        }
        return a > b ? 1 : -1
    }

    //all services, sorted by departure time
    const sortedData = useMemo(() => {
        let copy = [...data]
        copy.sort((a,b) => compareTimes(a.departTime, b.departTime))
        return copy
    }, [data])

    //average duration
    const averageDuration = useMemo(() => {
        let sum = data.reduce((accumulator: number, service: TrainInfo) => accumulator + service.duration, 0)
        return sum / data.length
    }, [data])

    return (
        <div className="flex flex-col items-center gap-4 mb-16">
                {/* services */}
                {sortedData.map((train: TrainInfo, index) => {
                    return <TrainWidget {...train} key={`train${index}`} averageDuration={averageDuration} />
                })}

                {/* error message */}
                {err ? <p className="flex gap-2 text-3xl text-failure pt-4 font-semibold"><Warning fontSize="large"/> No services found</p> : <></>}

                {/* loading skeletons */}
                {loading && !err ? [...Array(6)].map((_, index) => <TrainWidgetSkeleton key={`skeleton${index}`} />) : <></>}
            </div>
    )
}

export default forwardRef(Trains)