"use server"
import { prisma } from "@/lib/db"

export const delete_items = async (id: string): Promise<boolean> => {
    try {
        await prisma.drop.delete({
            where: {
                id: id,
            },
        });

        return true; // 削除成功
    } catch (error) {
        return false; // 削除失敗
    }
};