"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dice1Icon as Dice } from "lucide-react"
import { useState } from "react"
import type { CharacterData } from "@/lib/types"

interface SkillsSectionProps {
  skills: CharacterData["skills"]
  attributes: CharacterData["attributes"]
  updateSkills: (skills: CharacterData["skills"]) => void
}

export default function SkillsSection({ skills, attributes, updateSkills }: SkillsSectionProps) {
  const [diceResults, setDiceResults] = useState<{ value: number; isHighest: boolean }[]>([])
  const [rolledSkill, setRolledSkill] = useState<string | null>(null)
  const [highestResult, setHighestResult] = useState<number | null>(null)

  const skillsData = [
    { id: "atletismo", name: "Atletismo", attribute: "forca" },
    { id: "culinaria", name: "Culinária", attribute: "agilidade" },
    { id: "conhecimento", name: "Conhecimento", attribute: "intelecto" },
    { id: "destreza", name: "Destreza", attribute: "agilidade" },
    { id: "diplomacia", name: "Diplomacia", attribute: "disposicao" },
    { id: "fortitude", name: "Fortitude", attribute: "vigor" },
    { id: "furtividade", name: "Furtividade", attribute: "agilidade" },
    { id: "intimidacao", name: "Intimidação", attribute: "disposicao" },
    { id: "intuicao", name: "Intuição", attribute: "disposicao" },
    { id: "investigacao", name: "Investigação", attribute: "intelecto" },
    { id: "labia", name: "Lábia", attribute: "disposicao" },
    { id: "luta", name: "Luta", attribute: "forca" },
    { id: "medicina", name: "Medicina", attribute: "intelecto" },
    { id: "ocultismo", name: "Ocultismo", attribute: "intelecto" },
    { id: "percepcao", name: "Percepção", attribute: "disposicao" },
    { id: "profissao", name: "Profissão", attribute: "variavel" },
    { id: "pontaria", name: "Pontaria", attribute: "agilidade" },
    { id: "reflexos", name: "Reflexos", attribute: "agilidade" },
    { id: "religiao", name: "Religião", attribute: "intelecto" },
    { id: "sobrevivencia", name: "Sobrevivência", attribute: "intelecto" },
    { id: "tecnologia", name: "Tecnologia", attribute: "intelecto" },
    { id: "vontade", name: "Vontade", attribute: "disposicao" },
  ]

  const getAttributeAbbreviation = (attribute: string) => {
    const abbreviations: Record<string, string> = {
      forca: "FOR",
      agilidade: "AGI",
      intelecto: "INT",
      disposicao: "DIS",
      vigor: "VIG",
      variavel: "VAR",
    }
    return abbreviations[attribute] || attribute.substring(0, 3).toUpperCase()
  }

  const getAttributeValue = (skillId: string, attributeName: string) => {
    if (attributeName === "variavel" && skillId === "profissao") {
      // Para a perícia Profissão que tem atributo variável
      const profAttr = skills.profissao.attribute as keyof typeof attributes
      return attributes[profAttr] || 1
    }
    return attributes[attributeName as keyof typeof attributes] || 1
  }

  const rollSkillCheck = (skillId: string, attributeName: string) => {
    const attributeValue = getAttributeValue(skillId, attributeName)
    const diceCount = Math.max(1, attributeValue) // Garantir pelo menos 1 dado

    // Rolar a quantidade de dados igual ao valor do atributo
    const results = []
    for (let i = 0; i < diceCount; i++) {
      results.push({
        value: Math.floor(Math.random() * 20) + 1,
        isHighest: false,
      })
    }

    // Encontrar o maior resultado
    const highest = Math.max(...results.map((r) => r.value))

    // Marcar o maior resultado
    const markedResults = results.map((r) => ({
      ...r,
      isHighest: r.value === highest,
    }))

    setDiceResults(markedResults)
    setRolledSkill(skillId)
    setHighestResult(highest)
  }

  const getAttributeColor = (attribute: string) => {
    const colors: Record<string, string> = {
      forca: "text-red-400",
      agilidade: "text-green-400",
      intelecto: "text-blue-400",
      disposicao: "text-yellow-400",
      vigor: "text-purple-400",
      variavel: "text-gray-400",
    }
    return colors[attribute] || "text-white"
  }

  const getSuccessLevel = (value: number) => {
    if (value >= 20) return { text: "Extremo!", color: "text-yellow-300" }
    if (value >= 18) return { text: "Alto", color: "text-green-400" }
    if (value >= 15) return { text: "Garantido", color: "text-blue-400" }
    if (value >= 12) return { text: "Básico", color: "text-gray-300" }
    return { text: "Falha", color: "text-red-500" }
  }

  return (
    <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
      <h2 className="text-xl font-bold text-center mb-4 text-red-500">Perícias</h2>

      {highestResult !== null && rolledSkill !== null && (
        <div className="mb-4 p-3 bg-gray-800 rounded-md border border-gray-700 text-center">
          <h3 className="font-bold text-lg">Resultado: {skillsData.find((s) => s.id === rolledSkill)?.name}</h3>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            {diceResults.map((result, index) => (
              <span
                key={index}
                className={`text-xl font-bold ${result.isHighest ? "bg-yellow-900/50 border-yellow-600" : "bg-gray-900/50 border-gray-700"} border rounded px-3 py-1`}
              >
                {result.value}
              </span>
            ))}
          </div>

          <div className="mt-2">
            <span className="text-lg">Maior valor: </span>
            <span className="text-2xl font-bold">{highestResult}</span>
            {" - "}
            <span className={getSuccessLevel(highestResult).color}>{getSuccessLevel(highestResult).text}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {skillsData.map((skill) => {
          const skillKey = skill.id as keyof typeof skills
          const attributeKey = skill.attribute
          const attributeValue = getAttributeValue(skill.id, attributeKey)
          const diceCount = attributeValue

          return (
            <div key={skill.id} className="flex items-center space-x-2 p-2 border rounded bg-gray-800 border-gray-700">
              <Checkbox
                id={`skill-${skill.id}`}
                checked={skills[skillKey].trained}
                onCheckedChange={(checked) => {
                  const newSkills = { ...skills }
                  newSkills[skillKey] = {
                    ...newSkills[skillKey],
                    trained: checked === true,
                  }
                  updateSkills(newSkills)
                }}
                className="border-gray-600"
              />

              <div className="flex-1">
                <Label htmlFor={`skill-${skill.id}`} className="text-sm font-medium">
                  {skill.name}{" "}
                  <span className={`text-xs ${getAttributeColor(attributeKey)}`}>
                    ({getAttributeAbbreviation(attributeKey)})
                  </span>
                </Label>
              </div>

              {skill.id === "profissao" ? (
                <div className="flex items-center space-x-2">
                  <Select
                    value={skills.profissao.attribute}
                    onValueChange={(value) => {
                      const newSkills = { ...skills }
                      newSkills.profissao = {
                        ...newSkills.profissao,
                        attribute: value,
                      }
                      updateSkills(newSkills)
                    }}
                  >
                    <SelectTrigger className="w-20 bg-gray-900 border-gray-700">
                      <SelectValue placeholder="Attr" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="forca">FOR</SelectItem>
                      <SelectItem value="agilidade">AGI</SelectItem>
                      <SelectItem value="intelecto">INT</SelectItem>
                      <SelectItem value="disposicao">DIS</SelectItem>
                      <SelectItem value="vigor">VIG</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    type="number"
                    value={skills[skillKey].bonus}
                    onChange={(e) => {
                      const newSkills = { ...skills }
                      newSkills[skillKey] = {
                        ...newSkills[skillKey],
                        bonus: Number.parseInt(e.target.value) || 0,
                      }
                      updateSkills(newSkills)
                    }}
                    className="w-16 text-center bg-gray-900 border-gray-700 text-white"
                  />
                  <div className="w-10 text-center font-medium">{diceCount}d20</div>
                  <button
                    onClick={() => rollSkillCheck(skill.id, attributeKey)}
                    className="p-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
                    title="Rolar teste"
                  >
                    <Dice className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={skills[skillKey].bonus}
                    onChange={(e) => {
                      const newSkills = { ...skills }
                      newSkills[skillKey] = {
                        ...newSkills[skillKey],
                        bonus: Number.parseInt(e.target.value) || 0,
                      }
                      updateSkills(newSkills)
                    }}
                    className="w-16 text-center bg-gray-900 border-gray-700 text-white"
                  />
                  <div className="w-10 text-center font-medium">{diceCount}d20</div>
                  <button
                    onClick={() => rollSkillCheck(skill.id, attributeKey)}
                    className="p-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
                    title="Rolar teste"
                  >
                    <Dice className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
