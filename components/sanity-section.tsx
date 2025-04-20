"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dice1Icon as Dice } from "lucide-react"
import type { CharacterData } from "@/lib/types"

interface SanitySectionProps {
  sanity: CharacterData["sanity"]
  updateSanity: (sanity: CharacterData["sanity"]) => void
}

export default function SanitySection({ sanity, updateSanity }: SanitySectionProps) {
  const [diceResult, setDiceResult] = useState<number | null>(null)

  const rollSanityCheck = () => {
    const result = Math.floor(Math.random() * 20) + 1
    setDiceResult(result)
  }

  return (
    <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
      <h3 className="text-lg font-bold text-center mb-4 text-purple-400">Sanidade</h3>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-sm font-medium">Atual</label>
          <input
            type="number"
            value={sanity.current}
            onChange={(e) =>
              updateSanity({
                ...sanity,
                current: Number.parseInt(e.target.value) || 0,
              })
            }
            className="w-full p-2 border rounded text-center bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Máxima</label>
          <input
            type="number"
            value={sanity.maximum}
            onChange={(e) =>
              updateSanity({
                ...sanity,
                maximum: Number.parseInt(e.target.value) || 0,
              })
            }
            className="w-full p-2 border rounded text-center bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>

      <div className="mt-4 w-full bg-gray-800 h-6 rounded-full overflow-hidden">
        <div
          className="h-full bg-purple-600"
          style={{
            width: `${Math.min(100, (sanity.current / Math.max(1, sanity.maximum)) * 100)}%`,
            transition: "width 0.3s ease-in-out",
          }}
        ></div>
      </div>

      <div className="mt-4 flex justify-center">
        <Button onClick={rollSanityCheck} className="bg-purple-900 hover:bg-purple-800 text-white">
          <Dice className="mr-2 h-4 w-4" /> Teste de Sanidade
        </Button>
      </div>

      {diceResult !== null && (
        <div className="mt-4 p-2 bg-gray-800 rounded-md border border-gray-700 text-center">
          <p className="font-bold">Resultado do Teste de Sanidade</p>
          <p className="text-2xl font-bold mt-1">{diceResult}</p>
          <p className="text-sm mt-1">
            {diceResult === 20 ? (
              <span className="text-red-500">Falha Crítica!</span>
            ) : diceResult === 1 ? (
              <span className="text-green-500">Sucesso Crítico!</span>
            ) : diceResult > 15 ? (
              <span className="text-orange-400">Possível falha...</span>
            ) : (
              <span className="text-blue-400">Possível sucesso...</span>
            )}
          </p>
        </div>
      )}
    </div>
  )
}
