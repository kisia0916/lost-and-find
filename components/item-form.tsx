"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { TimePickerDemo } from "@/components/time-picker"
import { format } from "date-fns"
import { fi, ja } from "date-fns/locale"
import {AlertCircle, CalendarIcon, ImagePlus } from "lucide-react"
import { cn } from "@/lib/utils"
import styles from "./item-form.module.css"
import { motion, AnimatePresence} from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { register_item } from "@/actions/register_item"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ItemForm() {
  const router = useRouter()
  const [date, setDate] = useState<Date>()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [image_data,set_image_data] = useState<File|null>()
  const [item_name,set_item_name] = useState<string>("")
  const [item_place,set_item_place] = useState<string>("")
  const [item_info,set_item_info] =  useState<string>("")
  const [register_time,set_register_time] = useState<string>("")
  const [floor, setFloor] = useState<string>("")
  const [building, setBuilding] = useState<string>("")
  const [error, setError] = useState<string | null>(null)


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      set_image_data(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const register_status = await register_item({
      name:item_name,
      place:building,
      floor:floor,
      date:date,
      img:image_data,
      time:register_time,
      info:item_info
    })

    // ここで実際のデータ送信処理を行う
    // 送信後にホームページに戻る
    if (register_status){
      router.push("/")
    }else{
      setError("登録に失敗しました。もう一度お試しください。")
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }}>
            <Alert variant="destructive" className={styles.errorAlert}>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={styles.imageUpload}>
        <Label htmlFor="image" className={styles.imageLabel}>
          {imagePreview ? (
            <motion.img
              src={imagePreview}
              alt="プレビュー"
              className={styles.preview}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          ) : (
            <div className={styles.placeholder}>
              <ImagePlus size={48} />
              <span>写真をアップロード</span>
            </div>
          )}
        </Label>
        <Input id="image" type="file" accept="image/*" className={styles.imageInput} onChange={handleImageChange} />
      </div>

      <div className={styles.formGroup}>
        <Label htmlFor="name">アイテム名</Label>
        <Input value={item_name} onChange={(e)=>set_item_name(e.target.value)} id="name" placeholder="例: 黒い財布" required />
      </div>

      <div className={styles.formGroup}>
        <Label>発見場所</Label>
        <div className={styles.locationSelects}>
          <div className={styles.locationSelect}>
            <Label htmlFor="floor" className="text-sm">
              階
            </Label>
            <Select value={floor} onValueChange={setFloor}>
              <SelectTrigger id="floor">
                <SelectValue placeholder="階を選択" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <SelectItem key={`floor-${num}`} value={num.toString()}>
                    {num}階
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className={styles.locationSelect}>
            <Label htmlFor="building" className="text-sm">
              号館
            </Label>
            <Select value={building} onValueChange={setBuilding}>
              <SelectTrigger id="building">
                <SelectValue placeholder="号館を選択" />
              </SelectTrigger>
              <SelectContent>
                {["1号館", "2号館", "3号館", "4号館", "5号館"].map((num) => (
                  <SelectItem key={`building-${num}`} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <Label>発見日</Label>
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

        <div className={styles.formGroup}>
          <Label>発見時間</Label>
          <TimePickerDemo set_time={set_register_time}/>
        </div>
      </div>

      <div className={styles.formGroup}>
        <Label htmlFor="description">詳細</Label>
        <Textarea value={item_info} onChange={(e)=>set_item_info(e.target.value)} id="description" placeholder="アイテムの特徴や状態などの詳細情報" className="resize-none" rows={4} />
      </div>

      <Button type="submit" className={styles.submitButton}>
        登録する
      </Button>
    </form>
  )
}
