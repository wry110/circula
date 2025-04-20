"use client"

import { Textarea } from "@/components/ui/textarea"

interface NotesSectionProps {
  notes: string
  updateNotes: (notes: string) => void
}

export default function NotesSection({ notes, updateNotes }: NotesSectionProps) {
  return (
    <div className="border-2 border-gray-700 rounded-md p-4 bg-gray-900">
      <h2 className="text-xl font-bold text-center mb-4 text-red-500">Anotações</h2>

      <Textarea
        value={notes}
        onChange={(e) => updateNotes(e.target.value)}
        placeholder="História do personagem, eventos importantes, aliados, inimigos, etc."
        className="min-h-[400px] bg-gray-800 border-gray-700 text-white"
      />
    </div>
  )
}
