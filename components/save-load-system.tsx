"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save, Download, Trash2, Upload } from "lucide-react"
import type { CharacterData } from "@/lib/types"

interface SaveLoadSystemProps {
  character: CharacterData
  setCharacter: (character: CharacterData) => void
}

export default function SaveLoadSystem({ character, setCharacter }: SaveLoadSystemProps) {
  const [saveName, setSaveName] = useState("")
  const [savedCharacters, setSavedCharacters] = useState<{ name: string; data: string }[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("savedCharacters")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const saveCharacter = () => {
    if (!saveName.trim()) return

    const newSavedCharacters = [
      ...savedCharacters.filter((char) => char.name !== saveName),
      { name: saveName, data: JSON.stringify(character) },
    ]

    localStorage.setItem("savedCharacters", JSON.stringify(newSavedCharacters))
    setSavedCharacters(newSavedCharacters)
    setSaveName("")
    alert(`Personagem "${saveName}" salvo com sucesso!`)
  }

  const loadCharacter = (savedData: string) => {
    try {
      const parsedData = JSON.parse(savedData)
      setCharacter(parsedData)
      alert("Personagem carregado com sucesso!")
    } catch (error) {
      alert("Erro ao carregar personagem.")
      console.error(error)
    }
  }

  const deleteCharacter = (name: string) => {
    if (confirm(`Tem certeza que deseja excluir o personagem "${name}"?`)) {
      const newSavedCharacters = savedCharacters.filter((char) => char.name !== name)
      localStorage.setItem("savedCharacters", JSON.stringify(newSavedCharacters))
      setSavedCharacters(newSavedCharacters)
    }
  }

  const exportCharacter = () => {
    const dataStr = JSON.stringify(character)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `${character.name || "personagem"}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const importCharacter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const parsedData = JSON.parse(content)
        setCharacter(parsedData)
        alert("Personagem importado com sucesso!")
      } catch (error) {
        alert("Erro ao importar personagem.")
        console.error(error)
      }
    }
    reader.readAsText(file)

    // Reset input value so the same file can be imported again if needed
    event.target.value = ""
  }

  return (
    <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
      <h2 className="text-xl font-bold text-center mb-4 text-blue-500">Salvar/Carregar Personagem</h2>

      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Nome do save"
          value={saveName}
          onChange={(e) => setSaveName(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Button onClick={saveCharacter} className="bg-green-700 hover:bg-green-600">
          <Save className="mr-2 h-4 w-4" /> Salvar
        </Button>
      </div>

      <div className="flex gap-2 mb-4">
        <Button onClick={exportCharacter} className="bg-blue-700 hover:bg-blue-600 flex-1">
          <Download className="mr-2 h-4 w-4" /> Exportar JSON
        </Button>
        <div className="relative flex-1">
          <Button className="bg-purple-700 hover:bg-purple-600 w-full">
            <Upload className="mr-2 h-4 w-4" /> Importar JSON
          </Button>
          <input
            type="file"
            accept=".json"
            onChange={importCharacter}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>

      {savedCharacters.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Personagens Salvos:</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {savedCharacters.map((char) => (
              <div key={char.name} className="flex items-center justify-between p-2 bg-gray-800 rounded">
                <span className="font-medium">{char.name}</span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => loadCharacter(char.data)}
                    className="bg-blue-700 hover:bg-blue-600 h-8 px-2"
                  >
                    Carregar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteCharacter(char.name)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
