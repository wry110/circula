"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dice1, Dice4, Dice5, Dice6 } from "lucide-react"

type DiceType = 4 | 6 | 8 | 10 | 12 | 20

export default function DiceRoller() {
  const [results, setResults] = useState<{ type: DiceType; value: number; timestamp: number }[]>([])
  const [quantity, setQuantity] = useState(1)
  const [showResults, setShowResults] = useState(false)

  const rollDice = (sides: DiceType) => {
    const newResults = []
    for (let i = 0; i < quantity; i++) {
      const value = Math.floor(Math.random() * sides) + 1
      newResults.push({
        type: sides,
        value,
        timestamp: Date.now() + i,
      })
    }
    setResults([...newResults, ...results].slice(0, 10))
    setShowResults(true)
  }

  const getSuccessLevel = (value: number) => {
    if (value >= 20) return { text: "Extremo!", color: "text-yellow-300" }
    if (value >= 18) return { text: "Alto", color: "text-green-400" }
    if (value >= 15) return { text: "Garantido", color: "text-blue-400" }
    if (value >= 12) return { text: "Básico", color: "text-gray-300" }
    return { text: "Falha", color: "text-red-500" }
  }

  const getDiceIcon = (sides: DiceType) => {
    switch (sides) {
      case 4:
        return (
          <div className="transform rotate-45">
            <Dice1 className="h-5 w-5" />
          </div>
        )
      case 6:
        return <Dice6 className="h-5 w-5" />
      case 8:
        return (
          <div className="transform rotate-45">
            <Dice4 className="h-5 w-5" />
          </div>
        )
      case 10:
        return <Dice5 className="h-5 w-5" />
      case 12:
        return <Dice6 className="h-5 w-5" />
      case 20:
        return (
          <div className="relative">
            <Dice6 className="h-5 w-5" />
            <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold">20</span>
          </div>
        )
    }
  }

  return (
    <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
      <h2 className="text-xl font-bold text-center mb-4 text-yellow-500">Rolagem de Dados</h2>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <div className="flex items-center space-x-2 bg-gray-800 p-2 rounded-md">
          <span className="text-sm">Quantidade:</span>
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 p-0 bg-gray-900 border-gray-700"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </Button>
          <span className="text-sm font-bold w-6 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 p-0 bg-gray-900 border-gray-700"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {[4, 6, 8, 10, 12, 20].map((sides) => (
          <Button
            key={sides}
            onClick={() => rollDice(sides as DiceType)}
            className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
          >
            {getDiceIcon(sides as DiceType)}
            <span className="ml-1">d{sides}</span>
          </Button>
        ))}
      </div>

      {showResults && results.length > 0 && (
        <div className="mt-4 p-3 bg-gray-800 rounded-md border border-gray-700">
          <h3 className="text-center font-bold mb-2">Resultados</h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {results.map((result) => {
              const success = result.type === 20 ? getSuccessLevel(result.value) : null
              return (
                <div key={result.timestamp} className="flex items-center justify-between p-2 bg-gray-900 rounded">
                  <div className="flex items-center">
                    {getDiceIcon(result.type)}
                    <span className="ml-2">d{result.type}</span>
                  </div>
                  <div className="font-bold text-lg">{result.value}</div>
                  {success && <div className={`text-sm ${success.color}`}>{success.text}</div>}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
