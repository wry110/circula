"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"
import type { CharacterData } from "@/lib/types"

interface InventorySectionProps {
  inventory: CharacterData["inventory"]
  updateInventory: (inventory: CharacterData["inventory"]) => void
}

export default function InventorySection({ inventory, updateInventory }: InventorySectionProps) {
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
    weight: 0,
    description: "",
  })

  const addItem = () => {
    if (newItem.name.trim() === "") return

    updateInventory([...inventory, { ...newItem, id: Date.now().toString() }])
    setNewItem({
      name: "",
      quantity: 1,
      weight: 0,
      description: "",
    })
  }

  const removeItem = (id: string) => {
    updateInventory(inventory.filter((item) => item.id !== id))
  }

  const totalWeight = inventory.reduce((sum, item) => sum + item.weight * item.quantity, 0)

  return (
    <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
      <h2 className="text-xl font-bold text-center mb-4 text-red-500">Inventário</h2>

      <div className="mb-4 p-3 bg-gray-800 rounded-md border border-gray-700">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-5">
            <Label htmlFor="item-name">Nome do Item</Label>
            <Input
              id="item-name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="col-span-2">
            <Label htmlFor="item-quantity">Qtd</Label>
            <Input
              id="item-quantity"
              type="number"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: Number.parseInt(e.target.value) || 1 })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="col-span-2">
            <Label htmlFor="item-weight">Peso</Label>
            <Input
              id="item-weight"
              type="number"
              value={newItem.weight}
              onChange={(e) => setNewItem({ ...newItem, weight: Number.parseFloat(e.target.value) || 0 })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="col-span-3 flex items-end">
            <Button onClick={addItem} className="w-full bg-gray-700 hover:bg-gray-600">
              <Plus className="mr-1 h-4 w-4" /> Adicionar
            </Button>
          </div>

          <div className="col-span-12">
            <Label htmlFor="item-description">Descrição</Label>
            <Textarea
              id="item-description"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              rows={2}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
        {inventory.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Nenhum item no inventário</div>
        ) : (
          inventory.map((item) => (
            <div key={item.id} className="p-3 bg-gray-800 rounded-md border border-gray-700 flex items-start">
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="ml-2 text-sm text-gray-400">
                    Qtd: {item.quantity} | Peso: {item.weight} kg
                  </div>
                </div>
                {item.description && <p className="text-sm text-gray-400 mt-1">{item.description}</p>}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-400 hover:bg-gray-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 text-right font-medium">Peso Total: {totalWeight.toFixed(2)} kg</div>
    </div>
  )
}
