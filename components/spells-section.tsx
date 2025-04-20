"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"
import type { CharacterData } from "@/lib/types"

interface SpellsSectionProps {
  spells: CharacterData["spells"]
  updateSpells: (spells: CharacterData["spells"]) => void
}

export default function SpellsSection({ spells, updateSpells }: SpellsSectionProps) {
  const [newSpell, setNewSpell] = useState({
    name: "",
    level: 0,
    school: "",
    castingTime: "",
    range: "",
    components: "",
    duration: "",
    description: "",
  })

  const spellLevels = [0, 1, 2, 3, 4, 5]
  const powerTypes = ["Combate", "Magia", "Técnica", "Suporte", "Movimento", "Social", "Conhecimento", "Outro"]

  const addSpell = () => {
    if (newSpell.name.trim() === "") return

    updateSpells([...spells, { ...newSpell, id: Date.now().toString() }])
    setNewSpell({
      name: "",
      level: 0,
      school: "",
      castingTime: "",
      range: "",
      components: "",
      duration: "",
      description: "",
    })
  }

  const removeSpell = (id: string) => {
    updateSpells(spells.filter((spell) => spell.id !== id))
  }

  const groupedSpells = spells.reduce(
    (acc, spell) => {
      const level = spell.level
      if (!acc[level]) {
        acc[level] = []
      }
      acc[level].push(spell)
      return acc
    },
    {} as Record<number, typeof spells>,
  )

  return (
    <div className="border-2 border-amber-800 rounded-md p-4 bg-amber-50">
      <h2 className="text-xl font-bold text-center mb-4 text-amber-900">Poderes e Habilidades</h2>

      <div className="mb-4 p-3 bg-white rounded-md border">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-5">
            <Label htmlFor="spell-name">Nome do Poder</Label>
            <Input
              id="spell-name"
              value={newSpell.name}
              onChange={(e) => setNewSpell({ ...newSpell, name: e.target.value })}
            />
          </div>

          <div className="col-span-2">
            <Label htmlFor="spell-level">Nível</Label>
            <Select
              value={newSpell.level.toString()}
              onValueChange={(value) => setNewSpell({ ...newSpell, level: Number.parseInt(value) })}
            >
              <SelectTrigger id="spell-level">
                <SelectValue placeholder="Nível" />
              </SelectTrigger>
              <SelectContent>
                {spellLevels.map((level) => (
                  <SelectItem key={level} value={level.toString()}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-3">
            <Label htmlFor="spell-school">Tipo</Label>
            <Select value={newSpell.school} onValueChange={(value) => setNewSpell({ ...newSpell, school: value })}>
              <SelectTrigger id="spell-school">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                {powerTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2 flex items-end">
            <Button onClick={addSpell} className="w-full">
              <Plus className="mr-1 h-4 w-4" /> Adicionar
            </Button>
          </div>

          <div className="col-span-4">
            <Label htmlFor="spell-casting-time">Tempo de Uso</Label>
            <Input
              id="spell-casting-time"
              value={newSpell.castingTime}
              onChange={(e) => setNewSpell({ ...newSpell, castingTime: e.target.value })}
            />
          </div>

          <div className="col-span-4">
            <Label htmlFor="spell-range">Alcance</Label>
            <Input
              id="spell-range"
              value={newSpell.range}
              onChange={(e) => setNewSpell({ ...newSpell, range: e.target.value })}
            />
          </div>

          <div className="col-span-4">
            <Label htmlFor="spell-duration">Duração</Label>
            <Input
              id="spell-duration"
              value={newSpell.duration}
              onChange={(e) => setNewSpell({ ...newSpell, duration: e.target.value })}
            />
          </div>

          <div className="col-span-12">
            <Label htmlFor="spell-components">Requisitos</Label>
            <Input
              id="spell-components"
              value={newSpell.components}
              onChange={(e) => setNewSpell({ ...newSpell, components: e.target.value })}
              placeholder="Requisitos para usar o poder"
            />
          </div>

          <div className="col-span-12">
            <Label htmlFor="spell-description">Descrição</Label>
            <Textarea
              id="spell-description"
              value={newSpell.description}
              onChange={(e) => setNewSpell({ ...newSpell, description: e.target.value })}
              rows={2}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {Object.keys(groupedSpells).length === 0 ? (
          <div className="text-center py-8 text-gray-500">Nenhum poder adicionado</div>
        ) : (
          Object.entries(groupedSpells)
            .sort(([levelA], [levelB]) => Number.parseInt(levelA) - Number.parseInt(levelB))
            .map(([level, spellList]) => (
              <div key={level} className="space-y-2">
                <h3 className="font-bold border-b pb-1">Poderes Nível {level}</h3>
                {spellList.map((spell) => (
                  <div key={spell.id} className="p-3 bg-white rounded-md border">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{spell.name}</h4>
                        <div className="text-sm text-gray-500">
                          {spell.school} (Nível {spell.level})
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-1 text-xs">
                          <div>
                            <span className="font-medium">Tempo:</span> {spell.castingTime}
                          </div>
                          <div>
                            <span className="font-medium">Alcance:</span> {spell.range}
                          </div>
                          <div>
                            <span className="font-medium">Duração:</span> {spell.duration}
                          </div>
                        </div>
                        {spell.components && (
                          <div className="text-xs mt-1">
                            <span className="font-medium">Requisitos:</span> {spell.components}
                          </div>
                        )}
                        {spell.description && <p className="text-sm mt-2">{spell.description}</p>}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSpell(spell.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
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
