"use server"

import { prisma } from "@/lib/db"
import { Drop } from "@prisma/client";

export const get_items = async():Promise<Drop[]>=>{
    try{
        const items = await prisma.drop.findMany({
            select: {
                id: true,
                title: true,
                place: true,
                floor: true,
                info: true,
                pictureURL: true,
                date: true,
                time: true,
            },
        });
        return items; // 取得したデータを返す
    }catch{
        return []
    }
}