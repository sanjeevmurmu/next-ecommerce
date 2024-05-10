import { Body, Container, Head, Heading, Hr, Html, Preview, Tailwind } from "@react-email/components";
import OrderInformation from "./components/OrderInformation";
import React from "react";

type OrderHistoryEmailProps={
    orders:{
        id:string,
        pricePaidInCents:number
        createdAt:Date
        downloadVerificationId:string
        product:{
            name:string,
            imagePath:string,
            description:string
        }
    }[]
}
 
OrderHistoryEmail.PreviewProps={
    orders:[{id:crypto.randomUUID(),
    pricePaidInCents:4000,
    createdAt:new Date(),
    downloadVerificationId:crypto.randomUUID(),
    product:{name:"Product Name",imagePath:"/products/5cb20c71-1dcd-479e-a74d-8ecd21be5886-perry.jpg",
        description:"NDjbewbkvviwkbDA KJ BWJKV BwjkbJVWDKVFAJ KDBVRFJK"
    }
    }]
} satisfies OrderHistoryEmailProps

export default function OrderHistoryEmail({orders}:OrderHistoryEmailProps){
    return(
        <Html>
            <Preview>Order History & Downloads</Preview>
            <Tailwind>
                <Head/>
                <Body className="fonts-sans bg-white">
                    <Container className="max-w-xl">
                          <Heading>Order History</Heading>
                          {orders.map((order,index)=>(
                            <React.Fragment key={order.id}>
                                <OrderInformation order={order} product={order.product} downloadVerificationId={order.downloadVerificationId} />
                                {index<orders.length-1 && <Hr/>}
                            </React.Fragment>
                          ))}
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}