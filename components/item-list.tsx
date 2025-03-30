"use client"

import { useEffect, useState } from "react"
import ItemCard from "@/components/item-card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Grid, List } from "lucide-react"
import styles from "./item-list.module.css"
import { motion,AnimatePresence } from "framer-motion"
import { Skeleton2 } from "@/components/ui/skelton2"
import { Drop } from "@prisma/client"
import { get_items } from "@/actions/get_items"



export default function ItemList() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState(true)
  const [items, setItems] = useState<Drop[]>([])
  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true)
      try {
        const items = await get_items()
        if (items){
          setItems(items)
        }else{
          console.error("データの取得に失敗しました")
        }
      } catch (error) {
        console.error("データの取得に失敗しました:", error)
        // エラー処理
      } finally {
        setIsLoading(false)
      }
    }

    fetchItems()
  }, [])
  const renderSkeletons = () => {
    return Array(4)
      .fill(0)
      .map((_, index) => (
        <div key={`skeleton-${index}`} className={viewMode === "grid" ? styles.skeletonGrid : styles.skeletonList}>
          <Skeleton2 className={viewMode === "grid" ? styles.skeletonImageGrid : styles.skeletonImageList} />
          <div className={styles.skeletonContent}>
            <Skeleton2 className={styles.skeletonTitle} />
            <div className={styles.skeletonDetails}>
              <Skeleton2 className={styles.skeletonDetail} />
              <Skeleton2 className={styles.skeletonDetail} />
              <Skeleton2 className={styles.skeletonDetail} />
            </div>
            {viewMode === "list" && <Skeleton2 className={styles.skeletonDescription} />}
          </div>
        </div>
      ))
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>落とし物一覧</h2>
        <Tabs defaultValue="grid" className={styles.viewToggle}>
          <TabsList>
            <TabsTrigger value="grid" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="list" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <motion.div className={viewMode === "grid" ? styles.grid : styles.list} layout transition={{ duration: 0.3 }}>
        <AnimatePresence>
          {isLoading ? (
            renderSkeletons()
          ) : items.length > 0 ? (
            items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ItemCard item={item} viewMode={viewMode} />
              </motion.div>
            ))
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.noItems}>
              登録された落とし物はありません
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </div>
  )
}

