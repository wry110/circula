"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Dice1Icon as Dice } from "lucide-react"
import type { CharacterData } from "@/lib/types"

interface WeaponsSectionProps {
  weapons: CharacterData["weapons"]
  updateWeapons: (weapons: CharacterData["weapons"]) => void
}

export default function WeaponsSection({ weapons, updateWeapons }: WeaponsSectionProps) {
  const [newWeapon, setNewWeapon] = useState({
    name: "",
    type: "Corpo a Corpo",
    damage: "",
    damageType: "Físico",
    range: "",
    properties: "",
    ammo: 0,
    maxAmmo: 0,
  })

  const [diceResult, setDiceResult] = useState<{ id: string; result: number } | null>(null)

  const addWeapon = () => {
    if (newWeapon.name.trim() === "") return

    updateWeapons([...weapons, { ...newWeapon, id: Date.now().toString() }])
    setNewWeapon({
      name: "",
      type: "Corpo a Corpo",
      damage: "",
      damageType: "Físico",
      range: "",
      properties: "",
      ammo: 0,
      maxAmmo: 0,
    })
  }

  const removeWeapon = (id: string) => {
    updateWeapons(weapons.filter((weapon) => weapon.id !== id))
  }

  const updateWeaponAmmo = (id: string, ammo: number) => {
    updateWeapons(
      weapons.map((weapon) =>
        weapon.id === id ? { ...weapon, ammo: Math.max(0, Math.min(ammo, weapon.maxAmmo || 0)) } : weapon,
      ),
    )
  }

  const rollDamage = (id: string, damageFormula: string) => {
    try {
      // Exemplo simples para 2d6+3
      const match = damageFormula.match(/(\d+)d(\d+)(?:\+(\d+))?/)
      if (match) {
        const [_, diceCount, diceSides, bonus] = match
        let total = 0
        for (let i = 0; i < Number(diceCount); i++) {
          total += Math.floor(Math.random() * Number(diceSides)) + 1
        }
        if (bonus) {
          total += Number(bonus)
        }
        setDiceResult({ id, result: total })
      }
    } catch (error) {
      console.error("Erro ao rolar dano:", error)
    }
  }

  const weaponTypes = ["Corpo a Corpo", "Distância", "Arremesso", "Arma de Fogo", "Outro"]
  const damageTypes = [
    "Físico",
    "Balístico",
    "Cortante",
    "Perfurante",
    "Contundente",
    "Fogo",
    "Elétrico",
    "Químico",
    "Mental",
    "Outro",
  ]

  return (
    <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
      <h2 className="text-xl font-bold text-center mb-4 text-red-500">Armas</h2>

      <div className="mb-4 p-3 bg-gray-800 rounded-md border border-gray-700">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-4">
            <Label htmlFor="weapon-name">Nome da Arma</Label>
            <Input
              id="weapon-name"
              value={newWeapon.name}
              onChange={(e) => setNewWeapon({ ...newWeapon, name: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="col-span-4">
            <Label htmlFor="weapon-type">Tipo</Label>
            <Select value={newWeapon.type} onValueChange={(value) => setNewWeapon({ ...newWeapon, type: value })}>
              <SelectTrigger id="weapon-type" className="bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                {weaponTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-4">
            <Label htmlFor="weapon-damage">Dano</Label>
            <Input
              id="weapon-damage"
              value={newWeapon.damage}
              onChange={(e) => setNewWeapon({ ...newWeapon, damage: e.target.value })}
              placeholder="2d6+3"
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="col-span-4">
            <Label htmlFor="weapon-damage-type">Tipo de Dano</Label>
            <Select
              value={newWeapon.damageType}
              onValueChange={(value) => setNewWeapon({ ...newWeapon, damageType: value })}
            >
              <SelectTrigger id="weapon-damage-type" className="bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Tipo de Dano" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                {damageTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-4">
            <Label htmlFor="weapon-range">Alcance</Label>
            <Input
              id="weapon-range"
              value={newWeapon.range}
              onChange={(e) => setNewWeapon({ ...newWeapon, range: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="col-span-4">
            <Label htmlFor="weapon-properties">Propriedades</Label>
            <Input
              id="weapon-properties"
              value={newWeapon.properties}
              onChange={(e) => setNewWeapon({ ...newWeapon, properties: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          {(newWeapon.type === "Arma de Fogo" || newWeapon.type === "Arremesso") && (
            <>
              <div className="col-span-3">
                <Label htmlFor="weapon-ammo">Munição Atual</Label>
                <Input
                  id="weapon-ammo"
                  type="number"
                  value={newWeapon.ammo}
                  onChange={(e) => setNewWeapon({ ...newWeapon, ammo: Number.parseInt(e.target.value) || 0 })}
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>
              <div className="col-span-3">
                <Label htmlFor="weapon-max-ammo">Munição Máxima</Label>
                <Input
                  id="weapon-max-ammo"
                  type="number"
                  value={newWeapon.maxAmmo}
                  onChange={(e) => setNewWeapon({ ...newWeapon, maxAmmo: Number.parseInt(e.target.value) || 0 })}
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>
            </>
          )}

          <div className="col-span-12 flex justify-end mt-2">
            <Button onClick={addWeapon} className="bg-red-900 hover:bg-red-800">
              <Plus className="mr-1 h-4 w-4" /> Adicionar Arma
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
        {weapons.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Nenhuma arma adicionada</div>
        ) : (
          weapons.map((weapon) => (
            <div key={weapon.id} className="p-3 bg-gray-800 rounded-md border border-gray-700">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-lg">{weapon.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => rollDamage(weapon.id, weapon.damage)}
                        className="text-yellow-500 hover:text-yellow-400 hover:bg-gray-700"
                        title="Rolar dano"
                      >
                        <Dice className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeWeapon(weapon.id)}
                        className="text-red-500 hover:text-red-400 hover:bg-gray-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 mt-1">
                    <div className="text-sm">
                      <span className="text-gray-400">Tipo:</span> {weapon.type}
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-400">Dano:</span>{" "}
                      <span className="text-red-400 font-medium">{weapon.damage}</span> ({weapon.damageType})
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-400">Alcance:</span> {weapon.range}
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-400">Propriedades:</span> {weapon.properties}
                    </div>
                  </div>

                  {(weapon.type === "Arma de Fogo" || weapon.type === "Arremesso") && weapon.maxAmmo > 0 && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">Munição:</span>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 p-0 bg-gray-900 border-gray-700"
                            onClick={() => updateWeaponAmmo(weapon.id, (weapon.ammo || 0) - 1)}
                          >
                            -
                          </Button>
                          <span className="text-sm font-medium">
                            {weapon.ammo || 0}/{weapon.maxAmmo || 0}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 p-0 bg-gray-900 border-gray-700"
                            onClick={() => updateWeaponAmmo(weapon.id, (weapon.ammo || 0) + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="w-full bg-gray-900 h-2 rounded-full mt-1">
                        <div
                          className="bg-yellow-600 h-2 rounded-full"
                          style={{
                            width: `${Math.min(100, ((weapon.ammo || 0) / Math.max(1, weapon.maxAmmo || 1)) * 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {diceResult && diceResult.id === weapon.id && (
                    <div className="mt-2 p-2 bg-gray-900 rounded border border-gray-700 text-center">
                      <p className="text-sm">Resultado do dano:</p>
                      <p className="text-xl font-bold text-red-500">{diceResult.result}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
