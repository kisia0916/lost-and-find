"use server"
import jwt from "jsonwebtoken"

export const verify_pass = async(pass:string):Promise<string>=>{
    if (pass){
        if (pass === process.env.VERIFY_PASS as string){
            const token = jwt.sign({pass:pass}, process.env.SECRET_KEY as string);
            return token
        }else{
            return ""
        }
    }else{
        return ""
    }
}