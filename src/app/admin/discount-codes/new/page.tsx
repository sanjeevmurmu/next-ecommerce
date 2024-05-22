import { PageHeader } from "../../_components/PageHeader";
import {DiscountCouponForm} from "../_components/DiscountCodeForm";
import db from "@/db/db"


export default async function NewDiscountCodePage(){

    const products=await db.product.findMany({
        select:{id:true,name:true},
        orderBy:{name:"asc"}
    })
    return <>
    <PageHeader>
        Add Product
    </PageHeader>
    <DiscountCouponForm products={products}/>
    </>
}