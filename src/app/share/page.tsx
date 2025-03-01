"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Moon, Star, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { decodeShareData } from "@/lib/share-utils"
import { motion } from "framer-motion"

export default function SharedGreeting() {
  const searchParams = useSearchParams()
  const encodedData = searchParams.get("data")

  const { recipientName, senderName, message, theme } = decodeShareData(encodedData)

  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case "blue-gold":
        return "bg-gradient-to-r from-blue-900 to-blue-800 border-amber-400"
      case "green-gold":
        return "bg-gradient-to-r from-emerald-900 to-emerald-800 border-amber-400"
      case "purple-gold":
        return "bg-gradient-to-r from-purple-900 to-purple-800 border-amber-400"
      default:
        return "bg-gradient-to-r from-blue-900 to-blue-800 border-amber-400"
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-xl mx-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-amber-400 mb-2">Ramadan Kareem</h1>
          <p className="text-blue-100 text-lg">Someone sent you a Ramadan greeting</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className={cn("border-2 shadow-lg overflow-hidden mb-8", getThemeClasses(theme))}>
            <CardContent className="p-6 relative">
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-4 left-4 w-16 h-16 border-2 border-amber-400 rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-24 h-24 border-2 border-amber-400 rounded-full"></div>
                <div className="absolute top-1/4 right-8 w-8 h-8 border-2 border-amber-400 rounded-full"></div>
                <div className="absolute bottom-1/3 left-12 w-12 h-12 border-2 border-amber-400 rounded-full"></div>
              </div>

              <div className="relative z-10 text-center space-y-4">
                <motion.div
                  className="flex justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
                >
                  <div className="relative">
                    <Moon className="h-12 w-12 text-amber-400" />
                    <Star className="h-6 w-6 text-amber-400 absolute -top-1 -right-1" />
                  </div>
                </motion.div>

                <motion.h3
                  className="text-2xl md:text-3xl font-bold text-amber-400"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Ramadan Kareem
                </motion.h3>

                {recipientName && (
                  <motion.p
                    className="text-amber-100 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Dear {recipientName},
                  </motion.p>
                )}

                <motion.p
                  className="text-blue-100 md:text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {message}
                </motion.p>

                {senderName && (
                  <motion.p
                    className="text-amber-100 pt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    From: {senderName}
                  </motion.p>
                )}

                <motion.div
                  className="pt-2 flex justify-center"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <Link href="/">
            <Button className="bg-amber-500 hover:bg-amber-600 text-blue-950">
              Create Your Own Greeting
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </main>
  )
}

