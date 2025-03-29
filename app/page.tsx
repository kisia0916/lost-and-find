"use client"

import { Suspense } from "react"
import ItemList from "@/components/item-list"
import SearchFilters from "@/components/search-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import styles from "./page.module.css"
import { AnimatePresence, motion } from "framer-motion"

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>落とし物管理</h1>
        <Button asChild>
          <Link href="/register">
            <Plus className="mr-2 h-4 w-4" /> 新規登録
          </Link>
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={styles.searchContainer}>
        <SearchFilters />
      </motion.div>

      <Suspense fallback={<div className={styles.loading}>読み込み中...</div>}>
        <AnimatePresence>
          <ItemList />
        </AnimatePresence>
      </Suspense>
    </main>
  )
}

