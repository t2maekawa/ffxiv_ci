"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Clock, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type Task60 = {
  label: string
  time: string
}

type Task90 = {
  label: string
  note: string
  time: string
}

const TASKS_60_DATA = [{ label: "ポット: 北" }, { label: "ポット: 南" }]

const TASKS_90_DATA = [
  { label: "鳥嫌い巨獣「ネオガルラ」", note: "KL1   ガルラ" },
  { label: "黒の連隊", note: "KL14 パンサー" },
  { label: "伝説の鮫「ニーム・ペタロドゥス」", note: "KL7   レッサーペタロドゥス" },
  { label: "呪いの商亀「コイントートス」", note: "KL7   ケートス" },
  { label: "セキュリティ・コマンドー", note: "KL8   ウラグナイト" },
  { label: "石造りの守護騎士たち", note: "KL4   マロリス" },
  { label: "二足の獅子「ランパントライオン」", note: "KL5   ファン" },
  { label: "復元された獅子像「リペアドライオン」", note: "KL20 ステータント" },
  { label: "昏き篝火「ヒンキーパンク」", note: "KL11 ハルピュイア" },
  { label: "神秘の偶像「ミシカルアイドル」", note: "KL13 ビブロス" },
  { label: "模造されしもの「水晶竜」", note: "KL19 クレイクロウ" },
  { label: "脳髄愛好家「マインドフレイア」", note: "KL15 モンク" },
  { label: "忍び寄る爪「デスクロー」", note: "KL16 ブラックガード" },
  {
    label: "怒れる人造人間「クレセント・バーサーカー」",
    note: "KL17 デーモンポーン",
  },
  { label: "封印大妖「クロイスターデーモン」", note: "KL20 インクステイン" },
]

const COLORS = [
  "bg-amber-400/20 border-amber-400/40 hover:bg-amber-400/30",
  "bg-amber-400/20 border-amber-400/40 hover:bg-amber-400/30",
  "bg-orange-400/20 border-orange-400/40 hover:bg-orange-400/30",
  "bg-orange-400/20 border-orange-400/40 hover:bg-orange-400/30",
  "bg-orange-400/20 border-orange-400/40 hover:bg-orange-400/30",
  "bg-purple-400/20 border-purple-400/40 hover:bg-purple-400/30",
  "bg-purple-400/20 border-purple-400/40 hover:bg-purple-400/30",
  "bg-purple-400/20 border-purple-400/40 hover:bg-purple-400/30",
  "bg-emerald-400/20 border-emerald-400/40 hover:bg-emerald-400/30",
  "bg-emerald-400/20 border-emerald-400/40 hover:bg-emerald-400/30",
  "bg-emerald-400/20 border-emerald-400/40 hover:bg-emerald-400/30",
  "bg-blue-400/20 border-blue-400/40 hover:bg-blue-400/30",
  "bg-blue-400/20 border-blue-400/40 hover:bg-blue-400/30",
  "bg-blue-400/20 border-blue-400/40 hover:bg-blue-400/30",
  "bg-cyan-400/20 border-cyan-400/40 hover:bg-cyan-400/30",
]

export default function CrescentIsleManager() {
  const [tasks60, setTasks60] = useState<Task60[]>(TASKS_60_DATA.map((t) => ({ ...t, time: "" })))
  const [tasks90, setTasks90] = useState<Task90[]>(TASKS_90_DATA.map((t) => ({ ...t, time: "" })))

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks60([...tasks60])
      setTasks90([...tasks90])
    }, 1000)
    return () => clearInterval(interval)
  }, [tasks60, tasks90])

  const setNow = (type: "60" | "90", index: number, setter: React.Dispatch<React.SetStateAction<any>>) => {
    const now = new Date()
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
    if (type === "60") {
      setter((prev: Task60[]) => {
        const updated = [...prev]
        updated[index].time = time
        return updated
      })
    } else {
      setter((prev: Task90[]) => {
        const updated = [...prev]
        updated[index].time = time
        return updated
      })
    }
  }

  const clearTime = (type: "60" | "90", index: number, setter: React.Dispatch<React.SetStateAction<any>>) => {
    if (type === "60") {
      setter((prev: Task60[]) => {
        const updated = [...prev]
        updated[index].time = ""
        return updated
      })
    } else {
      setter((prev: Task90[]) => {
        const updated = [...prev]
        updated[index].time = ""
        return updated
      })
    }
  }

  const updateTime = (
    type: "60" | "90",
    index: number,
    value: string,
    setter: React.Dispatch<React.SetStateAction<any>>,
  ) => {
    if (type === "60") {
      setter((prev: Task60[]) => {
        const updated = [...prev]
        updated[index].time = value
        return updated
      })
    } else {
      setter((prev: Task90[]) => {
        const updated = [...prev]
        updated[index].time = value
        return updated
      })
    }
  }

  const isExpired = (time: string, limit: number): boolean => {
    if (!time) return false
    const [h, m] = time.split(":").map(Number)
    const taskTime = new Date()
    taskTime.setHours(h, m, 0, 0)
    const now = new Date()
    const diff = (now.getTime() - taskTime.getTime()) / 60000
    return diff >= limit
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">クレセントアイル:南征編</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div className="space-y-4">
            <div className="space-y-2">
              {tasks60.map((task, i) => (
                <Card
                  key={i}
                  className={`overflow-hidden border-2 transition-all duration-300 ${
                    isExpired(task.time, 60)
                      ? "border-destructive bg-destructive/10 shadow-lg shadow-destructive/20"
                      : "border-cyan-400/30 bg-cyan-950/30"
                  }`}
                >
                  <div className="p-2 space-y-1.5">
                    <div className="text-center font-semibold text-sm text-foreground">{task.label}</div>
                    <input
                      type="time"
                      value={task.time}
                      onChange={(e) => updateTime("60", i, e.target.value, setTasks60)}
                      className="w-full rounded-md border border-input bg-background/50 px-3 py-1 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                    />
                    <div className="flex gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 gap-1.5 bg-transparent h-7 text-xs"
                        onClick={() => setNow("60", i, setTasks60)}
                      >
                        <Clock className="h-3 w-3" />
                        現在
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 gap-1.5 bg-transparent h-7 text-xs"
                        onClick={() => clearTime("60", i, setTasks60)}
                      >
                        <Trash2 className="h-3 w-3" />
                        消去
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              {tasks90.map((task, i) => (
                <Card
                  key={i}
                  className={`overflow-hidden border-2 transition-all duration-300 ${
                    isExpired(task.time, 90)
                      ? "border-destructive bg-destructive/10 shadow-lg shadow-destructive/20"
                      : COLORS[i]
                  }`}
                >
                  <div className="p-2">
                    <div className="flex flex-col gap-1.5 md:flex-row md:items-center">
                      <div className="flex-1 space-y-0.5">
                        <div className="font-semibold text-sm text-foreground">{task.label}</div>
                        <div className="text-xs text-muted-foreground font-mono">{task.note}</div>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <input
                          type="time"
                          value={task.time}
                          onChange={(e) => updateTime("90", i, e.target.value, setTasks90)}
                          className="w-32 rounded-md border border-input bg-background/50 px-3 py-1 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1.5 bg-transparent h-7 text-xs"
                          onClick={() => setNow("90", i, setTasks90)}
                        >
                          <Clock className="h-3 w-3" />
                          現在時刻
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1.5 bg-transparent h-7 text-xs"
                          onClick={() => clearTime("90", i, setTasks90)}
                        >
                          <Trash2 className="h-3 w-3" />
                          クリア
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
