"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"

interface StatsBarProps {
  health: {
    current: number
    maximum: number
    temporary: number
  }
  sanity: {
    current: number
    maximum: number
  }
  effortPoints: {
    current: number
    maximum: number
  }
  updateHealth: (health: {
    current: number
    maximum: number
    temporary: number
  }) => void
  updateSanity: (sanity: {
    current: number
    maximum: number
  }) => void
  updateEffortPoints: (effortPoints: {
    current: number
    maximum: number
  }) => void
}

export default function StatsBar({
  health,
  sanity,
  effortPoints,
  updateHealth,
  updateSanity,
  updateEffortPoints,
}: StatsBarProps) {
  const [showHealthControls, setShowHealthControls] = useState(false)
  const [showSanityControls, setShowSanityControls] = useState(false)
  const [showEffortControls, setShowEffortControls] = useState(false)

  const [damageAmount, setDamageAmount] = useState(1)
  const [sanityLossAmount, setSanityLossAmount] = useState(1)
  const [effortSpendAmount, setEffortSpendAmount] = useState(1)

  const adjustHealth = (amount: number) => {
    const newCurrent = Math.max(0, Math.min(health.current + amount, health.maximum + health.temporary))
    updateHealth({
      ...health,
      current: newCurrent,
    })
  }

  const adjustSanity = (amount: number) => {
    const newCurrent = Math.max(0, Math.min(sanity.current + amount, sanity.maximum))
    updateSanity({
      ...sanity,
      current: newCurrent,
    })
  }

  const adjustEffortPoints = (amount: number) => {
    const newCurrent = Math.max(0, Math.min(effortPoints.current + amount, effortPoints.maximum))
    updateEffortPoints({
      ...effortPoints,
      current: newCurrent,
    })
  }

  const getHealthColor = () => {
    const healthPercentage = health.current / health.maximum
    if (healthPercentage <= 0.25) return "bg-red-700"
    if (healthPercentage <= 0.5) return "bg-orange-600"
    return "bg-red-600"
  }

  const getSanityColor = () => {
    const sanityPercentage = sanity.current / sanity.maximum
    if (sanityPercentage <= 0.25) return "bg-purple-900"
    if (sanityPercentage <= 0.5) return "bg-purple-800"
    return "bg-purple-600"
  }

  const getEffortColor = () => {
    const effortPercentage = effortPoints.current / effortPoints.maximum
    if (effortPercentage <= 0.25) return "bg-blue-900"
    if (effortPercentage <= 0.5) return "bg-blue-800"
    return "bg-blue-600"
  }

  return (
    <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
      <h2 className="text-xl font-bold text-center mb-4 text-red-500">Status</h2>

      <div className="space-y-4">
        {/* Barra de Vida */}
        <div
          className="relative"
          onMouseEnter={() => setShowHealthControls(true)}
          onMouseLeave={() => setShowHealthControls(false)}
        >
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-red-400">Pontos de Vida</label>
            <span className="text-sm font-bold">
              {health.current}/{health.maximum}
              {health.temporary > 0 && <span className="text-green-400"> (+{health.temporary})</span>}
            </span>
          </div>
          <div className="w-full bg-gray-800 h-6 rounded-full overflow-hidden">
            <div
              className={`h-full ${getHealthColor()} transition-all duration-500 ease-out`}
              style={{
                width: `${Math.min(100, (health.current / Math.max(1, health.maximum)) * 100)}%`,
              }}
            ></div>
          </div>

          {showHealthControls && (
            <div className="absolute -right-1 top-0 flex flex-col bg-gray-800 border border-gray-700 rounded-md p-2 shadow-lg z-10">
              <div className="flex items-center space-x-2 mb-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 p-0 bg-gray-900 border-gray-700"
                  onClick={() => setDamageAmount(Math.max(1, damageAmount - 1))}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm font-medium w-6 text-center">{damageAmount}</span>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 p-0 bg-gray-900 border-gray-700"
                  onClick={() => setDamageAmount(damageAmount + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <Button
                  size="sm"
                  variant="destructive"
                  className="text-xs py-1 h-auto"
                  onClick={() => adjustHealth(-damageAmount)}
                >
                  Dano
                </Button>
                <Button
                  size="sm"
                  variant="default"
                  className="text-xs py-1 h-auto bg-green-700 hover:bg-green-600"
                  onClick={() => adjustHealth(damageAmount)}
                >
                  Cura
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Barra de Sanidade */}
        <div
          className="relative"
          onMouseEnter={() => setShowSanityControls(true)}
          onMouseLeave={() => setShowSanityControls(false)}
        >
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-purple-400">Sanidade</label>
            <span className="text-sm font-bold">
              {sanity.current}/{sanity.maximum}
            </span>
          </div>
          <div className="w-full bg-gray-800 h-6 rounded-full overflow-hidden">
            <div
              className={`h-full ${getSanityColor()} transition-all duration-500 ease-out`}
              style={{
                width: `${Math.min(100, (sanity.current / Math.max(1, sanity.maximum)) * 100)}%`,
              }}
            ></div>
          </div>

          {showSanityControls && (
            <div className="absolute -right-1 top-0 flex flex-col bg-gray-800 border border-gray-700 rounded-md p-2 shadow-lg z-10">
              <div className="flex items-center space-x-2 mb-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 p-0 bg-gray-900 border-gray-700"
                  onClick={() => setSanityLossAmount(Math.max(1, sanityLossAmount - 1))}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm font-medium w-6 text-center">{sanityLossAmount}</span>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 p-0 bg-gray-900 border-gray-700"
                  onClick={() => setSanityLossAmount(sanityLossAmount + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <Button
                  size="sm"
                  variant="destructive"
                  className="text-xs py-1 h-auto bg-purple-900 hover:bg-purple-800 text-white"
                  onClick={() => adjustSanity(-sanityLossAmount)}
                >
                  Perder
                </Button>
                <Button
                  size="sm"
                  variant="default"
                  className="text-xs py-1 h-auto bg-purple-700 hover:bg-purple-600"
                  onClick={() => adjustSanity(sanityLossAmount)}
                >
                  Recuperar
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Barra de Pontos de Esforço */}
        <div
          className="relative"
          onMouseEnter={() => setShowEffortControls(true)}
          onMouseLeave={() => setShowEffortControls(false)}
        >
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-blue-400">Pontos de Esforço</label>
            <span className="text-sm font-bold">
              {effortPoints.current}/{effortPoints.maximum}
            </span>
          </div>
          <div className="w-full bg-gray-800 h-6 rounded-full overflow-hidden">
            <div
              className={`h-full ${getEffortColor()} transition-all duration-500 ease-out`}
              style={{
                width: `${Math.min(100, (effortPoints.current / Math.max(1, effortPoints.maximum)) * 100)}%`,
              }}
            ></div>
          </div>

          {showEffortControls && (
            <div className="absolute -right-1 top-0 flex flex-col bg-gray-800 border border-gray-700 rounded-md p-2 shadow-lg z-10">
              <div className="flex items-center space-x-2 mb-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 p-0 bg-gray-900 border-gray-700"
                  onClick={() => setEffortSpendAmount(Math.max(1, effortSpendAmount - 1))}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm font-medium w-6 text-center">{effortSpendAmount}</span>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 p-0 bg-gray-900 border-gray-700"
                  onClick={() => setEffortSpendAmount(effortSpendAmount + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <Button
                  size="sm"
                  variant="destructive"
                  className="text-xs py-1 h-auto bg-blue-900 hover:bg-blue-800 text-white"
                  onClick={() => adjustEffortPoints(-effortSpendAmount)}
                >
                  Gastar
                </Button>
                <Button
                  size="sm"
                  variant="default"
                  className="text-xs py-1 h-auto bg-blue-700 hover:bg-blue-600"
                  onClick={() => adjustEffortPoints(effortSpendAmount)}
                >
                  Recuperar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
