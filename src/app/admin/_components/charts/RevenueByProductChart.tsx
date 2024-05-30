"use client"
import { formatCurrency } from "@/lib/formatter"
import {Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts"



type RevenueByProductChartProps={
    data:{
        name:string,
        revenue:number
    }[]
}


export function RevenueByProductChart({data}:RevenueByProductChartProps) {
    return <ResponsiveContainer width="100%" minHeight={300}>
        <PieChart>
            <Tooltip formatter={value => formatCurrency(value as number)} />
            <Pie data={data} dataKey="revenue" type="monotone" nameKey="name" label={item=>item.name}/>
        </PieChart>
    </ResponsiveContainer>
}