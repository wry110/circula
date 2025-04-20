"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CharacterInfo from "./character-info"
import AttributesSection from "./attributes-section"
import SkillsSection from "./skills-section"
import InventorySection from "./inventory-section"
import PowersSection from "./powers-section"
import NotesSection from "./notes-section"
import WeaponsSection from "./weapons-section"
import StatsBar from "./stats-bar"
import DiceRoller from "./dice-roller"
import type { CharacterData } from "@/lib/types"

export default function CharacterSheet() {
  const [character, setCharacter] = useState<CharacterData>({
    name: "",
    class: "",
    race: "",
    level: 1,
    background: "",
    alignment: "",
    experience: 0,
    ntp: 5, // Nível de Terror Presenciado (%)
    attributes: {
      forca: 1,
      agilidade: 1,
      intelecto: 1,
      disposicao: 1,
      vigor: 1,
    },
    skills: {
      atletismo: { trained: false, bonus: 0 },
      culinaria: { trained: false, bonus: 0 },
      conhecimento: { trained: false, bonus: 0 },
      destreza: { trained: false, bonus: 0 },
      diplomacia: { trained: false, bonus: 0 },
      fortitude: { trained: false, bonus: 0 },
      furtividade: { trained: false, bonus: 0 },
      intimidacao: { trained: false, bonus: 0 },
      intuicao: { trained: false, bonus: 0 },
      investigacao: { trained: false, bonus: 0 },
      labia: { trained: false, bonus: 0 },
      luta: { trained: false, bonus: 0 },
      medicina: { trained: false, bonus: 0 },
      ocultismo: { trained: false, bonus: 0 },
      percepcao: { trained: false, bonus: 0 },
      profissao: { trained: false, bonus: 0, attribute: "intelecto" },
      pontaria: { trained: false, bonus: 0 },
      reflexos: { trained: false, bonus: 0 },
      religiao: { trained: false, bonus: 0 },
      sobrevivencia: { trained: false, bonus: 0 },
      tecnologia: { trained: false, bonus: 0 },
      vontade: { trained: false, bonus: 0 },
    },
    inventory: [],
    powers: [],
    notes: "",
    health: {
      current: 10,
      maximum: 10,
      temporary: 0,
    },
    sanity: {
      current: 12,
      maximum: 12,
    },
    effortPoints: {
      current: 2,
      maximum: 2,
    },
    savingThrows: {
      forca: false,
      agilidade: false,
      intelecto: false,
      disposicao: false,
      vigor: false,
    },
    armorClass: 10,
    initiative: 0,
    speed: 30,
    weapons: [],
  })

  // Modifique o useEffect para garantir que os cálculos estejam corretos
  useEffect(() => {
    if (!character.class) return

    const { vigor, disposicao, forca } = character.attributes
    const ntpMultiplier = Math.floor(character.ntp / 5)

    let maxHealth = 0
    let maxSanity = 0
    let maxEffort = 0

    switch (character.class) {
      case "Lutador":
        maxHealth = 20 + vigor + ntpMultiplier * (4 + vigor)
        maxSanity = 12 + ntpMultiplier * 3
        maxEffort = 2 + disposicao + ntpMultiplier * (2 + disposicao)
        break
      case "Prático":
        maxHealth = 16 + vigor + ntpMultiplier * (3 + vigor)
        maxSanity = 16 + ntpMultiplier * 4
        maxEffort = 3 + disposicao + ntpMultiplier * (3 + disposicao)
        break
      case "Ocultista":
        maxHealth = 12 + vigor + ntpMultiplier * (2 + vigor)
        maxSanity = 20 + ntpMultiplier * 5
        maxEffort = 4 + disposicao + ntpMultiplier * (4 + disposicao)
        break
    }

    // Atualizar defesa baseada na força
    const defense = 10 + character.attributes.forca

    setCharacter((prev) => ({
      ...prev,
      health: {
        ...prev.health,
        maximum: maxHealth,
        current: prev.health.current > maxHealth ? maxHealth : prev.health.current,
      },
      sanity: {
        ...prev.sanity,
        maximum: maxSanity,
        current: prev.sanity.current > maxSanity ? maxSanity : prev.sanity.current,
      },
      effortPoints: {
        ...prev.effortPoints,
        maximum: maxEffort,
        current: prev.effortPoints.current > maxEffort ? maxEffort : prev.effortPoints.current,
      },
      armorClass: defense,
    }))
  }, [character.class, character.attributes, character.ntp])

  const updateCharacter = (updates: Partial<CharacterData>) => {
    setCharacter((prev) => ({ ...prev, ...updates }))
  }

  const updateAttributes = (attributes: typeof character.attributes) => {
    setCharacter((prev) => ({ ...prev, attributes }))
  }

  const updateSkills = (skills: typeof character.skills) => {
    setCharacter((prev) => ({ ...prev, skills }))
  }

  const updateInventory = (inventory: typeof character.inventory) => {
    setCharacter((prev) => ({ ...prev, inventory }))
  }

  const updatePowers = (powers: typeof character.powers) => {
    setCharacter((prev) => ({ ...prev, powers }))
  }

  const updateNotes = (notes: string) => {
    setCharacter((prev) => ({ ...prev, notes }))
  }

  const updateHealth = (health: typeof character.health) => {
    setCharacter((prev) => ({ ...prev, health }))
  }

  const updateSanity = (sanity: typeof character.sanity) => {
    setCharacter((prev) => ({ ...prev, sanity }))
  }

  const updateEffortPoints = (effortPoints: typeof character.effortPoints) => {
    setCharacter((prev) => ({ ...prev, effortPoints }))
  }

  const updateSavingThrows = (savingThrows: typeof character.savingThrows) => {
    setCharacter((prev) => ({ ...prev, savingThrows }))
  }

  const updateWeapons = (weapons: typeof character.weapons) => {
    setCharacter((prev) => ({ ...prev, weapons }))
  }

  return (
    <Card className="p-4 bg-[#1a1a1a] border-2 border-gray-800 text-gray-200">
      <div className="mb-6">
        <CharacterInfo character={character} updateCharacter={updateCharacter} />
      </div>

      <div className="mb-6">
        <StatsBar
          health={character.health}
          sanity={character.sanity}
          effortPoints={character.effortPoints}
          updateHealth={updateHealth}
          updateSanity={updateSanity}
          updateEffortPoints={updateEffortPoints}
        />
      </div>

      <div className="mb-6">
        <DiceRoller />
      </div>

      <Tabs defaultValue="attributes" className="w-full">
        <TabsList className="grid grid-cols-7 mb-4 bg-gray-800">
          <TabsTrigger value="attributes" className="data-[state=active]:bg-gray-700">
            Atributos
          </TabsTrigger>
          <TabsTrigger value="skills" className="data-[state=active]:bg-gray-700">
            Perícias
          </TabsTrigger>
          <TabsTrigger value="combat" className="data-[state=active]:bg-gray-700">
            Combate
          </TabsTrigger>
          <TabsTrigger value="weapons" className="data-[state=active]:bg-gray-700">
            Armas
          </TabsTrigger>
          <TabsTrigger value="inventory" className="data-[state=active]:bg-gray-700">
            Inventário
          </TabsTrigger>
          <TabsTrigger value="powers" className="data-[state=active]:bg-gray-700">
            Poderes
          </TabsTrigger>
          <TabsTrigger value="notes" className="data-[state=active]:bg-gray-700">
            Anotações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="attributes" className="mt-0">
          <AttributesSection
            attributes={character.attributes}
            updateAttributes={updateAttributes}
            savingThrows={character.savingThrows}
            updateSavingThrows={updateSavingThrows}
          />
        </TabsContent>

        <TabsContent value="skills" className="mt-0">
          <SkillsSection skills={character.skills} attributes={character.attributes} updateSkills={updateSkills} />
        </TabsContent>

        <TabsContent value="combat" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
              <h3 className="text-lg font-bold text-center mb-4 text-red-500">Estatísticas de Combate</h3>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-sm font-medium">Defesa</label>
                  <input
                    type="number"
                    value={character.armorClass}
                    readOnly
                    className="w-full p-2 border rounded text-center bg-gray-800 border-gray-700 text-white"
                  />
                  <p className="text-xs text-gray-400 text-center mt-1">10 + FOR</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Iniciativa</label>
                  <input
                    type="number"
                    value={character.initiative}
                    onChange={(e) =>
                      updateCharacter({
                        initiative: Number.parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full p-2 border rounded text-center bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Deslocamento</label>
                  <input
                    type="number"
                    value={character.speed}
                    onChange={(e) =>
                      updateCharacter({
                        speed: Number.parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full p-2 border rounded text-center bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
              <h3 className="text-lg font-bold text-center mb-4 text-purple-400">Condições</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center">
                  <label className="text-sm font-medium mb-2">Medo</label>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={`fear-${i}`} className="w-6 h-6 border border-purple-500 rounded-full"></div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <label className="text-sm font-medium mb-2">Trauma</label>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={`trauma-${i}`} className="w-6 h-6 border border-red-500 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900 md:col-span-2">
              <h3 className="text-lg font-bold text-center mb-4 text-yellow-400">Nível de Terror Presenciado (NTP)</h3>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={character.ntp}
                  onChange={(e) => updateCharacter({ ntp: Number.parseInt(e.target.value) })}
                  className="flex-1 accent-yellow-600"
                />
                <div className="w-16 text-center text-xl font-bold">{character.ntp}%</div>
              </div>
              <p className="text-xs text-gray-400 text-center mt-2">
                Cada 5% de NTP aumenta seus pontos máximos de vida, sanidade e esforço
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="weapons" className="mt-0">
          <WeaponsSection weapons={character.weapons} updateWeapons={updateWeapons} />
        </TabsContent>

        <TabsContent value="inventory" className="mt-0">
          <InventorySection inventory={character.inventory} updateInventory={updateInventory} />
        </TabsContent>

        <TabsContent value="powers" className="mt-0">
          <PowersSection powers={character.powers} updatePowers={updatePowers} />
        </TabsContent>

        <TabsContent value="notes" className="mt-0">
          <NotesSection notes={character.notes} updateNotes={updateNotes} />
        </TabsContent>
      </Tabs>
    </Card>
  )
}
