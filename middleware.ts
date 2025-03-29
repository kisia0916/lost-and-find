import { createSearchParamsFromClient } from "next/dist/server/request/search-params";
import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose'

export async function middleware(request:NextRequest){
    const url = request.nextUrl.clone()
    try{
        const auth_token = request.cookies.get("auth_token")?.value
        if (auth_token){
            const secret = new TextEncoder().encode(process.env.SECRET_KEY)
            const {payload} = await jose.jwtVerify(auth_token, secret)
            if (payload.pass === process.env.VERIFY_PASS as string){
                return NextResponse.next()
            }else{
                url.pathname = "/login"
                return NextResponse.redirect(url)
            }
        }else{
            url.pathname = "/login"
            return NextResponse.redirect(url)
        }
    }catch(error){
        url.pathname = "/login"
        return NextResponse.redirect(url)
    }
}
export const config = {
    matcher:["/","/register"]
}