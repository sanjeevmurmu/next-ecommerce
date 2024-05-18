import Link from "next/link";
import { PageHeader } from "../_components/PageHeader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function DiscountCodesPage(){
    return <>
    <div className="flex justify-between items-center gap-4">
    <PageHeader>Coupons</PageHeader>
    <Button asChild><Link href="/admin/products/new">Add Coupons</Link></Button>
    </div>
    <DiscountCodesTable/>
    <div className="mt-8">
        <h1 className="text-xl font-bold">Actions</h1>
        <DiscountCodesTable/>
    </div>
    </>
}

function DiscountCodesTable(){
    return(
        <Table>
       <TableHeader>
            <TableRow>
                <TableHead className="w-0">
                     <span className="sr-only">Available for Purchase</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead className="w-0">
                     <span className="sr-only">Actions</span>
                </TableHead>            
                </TableRow>
        </TableHeader>
        <TableBody>
            {products.map(product=>(
                <TableRow key={product.id}>
                    <TableCell>
                        {product.isAvailableForPurchase?(<>
                        <span className="sr-only">Available</span>
                        <CheckCircle2/>
                        </>):(<>
                        <span className="sr-only">Unavailable</span>
                        <XCircle className="stroke-destructive"/>
                        </>)}
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{formatCurrency(product.priceInCents/100)}</TableCell>
                    <TableCell>{formatNumber(product._count.orders)}</TableCell>
                    <TableCell>
                        <DropdownMenu>
                        <DropdownMenuTrigger>
                        <MoreVertical/>
                    <span className="sr-only">Actions</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <a download href={`/admin/products/${product.id}/download`}>Download</a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            {/* <ActiveToggleDropdownItem id={product.id} isAvailableForPurchase={product.isAvailableForPurchase}/> */}
                            {/* <DeleteDropdownItem id={product.id} disabled={product._count.orders>0 }/> */}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
    )
}