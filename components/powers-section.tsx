"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"
import type { CharacterData } from "@/lib/types"

interface PowersSectionProps {
  powers: CharacterData["powers"]
  updatePowers: (powers: CharacterData["powers"]) => void
}

export default function PowersSection({ powers, updatePowers }: PowersSectionProps) {
  const [newPower, setNewPower] = useState({
    name: "",
    level: 0,
    type: "",
    actionTime: "",
    range: "",
    requirements: "",
    duration: "",
    description: "",
  })

  const powerLevels = [0, 1, 2, 3, 4, 5]
  const powerTypes = [
    "Combate",
    "Ocultismo",
    "Técnica",
    "Suporte",
    "Movimento",
    "Social",
    "Conhecimento",
    "Ritual",
    "Outro",
  ]

  const addPower = () => {
    if (newPower.name.trim() === "") return

    updatePowers([...powers, { ...newPower, id: Date.now().toString() }])
    setNewPower({
      name: "",
      level: 0,
      type: "",
      actionTime: "",
      range: "",
      requirements: "",
      duration: "",
      description: "",
    })
  }

  const removePower = (id: string) => {
    updatePowers(powers.filter((power) => power.id !== id))
  }

  const groupedPowers = powers.reduce(
    (acc, power) => {
      const level = power.level
      if (!acc[level]) {
        acc[level] = []
      }
      acc[level].push(power)
      return acc
    },
    {} as Record<number, typeof powers>,
  )

  return (
    <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
      <h2 className="text-xl font-bold text-center mb-4 text-red-500">Poderes e Habilidades</h2>

      <div className="mb-4 p-3 bg-gray-800 rounded-md border border-gray-700">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-5">
            <Label htmlFor="power-name">Nome do Poder</Label>
            <Input
              id="power-name"
              value={newPower.name}
              onChange={(e) => setNewPower({ ...newPower, name: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="col-span-2">
            <Label htmlFor="power-level">Nível</Label>
            <Select
              value={newPower.level.toString()}
              onValueChange={(value) => setNewPower({ ...newPower, level: Number.parseInt(value) })}
            >
              <SelectTrigger id="power-level" className="bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Nível" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                {powerLevels.map((level) => (
                  <SelectItem key={level} value={level.toString()}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-3">
            <Label htmlFor="power-type">Tipo</Label>
            <Select value={newPower.type} onValueChange={(value) => setNewPower({ ...newPower, type: value })}>
              <SelectTrigger id="power-type" className="bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                {powerTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2 flex items-end">
            <Button onClick={addPower} className="w-full bg-gray-700 hover:bg-gray-600">
              <Plus className="mr-1 h-4 w-4" /> Adicionar
            </Button>
          </div>

          <div className="col-span-4">
            <Label htmlFor="power-action-time">Tempo de Uso</Label>
            <Input
              id="power-action-time"
              value={newPower.actionTime}
              onChange={(e) => setNewPower({ ...newPower, actionTime: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="col-span-4">
            <Label htmlFor="power-range">Alcance</Label>
            <Input
              id="power-range"
              value={newPower.range}
              onChange={(e) => setNewPower({ ...newPower, range: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="col-span-4">
            <Label htmlFor="power-duration">Duração</Label>
            <Input
              id="power-duration"
              value={newPower.duration}
              onChange={(e) => setNewPower({ ...newPower, duration: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="col-span-12">
            <Label htmlFor="power-requirements">Requisitos</Label>
            <Input
              id="power-requirements"
              value={newPower.requirements}
              onChange={(e) => setNewPower({ ...newPower, requirements: e.target.value })}
              placeholder="Requisitos para usar o poder"
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="col-span-12">
            <Label htmlFor="power-description">Descrição</Label>
            <Textarea
              id="power-description"
              value={newPower.description}
              onChange={(e) => setNewPower({ ...newPower, description: e.target.value })}
              rows={2}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {Object.keys(groupedPowers).length === 0 ? (
          <div className="text-center py-8 text-gray-500">Nenhum poder adicionado</div>
        ) : (
          Object.entries(groupedPowers)
            .sort(([levelA], [levelB]) => Number.parseInt(levelA) - Number.parseInt(levelB))
            .map(([level, powerList]) => (
              <div key={level} className="space-y-2">
                <h3 className="font-bold border-b border-gray-700 pb-1 text-yellow-400">Poderes Nível {level}</h3>
                {powerList.map((power) => (
                  <div key={power.id} className="p-3 bg-gray-800 rounded-md border border-gray-700">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-lg">{power.name}</h4>
                        <div className="text-sm text-gray-400">
                          {power.type} (Nível {power.level})
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-1 text-xs">
                          <div>
                            <span className="font-medium text-gray-300">Tempo:</span> {power.actionTime}
                          </div>
                          <div>
                            <span className="font-medium text-gray-300">Alcance:</span> {power.range}
                          </div>
                          <div>
                            <span className="font-medium text-gray-300">Duração:</span> {power.duration}
                          </div>
                        </div>
                        {power.requirements && (
                          <div className="text-xs mt-1">
                            <span className="font-medium text-gray-300">Requisitos:</span> {power.requirements}
                          </div>
                        )}
                        {power.description && <p className="text-sm mt-2 text-gray-300">{power.description}</p>}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removePower(power.id)}
                        className="text-red-500 hover:text-red-400 hover:bg-gray-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ))
        )}
      </div>
    </div>
  )
}
