"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon, KeyIcon, LockIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { verify_pass } from "@/actions/login_action"
import Cookies from 'js-cookie'

export default function LoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!password) {
      setError("パスワードを入力してください")
      return
    }

    setIsLoading(true)
    setError("")
    try {
        const verify_token = await verify_pass(password)
        if (verify_token){
            Cookies.set('auth_token',verify_token, {
                expires: 7,  // 7日間有効
                path: '/',   // サイト全体で有効
                secure: process.env.NODE_ENV === 'production', // 本番環境では安全な接続のみ
                sameSite: 'strict' // クロスサイトリクエスト保護
            })
            router.push("/")
        }else{
            setError("パスワードが違います")
        }
    } catch (err) {
      setError("ログイン中にエラーが発生しました。もう一度お試しください。")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="border-border/40 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="rounded-full bg-primary/10 p-3">
                <LockIcon className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-semibold">ログイン</CardTitle>
            <CardDescription>続行するにはパスワードを入力してください</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="password" className="flex items-center gap-1">
                    <KeyIcon className="h-3.5 w-3.5" />
                    パスワード
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="パスワードを入力"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={cn("pr-10", error && "border-destructive focus-visible:ring-destructive")}
                      disabled={isLoading || loginSuccess}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading || loginSuccess}
                    >
                      {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "パスワードを隠す" : "パスワードを表示"}</span>
                    </Button>
                  </div>
                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm font-medium text-destructive"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSubmit} disabled={isLoading || loginSuccess}>
              {isLoading ? (
                <>
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  処理中...
                </>
              ) : loginSuccess ? (
                <>
                  <svg
                    className="mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  ログイン成功
                </>
              ) : (
                "ログイン"
              )}
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>デモ用パスワード: password123</p>
        </div>
      </motion.div>
    </div>
  )
}
