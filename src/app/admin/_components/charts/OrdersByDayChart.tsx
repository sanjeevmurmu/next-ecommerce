"use client"
import { formatCurrency } from "@/lib/formatter"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"



type OrdersByDayChartProps={
    data:{
        date:string,
        totalSales:number
    }[]
}


export function OrdersByDayChart({data}:OrdersByDayChartProps) {
    return <ResponsiveContainer width="100%" minHeight={300}>
        <LineChart data={data}>
            <CartesianGrid stroke="hsl(var(--muted))" />
            <XAxis dataKey="date" stroke="hsl(var(--primary))" />
            <YAxis tickFormatter={tick => formatCurrency(tick)} stroke="hsl(var(--primary))" />
            <Tooltip formatter={value => formatCurrency(value as number)} />
            <Line dataKey="totalSales" type="monotone" name="Total Sales" dot={false} />
        </LineChart>
    </ResponsiveContainer>
}