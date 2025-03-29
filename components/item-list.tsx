"use client"

import { useState } from "react"
import ItemCard from "@/components/item-card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Grid, List } from "lucide-react"
import styles from "./item-list.module.css"
import { motion } from "framer-motion"

// サンプルデータ
const ITEMS = [
  {
    id: "1",
    name: "黒い財布",
    location: "中央図書館2階",
    date: "2023-04-15",
    time: "14:30",
    image: "/placeholder.svg?height=200&width=200",
    description: "レザー製の黒い財布。中身は空でした。",
  },
  {
    id: "2",
    name: "青いスマートフォン",
    location: "食堂",
    date: "2023-04-14",
    time: "12:15",
    image: "/placeholder.svg?height=200&width=200",
    description: "青いケースのiPhone。画面にヒビが入っています。",
  },
  {
    id: "3",
    name: "学生証",
    location: "体育館",
    date: "2023-04-13",
    time: "16:45",
    image: "/placeholder.svg?height=200&width=200",
    description: "山田太郎さんの学生証。",
  },
  {
    id: "4",
    name: "赤い傘",
    location: "正門",
    date: "2023-04-12",
    time: "09:00",
    image: "/placeholder.svg?height=200&width=200",
    description: "折りたたみ式の赤い傘。",
  },
]

export default function ItemList() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

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
        {ITEMS.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ItemCard item={item} viewMode={viewMode} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

