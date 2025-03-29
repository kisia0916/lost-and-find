"use client"

import ItemForm from "@/components/item-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import styles from "./page.module.css"
import { motion } from "framer-motion"

export default function RegisterPage() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> 戻る
          </Link>
        </Button>
        <h1 className={styles.title}>新規落とし物登録</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={styles.formContainer}
      >
        <ItemForm />
      </motion.div>
    </main>
  )
}

