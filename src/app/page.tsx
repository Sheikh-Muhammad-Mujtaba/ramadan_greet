import GreetingCard from "@/components/greeting-card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ramadan Kareem | Greeting App",
  description: "Send beautiful Ramadan greetings to your loved ones",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-bold text-amber-400 mb-2">Ramadan Kareem</h1>
          <p className="text-blue-100 text-lg md:text-xl">Create and share beautiful Ramadan greetings</p>
        </div>
        <GreetingCard />
      </div>
    </main>
  )
}

