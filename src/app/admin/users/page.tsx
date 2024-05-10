import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import db from "@/db/db";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatNumber } from "@/lib/formatter";
import {DeleteDropdownItem } from "./_components/userActions";
import {  DropdownMenu,DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

async function getUsers(){
    const users=await db.user.findMany({
        select:{
            id:true,
            email:true,
            orders:{select:{pricePaidInCents:true}}
        },
        orderBy:{createdAt:"desc"}
    })
    return users
}


export default function AdminusersPage(){
    return <>
    <div className="flex justify-between items-center gap-4">
    <PageHeader>users</PageHeader>
    <Button asChild><Link href="/admin/users/new">Add user</Link></Button>
    </div>
    <UsersTable/>
    </>
}

async function UsersTable(){
    
    const users=await getUsers()
    if(users.length===0) return <p>No users found</p>


    return <Table>
       <TableHeader>
            <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="w-0">
                     <span className="sr-only">Actions</span>
                </TableHead>            
                </TableRow>
        </TableHeader>
        <TableBody>
            {users.map(user=>(
                <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{formatNumber(user.orders.length)}</TableCell>
                    <TableCell>{formatCurrency(user.orders.reduce((sum,o)=>o.pricePaidInCents+sum,0)/100)}</TableCell>
                    <TableCell className="text-center">
                        <DropdownMenu>
                        <DropdownMenuTrigger>
                        <MoreVertical/>
                    <span className="sr-only">Actions</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DeleteDropdownItem id={user.id}/>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
}