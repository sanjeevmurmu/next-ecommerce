export async function isValidPassword(password:string,hashedPassword:string){
    return await hashPassword(password)===hashedPassword
}

async function hashPassword(password:string){
    const arrayBuffer=await crypto.subtle.digest("SHA-512",new TextEncoder().encode(password))
    const result=Buffer.from(arrayBuffer).toString("base64")
    // console.log(typeof result)
    return result
}