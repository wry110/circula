"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { CharacterData } from "@/lib/types"

interface CharacterInfoProps {
  character: CharacterData
  updateCharacter: (updates: Partial<CharacterData>) => void
}

export default function CharacterInfo({ character, updateCharacter }: CharacterInfoProps) {
  return (
    <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
      <h2 className="text-2xl font-bold text-center mb-4 text-red-500">Informações do Personagem</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome do Personagem</Label>
          <Input
            id="name"
            value={character.name}
            onChange={(e) => updateCharacter({ name: e.target.value })}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="class">Classe</Label>
          <Select
            value={character.class}
            onValueChange={(value) => updateCharacter({ class: value as CharacterData["class"] })}
          >
            <SelectTrigger id="class" className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Selecione uma classe" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              <SelectItem value="Lutador">Lutador</SelectItem>
              <SelectItem value="Prático">Prático</SelectItem>
              <SelectItem value="Ocultista">Ocultista</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="race">Origem</Label>
          <Input
            id="race"
            value={character.race}
            onChange={(e) => updateCharacter({ race: e.target.value })}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="level">Nível</Label>
          <Input
            id="level"
            type="number"
            value={character.level}
            onChange={(e) => updateCharacter({ level: Number.parseInt(e.target.value) || 1 })}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="background">Histórico</Label>
          <Input
            id="background"
            value={character.background}
            onChange={(e) => updateCharacter({ background: e.target.value })}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="alignment">Tendência</Label>
          <Input
            id="alignment"
            value={character.alignment}
            onChange={(e) => updateCharacter({ alignment: e.target.value })}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="space-y-2 md:col-span-3">
          <Label htmlFor="experience">Pontos de Experiência</Label>
          <Input
            id="experience"
            type="number"
            value={character.experience}
            onChange={(e) => updateCharacter({ experience: Number.parseInt(e.target.value) || 0 })}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>
    </div>
  )
}
