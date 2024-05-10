'use server'
import db from "@/db/db"
import {z} from "zod"
import { Resend } from "resend"
import OrderHistoryEmail from "@/email/OrderHistory"


const emailSchema=z.string().email()
const resend=new Resend(process.env.RESEND_API_KEY as string)


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