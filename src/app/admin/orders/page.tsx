import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import db from "@/db/db";
import {MoreVertical} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatNumber } from "@/lib/formatter";
import {DeleteDropdownItem } from "./_components/orderActions";
import {  DropdownMenu,DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

async function getorders(){
    const orders=await db.order.findMany({
        select:{
            id:true,
            pricePaidInCents:true,
            product:{select:{name:true}},
            user:{select:{email:true}}
        },
        orderBy:{createdAt:"desc"}
    })
    return orders
}


export default function AdminOrdersPage(){
    return <>
    <div className="flex justify-between items-center gap-4">
    <PageHeader>Sales</PageHeader>
    <Button asChild><Link href="/admin/orders/new">Add order</Link></Button>
    </div>
    <OrdersTable/>
    </>
}

async function OrdersTable(){
    
    const orders=await getorders()
    if(orders.length===0) return <p>No orders found</p>


    return <Table>
       <TableHeader>
            <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Price Paid</TableHead>
                <TableHead className="w-0">
                     <span className="sr-only">Actions</span>
                </TableHead>            
                </TableRow>
        </TableHeader>
        <TableBody>
            {orders.map(order=>(
                <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.product.name}</TableCell>
                    <TableCell>{order.user.email}</TableCell>
                    <TableCell>{formatCurrency(order.pricePaidInCents/100)}</TableCell>
                    <TableCell className="text-center">
                        <DropdownMenu>
                        <DropdownMenuTrigger>
                        <MoreVertical/>
                    <span className="sr-only">Actions</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DeleteDropdownItem id={order.id}/>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
}