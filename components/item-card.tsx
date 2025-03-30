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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { delete_items } from "@/actions/delete_items"

interface ItemCardProps {
  item: {
    id: string
    title: string
    place: string
    floor: string
    pictureURL: string
    date: Date
    time: string
    info:string
  }
  viewMode: "grid" | "list",
}

export default function ItemCard({ item, viewMode }: ItemCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const handleDelete = () => {
    // ここで実際の削除処理を行う
    console.log(`削除: ${item.id}`)
    // 削除後の処理（例：通知やリストの更新など）
  }

  return (
    <>
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card className={viewMode === "grid" ? styles.gridCard : styles.listCard}>
        <div className={viewMode === "grid" ? styles.gridContent : styles.listContent}>
          <div className={viewMode === "grid" ? styles.gridImageContainer : styles.listImageContainer}>
            <Image
              src={item.pictureURL || "/placeholder.svg"}
              alt={item.title}
              width={viewMode === "grid" ? 300 : 100}
              height={viewMode === "grid" ? 200 : 100}
              className={styles.image}
            />
          </div>

          <CardContent className={styles.content}>
            <div className={styles.header}>
              <h3 className={styles.title}>{item.title}</h3>
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
                      「{item.title}」を削除します。この操作は元に戻せません。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async()=>{
                        await delete_items(item.id)
                        window.location.reload();
                      }}
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
                <span>{item.place}{item.floor}階</span>
              </div>
              <div className={styles.detail}>
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{item.date.toLocaleDateString()}</span>
              </div>
              <div className={styles.detail}>
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{item.time}</span>
              </div>
            </div>

            {viewMode === "list" && <p className={styles.description}>{item.info}</p>}
          </CardContent>
        </div>

        <CardFooter className={styles.footer}>
            <Button variant="outline" className={styles.detailButton} onClick={() => setShowDetailsDialog(true)}>
              詳細を見る
            </Button>
          </CardFooter>
      </Card>
    </motion.div>
          <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className={styles.detailsDialog}>
            <DialogHeader>
              <div className={styles.dialogHeaderContent}>
                <DialogTitle className={styles.dialogTitle}>{item.title}</DialogTitle>
                <Badge variant="outline" className={styles.itemId}>
                  ID: {item.id}
                </Badge>
              </div>
              <DialogDescription className={styles.dialogDescription}>落とし物の詳細情報</DialogDescription>
            </DialogHeader>
  
            <div className={styles.dialogContent}>
              <div className={styles.dialogImageContainer}>
                <Image
                  src={item.pictureURL || "/placeholder.svg"}
                  alt={item.title}
                  width={400}
                  height={300}
                  className={styles.dialogImage}
                />
              </div>
  
              <div className={styles.dialogDetails}>
                <div className={styles.dialogDetailItem}>
                  <h4 className={styles.dialogDetailTitle}>
                    <MapPin className="h-4 w-4" /> 発見場所
                  </h4>
                  <p>{item.place}{item.floor}階</p>
                </div>
  
                <div className={styles.dialogDetailItem}>
                  <h4 className={styles.dialogDetailTitle}>
                    <Calendar className="h-4 w-4" /> 発見日
                  </h4>
                  <p>{item.date.toLocaleDateString()}</p>
                </div>
  
                <div className={styles.dialogDetailItem}>
                  <h4 className={styles.dialogDetailTitle}>
                    <Clock className="h-4 w-4" /> 発見時間
                  </h4>
                  <p>{item.time}</p>
                </div>
  
                <div className={styles.dialogDetailItem}>
                  <h4 className={styles.dialogDetailTitle}>詳細説明</h4>
                  <p className={styles.dialogDescription}>{item.info}</p>
                </div>
              </div>
            </div>
  
            <DialogFooter className={styles.dialogFooter}>
              <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                閉じる
              </Button>
              <Button variant="destructive" onClick={() => setShowDeleteDialog(true)} className="flex items-center gap-2">
                <Trash className="h-4 w-4" />
                削除
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </>
  )
}

