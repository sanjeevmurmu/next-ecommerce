"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { RANGE_OPTIONS } from "@/lib/rangeOptions"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu"
import { ReactNode, useState } from "react"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { DropdownMenuSeparator, DropdownMenuSubContent } from "@radix-ui/react-dropdown-menu"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"
import { subDays } from "date-fns"

type ChartCardProps={
    title:string
    queryKey:string
    selectedRangeLabel:string
    children:ReactNode
}

export function ChartCard({title,children,queryKey,selectedRangeLabel}:ChartCardProps){

    const searchParmas=useSearchParams()
    const router=useRouter()
    const pathname=usePathname()
    const [dateRange, setDateRange] = useState<DateRange|undefined>({
        from:subDays(new Date(),29),
        to:new Date()
    })
    function setRange(range:keyof typeof RANGE_OPTIONS|DateRange){

        const params=new URLSearchParams(searchParmas)
        if(typeof range==="string"){
            params.set(queryKey,range)
            params.delete(`${queryKey}From`)
            params.delete(`${queryKey}To`)
        }
        else{
             if(range.from==null || range.to==null) return
            
             params.delete(queryKey)
             params.set(`${queryKey}From`,range.from.toISOString())
             params.set(`${queryKey}To`,range.to.toISOString())
        }
        
        router.push(`${pathname}?${params.toString()}`,{scroll:false})
    }



    return (<Card>
    <CardHeader>
        <div className="flex gap-4 justify-between items-center">
    <CardTitle>{title}</CardTitle>
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline">
                {selectedRangeLabel}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
           {Object.entries(RANGE_OPTIONS).map(([key,value])=><DropdownMenuItem key={key} onClick={()=>setRange(key as keyof typeof RANGE_OPTIONS)}>
                {value.label}
           </DropdownMenuItem>)}
           <DropdownMenuSeparator/>
           <DropdownMenuSub>
            <DropdownMenuSubTrigger>Custom</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
                <div><Calendar mode="range" className="bg-white" disabled={{after:new Date()}} selected={dateRange} defaultMonth={dateRange?.from} onSelect={setDateRange} numberOfMonths={2}/>
                <DropdownMenuItem className="hover:bg-auto" onClick={()=>{
                    if(dateRange==null) return
                    setDateRange(dateRange)
                }}>
                <Button disabled={dateRange==null}
                className="w-full"  onClick={()=>{
                    if(dateRange==null) return
                    setRange(dateRange)
                }}>Submit</Button>
                </DropdownMenuItem>
                </div>
            </DropdownMenuSubContent>
           </DropdownMenuSub>
        </DropdownMenuContent>
    </DropdownMenu>
    </div>
    </CardHeader>
    <CardContent>
        {children}
    </CardContent>
</Card>)
}