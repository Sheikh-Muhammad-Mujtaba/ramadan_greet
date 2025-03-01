"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Moon, Star, Share2, Copy, Check, LinkIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { encodeShareData } from "@/lib/share-utils"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

const GREETING_TEMPLATES = [
  "May the spirit of Ramadan illuminate your heart and mind and may Allah bless you with health, prosperity and happiness.",
  "Wishing you a blessed Ramadan filled with peace, joy, and prosperity.",
  "May this Ramadan bring you closer to Allah and fill your life with happiness and prosperity.",
  "Ramadan Kareem! May Allah's blessings be with you today, tomorrow, and always.",
]

const CARD_THEMES = ["blue-gold", "green-gold", "purple-gold"]

export default function GreetingCard() {
  const [recipientName, setRecipientName] = useState("")
  const [senderName, setSenderName] = useState("")
  const [message, setMessage] = useState(GREETING_TEMPLATES[0])
  const [selectedTheme, setSelectedTheme] = useState(CARD_THEMES[0])
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState("")
  const { toast } = useToast()

  const generateShareUrl = useCallback(() => {
    const encodedData = encodeShareData({
      recipientName,
      senderName,
      message,
      theme: selectedTheme,
    })

    const baseUrl = window.location.origin
    const url = `${baseUrl}/share?data=${encodedData}`
    setShareUrl(url)
    return url
  }, [message, selectedTheme, recipientName, senderName])

  useEffect(() => {
    generateShareUrl()
  }, [generateShareUrl])

  const handleTemplateChange = (index: number) => {
    setMessage(GREETING_TEMPLATES[index])
  }

  const handleCopyLink = () => {
    const url = generateShareUrl()
    navigator.clipboard.writeText(url)
    setCopied(true)

    toast({
      title: "Link copied!",
      description: "Share this link with your friends and family.",
      duration: 3000,
    })

    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    const url = generateShareUrl()

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Ramadan Kareem Greeting",
          text: `${senderName} sent you a Ramadan greeting`,
          url: url,
        })

        toast({
          title: "Shared successfully!",
          description: "Your greeting has been shared.",
          duration: 3000,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      handleCopyLink()
    }
  }

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
    <div className="flex flex-wrap gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 bg-blue-950/50 p-6 rounded-lg"
      >
        <h2 className="text-xl font-semibold text-amber-400 flex items-center gap-2">
          <Moon className="h-5 w-5" /> Customize Your Greeting
        </h2>

        <div className="space-y-4 w-[70vw] sm:w-[80vw]">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Label htmlFor="recipient" className="text-blue-100">
              Recipient Name
            </Label>
            <Input
              id="recipient"
              placeholder="Enter recipient's name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="bg-blue-900/50 border-blue-700 text-blue-100"
            />
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Label htmlFor="sender" className="text-blue-100">
              Your Name
            </Label>
            <Input
              id="sender"
              placeholder="Enter your name"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="bg-blue-900/50 border-blue-700 text-blue-100"
            />
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Label htmlFor="message" className="text-blue-100">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Enter your Ramadan greeting"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-blue-900/50 border-blue-700 text-blue-100 min-h-[100px]"
            />
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Label className="text-blue-100">Message Templates</Label>
            <div className="flex flex-wrap gap-2">
              {GREETING_TEMPLATES.map((template, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleTemplateChange(index)}
                  className="bg-blue-900/30 border-blue-700 text-blue-100 hover:bg-blue-800/50 justify-start overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {template.substring(0, 20)}...
                </Button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Label className="text-blue-100">Card Theme</Label>
            <Tabs defaultValue={selectedTheme} onValueChange={setSelectedTheme}>
              <TabsList className="bg-blue-900/30 border border-blue-700">
                <TabsTrigger value="blue-gold" className="data-[state=active]:bg-blue-800">
                  Blue
                </TabsTrigger>
                <TabsTrigger value="green-gold" className="data-[state=active]:bg-emerald-800">
                  Green
                </TabsTrigger>
                <TabsTrigger value="purple-gold" className="data-[state=active]:bg-purple-800">
                  Purple
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          {shareUrl && (
            <motion.div
              className="pt-4 space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Label className="text-blue-100">Share Link</Label>
              <div className="flex items-center gap-2 p-2 bg-blue-900/30 border border-blue-700 rounded-md text-blue-100 text-sm">
                <LinkIcon className="h-4 w-4 flex-shrink-0 text-amber-400" />
                <div className="truncate flex-1">{shareUrl}</div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold text-amber-400 flex items-center gap-2">
          <Star className="h-5 w-5" /> Preview
        </h2>

        <motion.div layout transition={{ duration: 0.5 }}>
          <Card className={cn("border-2 shadow-lg overflow-hidden", getThemeClasses(selectedTheme))}>
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
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
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
                  transition={{ delay: 0.2 }}
                >
                  Ramadan Kareem
                </motion.h3>

                {recipientName && (
                  <motion.p
                    className="text-amber-100 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Dear {recipientName},
                  </motion.p>
                )}

                <motion.p
                  className="text-blue-100 md:text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {message}
                </motion.p>

                {senderName && (
                  <motion.p
                    className="text-amber-100 pt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    From: {senderName}
                  </motion.p>
                )}

                <motion.div
                  className="pt-2 flex justify-center"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="flex gap-2 justify-center mt-4">
          <Button onClick={handleCopyLink} className="bg-amber-500 hover:bg-amber-600 text-blue-950">
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "Copied!" : "Copy Link"}
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            className="border-amber-400 text-amber-400 hover:bg-blue-800/50"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </div>
  )
}

