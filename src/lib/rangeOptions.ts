import { isValid, startOfDay, subDays } from "date-fns";
import { formatDate } from "./formatter";

export const RANGE_OPTIONS={
    last_7_days:{
        label:"Last 7 days",
        startDate:startOfDay(subDays(new Date(),6)),
        endDate:null
    },
    last_30_days:{
        label:"Last 30 days",
        startDate:startOfDay(subDays(new Date(),29)),
        endDate:null
    },
    last_90_days:{
        label:"Last 90 days",
        startDate:startOfDay(subDays(new Date(),89)),
        endDate:null
    },
    last_365_days:{
        label:"Last 365 days",
        startDate:startOfDay(subDays(new Date(),364)),
        endDate:null
    },
    all_Time:{
        label:"All Time",
        startDate:startOfDay(subDays(new Date(),364)),
        endDate:null
    }
}

export function getRangeOptions(range?:string,from?:string,to?:string){
    if (range==null) {
        const startDate=new Date(from||"")
        const endDate=new Date(to||"")
        if(!isValid(startDate)|| !isValid(endDate)) return
        return {
            label:`${formatDate(startDate)}-${formatDate(endDate)}`,
            startDate,
            endDate
        }
    }

    return RANGE_OPTIONS[range as keyof typeof RANGE_OPTIONS]
}