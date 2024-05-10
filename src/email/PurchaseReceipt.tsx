import { Body, Container, Head, Heading, Html, Preview, Tailwind } from "@react-email/components";
import OrderInformation from "./components/OrderInformation";

type PurchaseReceiptEmailProps={
    product:{
        name:string,
        imagePath:string,
        description:string
    }
    order:{id:string;createdAt:Date;pricePaidInCents:number}
    downloadVerificationId:string
}
 
PurchaseReceiptEmail.PreviewProps={
    product:{name:"Product Name",imagePath:"/products/5cb20c71-1dcd-479e-a74d-8ecd21be5886-perry.jpg",
        description:"NDjbewbkvviwkbDA KJ BWJKV BwjkbJVWDKVFAJ KDBVRFJK"
    },
    order:{id:crypto.randomUUID(),createdAt:new Date(),pricePaidInCents:4000},
    downloadVerificationId:crypto.randomUUID()
} satisfies PurchaseReceiptEmailProps

export default function PurchaseReceiptEmail({product,order,downloadVerificationId}:PurchaseReceiptEmailProps){
    return(
        <Html>
            <Preview>Download {product.name}</Preview>
            <Tailwind>
                <Head/>
                <Body className="fonts-sans bg-white">
                    <Container className="max-w-xl">
                          <Heading>Purchase Receipt</Heading>
                          <OrderInformation order={order} product={product} downloadVerificationId={downloadVerificationId} />
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}