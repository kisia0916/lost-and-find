"use server"
import { prisma } from '@/lib/db';
import { supabase } from '@/lib/utils';
import {v4 as uuidv4} from "uuid"
import { z } from 'zod';
const item_schema = z.object({
    name: z.string(),
    place: z.string(),
    date: z.date(), 
    img: z.instanceof(File),
    time: z.string(),
    info: z.string()
})
export const register_item = async(item_data:{
    name:string,
    place:string,
    floor:string,
    date:Date|undefined|null,
    img:File|undefined|null,
    time:string,
    info:string
}):Promise<boolean>=>{
    // await 
    try{
        item_schema.parse(item_data)
        if (item_data.img && item_data.date){
            const image_name = `${uuidv4()}`

            const {data,error} = await supabase.storage.from("drop-imgs").upload(image_name,item_data.img, {
                cacheControl: '3600',
                upsert: false
              })
            if (error){
                return false
            }
            await prisma.drop.create({
                data:{
                    title:item_data.name,
                    place:item_data.place,
                    floor:item_data.floor,
                    pictureURL:`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/drop-imgs/${image_name}`,
                    date:item_data.date,
                    info:item_data.info,
                    time:item_data.time
                }
            })
            return true
        }else{
            return false
        }
    }catch{
        return false
    }
}