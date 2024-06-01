export default interface TrainInfo {
    platform: string,
    fromCrs: string;
    departTime: string;
    estimatedDepartTime: string;
    toCrs: string;
    arriveTime: string;
    estimatedArriveTime: string;
    duration: number;
    averageDuration: number;
}