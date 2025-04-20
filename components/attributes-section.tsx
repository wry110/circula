"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import type { CharacterData } from "@/lib/types"

interface AttributesSectionProps {
  attributes: CharacterData["attributes"]
  updateAttributes: (attributes: CharacterData["attributes"]) => void
  savingThrows: CharacterData["savingThrows"]
  updateSavingThrows: (savingThrows: CharacterData["savingThrows"]) => void
}

export default function AttributesSection({
  attributes,
  updateAttributes,
  savingThrows,
  updateSavingThrows,
}: AttributesSectionProps) {
  const attributeNames = {
    forca: "Força (FOR)",
    agilidade: "Agilidade (AGI)",
    intelecto: "Intelecto (INT)",
    disposicao: "Disposição (DIS)",
    vigor: "Vigor (VIG)",
  }

  const attributeColors = {
    forca: "border-red-700 bg-red-900/30",
    agilidade: "border-green-700 bg-green-900/30",
    intelecto: "border-blue-700 bg-blue-900/30",
    disposicao: "border-yellow-700 bg-yellow-900/30",
    vigor: "border-purple-700 bg-purple-900/30",
  }

  return (
    <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
      <h2 className="text-xl font-bold text-center mb-4 text-red-500">Atributos</h2>
      <p className="text-center text-sm text-gray-400 mb-4">
        O valor do atributo (1-10) representa o número de dados que você joga em testes relacionados
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {Object.entries(attributes).map(([key, value]) => {
          const attrKey = key as keyof typeof attributes

          return (
            <div key={key} className="flex flex-col items-center">
              <div
                className={`w-24 h-24 border-2 ${attributeColors[attrKey]} rounded-md flex flex-col items-center justify-center`}
              >
                <Label htmlFor={`attr-${key}`} className="text-sm font-bold">
                  {attributeNames[attrKey as keyof typeof attributeNames]}
                </Label>
                <input
                  id={`attr-${key}`}
                  type="number"
                  min="1"
                  max="10"
                  value={value}
                  onChange={(e) => {
                    const newValue = Math.min(10, Math.max(1, Number.parseInt(e.target.value) || 1))
                    const newAttributes = { ...attributes }
                    newAttributes[attrKey] = newValue
                    updateAttributes(newAttributes)
                  }}
                  className="w-16 text-center text-xl font-bold border-0 focus:ring-0 bg-transparent text-white"
                />
                <div className="text-xs font-medium mt-1">{value > 0 ? `${value}d20` : "1d20"}</div>
              </div>

              <div className="mt-2 flex items-center">
                <Checkbox
                  id={`save-${key}`}
                  checked={savingThrows[attrKey as keyof typeof savingThrows]}
                  onCheckedChange={(checked) => {
                    const newSavingThrows = { ...savingThrows }
                    newSavingThrows[attrKey as keyof typeof savingThrows] = checked === true
                    updateSavingThrows(newSavingThrows)
                  }}
                  className="border-gray-600"
                />
                <Label htmlFor={`save-${key}`} className="ml-2 text-sm">
                  Teste de Resistência
                </Label>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 p-4 border border-gray-700 rounded bg-gray-800/50">
        <h3 className="text-center text-lg font-semibold mb-2">Sistema de Sucesso</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
          <div className="p-2 bg-gray-800 rounded">
            <div className="font-bold">12+</div>
            <div className="text-sm text-gray-300">Sucesso Básico</div>
          </div>
          <div className="p-2 bg-gray-800 rounded">
            <div className="font-bold text-blue-400">15+</div>
            <div className="text-sm text-gray-300">Sucesso Garantido</div>
          </div>
          <div className="p-2 bg-gray-800 rounded">
            <div className="font-bold text-green-400">18+</div>
            <div className="text-sm text-gray-300">Sucesso Alto</div>
          </div>
          <div className="p-2 bg-gray-800 rounded">
            <div className="font-bold text-yellow-300">20</div>
            <div className="text-sm text-gray-300">Sucesso Extremo</div>
          </div>
        </div>
      </div>
    </div>
  )
}
