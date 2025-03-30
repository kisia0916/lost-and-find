import type React from "react"
import { cn } from "@/lib/utils"

function Skeleton2({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
}

export { Skeleton2 }