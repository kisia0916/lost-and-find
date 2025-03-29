"use client"

import * as React from "react"
import { Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import styles from "./time-picker.module.css"

export function TimePickerDemo(props:{set_time:React.Dispatch<React.SetStateAction<string>>}) {
  const [hours, setHours] = React.useState("12")
  const [minutes, setMinutes] = React.useState("00")
  React.useEffect(()=>{
    const now = new Date()
    const now_hour = now.getHours()
    const now_minutes = now.getMinutes()
    props.set_time(`${now_hour}:${now_minutes}`)
  },[])
  React.useEffect(()=>{
    props.set_time(`${hours}:${minutes}`)
  },[hours,minutes])

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "") {
      setHours("")
      return
    }

    const numValue = Number.parseInt(value)
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 23) {
      setHours(numValue.toString().padStart(2, "0"))
    }
  }

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "") {
      setMinutes("")
      return
    }

    const numValue = Number.parseInt(value)
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 59) {
      setMinutes(numValue.toString().padStart(2, "0"))
    }
  }

  return (
    <div className={styles.timePickerContainer}>
      <Button variant="outline" size="icon" className={styles.timePickerIcon} type="button">
        <Clock className="h-4 w-4" />
      </Button>
      <div className={styles.timeInputs}>
        <Input value={hours} onChange={handleHoursChange} className={styles.timeInput} maxLength={2} />
        <span className={styles.timeSeparator}>:</span>
        <Input value={minutes} onChange={handleMinutesChange} className={styles.timeInput} maxLength={2} />
      </div>
    </div>
  )
}

