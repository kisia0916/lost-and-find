"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { CalendarIcon, Search, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import styles from "./search-filters.module.css"

export default function SearchFilters() {
  const [date, setDate] = useState<Date>()
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <div className={styles.searchInputWrapper}>
          <Search className={styles.searchIcon} />
          <Input placeholder="落とし物を検索..." className={styles.searchInput} />
        </div>
        <Button
          variant="outline"
          size="icon"
          className={styles.filterButton}
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <Accordion type="single" collapsible value={showFilters ? "filters" : ""} className={styles.filtersAccordion}>
        <AccordionItem value="filters" className={styles.filtersItem}>
          <AccordionContent className={styles.filtersContent}>
            <div className={styles.filters}>
              <div className={styles.filterGroup}>
                <Label htmlFor="category">カテゴリ</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="すべてのカテゴリ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべてのカテゴリ</SelectItem>
                    <SelectItem value="electronics">電子機器</SelectItem>
                    <SelectItem value="accessories">アクセサリー</SelectItem>
                    <SelectItem value="clothing">衣類</SelectItem>
                    <SelectItem value="documents">書類</SelectItem>
                    <SelectItem value="other">その他</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className={styles.filterGroup}>
                <Label htmlFor="location">場所</Label>
                <Select>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="すべての場所" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべての場所</SelectItem>
                    <SelectItem value="library">図書館</SelectItem>
                    <SelectItem value="cafeteria">食堂</SelectItem>
                    <SelectItem value="gym">体育館</SelectItem>
                    <SelectItem value="classroom">教室</SelectItem>
                    <SelectItem value="other">その他</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className={styles.filterGroup}>
                <Label>日付</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: ja }) : "日付を選択"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={ja} />
                  </PopoverContent>
                </Popover>
              </div>

              <div className={styles.filterActions}>
                <Button
                  variant="outline"
                  onClick={() => {
                    setDate(undefined)
                    setShowFilters(false)
                  }}
                >
                  リセット
                </Button>
                <Button onClick={() => setShowFilters(false)}>適用</Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

