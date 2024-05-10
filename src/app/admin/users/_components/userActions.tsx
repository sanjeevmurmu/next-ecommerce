'use client'
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { deleteUser } from "../../_actions/user";
import { useRouter } from "next/navigation";



export function DeleteDropdownItem({id}:{id:string}){
    const [isPending,startTransition]=useTransition()
    const router=useRouter()
    return (<DropdownMenuItem variant="destructive" disabled={isPending} onClick={()=>startTransition(async()=>{
        await deleteUser(id)
        router.refresh()
    })}> Delete
    </DropdownMenuItem>)
}