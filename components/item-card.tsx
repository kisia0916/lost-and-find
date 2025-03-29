"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, MoreHorizontal, Trash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import styles from "./item-card.module.css"
import { motion } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"

interface ItemCardProps {
  item: {
    id: string
    name: string
    location: string
    date: string
    time: string
    image: string
    description: string
  }
  viewMode: "grid" | "list"
}

export default function ItemCard({ item, viewMode }: ItemCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleDelete = () => {
    // ここで実際の削除処理を行う
    console.log(`削除: ${item.id}`)
    // 削除後の処理（例：通知やリストの更新など）
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card className={viewMode === "grid" ? styles.gridCard : styles.listCard}>
        <div className={viewMode === "grid" ? styles.gridContent : styles.listContent}>
          <div className={viewMode === "grid" ? styles.gridImageContainer : styles.listImageContainer}>
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              width={viewMode === "grid" ? 300 : 100}
              height={viewMode === "grid" ? 200 : 100}
              className={styles.image}
            />
          </div>

          <CardContent className={styles.content}>
            <div className={styles.header}>
              <h3 className={styles.title}>{item.name}</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className={styles.moreButton}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    削除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
                    <AlertDialogDescription>
                      「{item.name}」を削除します。この操作は元に戻せません。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      削除
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className={styles.details}>
              <div className={styles.detail}>
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{item.location}</span>
              </div>
              <div className={styles.detail}>
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{item.date}</span>
              </div>
              <div className={styles.detail}>
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{item.time}</span>
              </div>
            </div>

            {viewMode === "list" && <p className={styles.description}>{item.description}</p>}
          </CardContent>
        </div>

        <CardFooter className={styles.footer}>
          <Button variant="outline" asChild className={styles.detailButton}>
            <Link href={`/items/${item.id}`}>詳細を見る</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

