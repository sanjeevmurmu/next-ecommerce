'use server'
import db from "@/db/db"
import {z} from "zod"
import { Resend } from "resend"
import OrderHistoryEmail from "@/email/OrderHistory"
import Stripe from "stripe"
import { usableDiscountCodeWhere } from "@/lib/discountCodeHelper"


const emailSchema=z.string().email()
const resend=new Resend(process.env.RESEND_API_KEY as string)
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function emailOrderHistory(prevState:unknown,formData:FormData):Promise<{message?:string,error?:string}>{
    const result=emailSchema.safeParse(formData.get("email"))
    if(result.success===false){
        return {error:"Invalid email Address"}
    }

    const user=await db.user.findUnique({where:{email:result.data},select:{
        email:true,
        orders:{
            select:{
                pricePaidInCents:true,
                id:true,
                createdAt:true,
                product:{
                    select:{
                        id:true,
                        name:true,
                        imagePath:true,
                        description:true
                    }
                
                }
            }
        }
    }})

    if(user==null){
        return {
            message:"Check your email to view your order history and download your products"
        }
    }
    const orders=await Promise.all( user.orders.map(async(order)=>{
        return {...order,
            downloadVerificationId:(await (db.downloadVerification.create({
            data: {
                expiresAt: new Date(Date.now() + 24 * 1000 * 60 * 60),
                productId: order.product.id
            }
        }))).id}
    }))
    resend.emails.send({
        from:`Support <${process.env.SENDER_EMAIL}>`,
        to:user.email,
        subject:"Order History",
        react:<OrderHistoryEmail orders={orders}/>
    })

    return {message:""}
} 



export async function createPaymentIntent(email:string,productId:string,priceInCents:number,discountCodeId?:string){
const product=await db.product.findUnique({
    where:{id:productId}
})
if(product==null) return {error:"Unexpected Error"}

const discountCode=discountCodeId==null?null:await db.discountCode.findUnique({where:{id:discountCodeId,...usableDiscountCodeWhere(product.id)}})

if(discountCode==null && discountCodeId!=null){
    return {error:"Coupon has expired"}
}

const existingOrder= await db.order.findFirst({where:{user:{email},productId},select:{id:true}})

if(existingOrder!=null){
    return {error:"You have already purchased this product.Try downloading it from the My Orders page"}
    
}
    const paymentIntent = await stripe.paymentIntents.create({
        amount: priceInCents,
        currency: "INR",
        metadata: { productId: product.id,
            discountCode:discountCode?.id||null
         }
    })

    if (paymentIntent.client_secret == null) {
        return{error:"Unknow error"}
    }
    return {clientSecret:paymentIntent.client_secret}


}