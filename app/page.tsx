import CharacterSheet from "@/components/character-sheet"

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4 bg-black min-h-screen text-gray-200">
      <h1 className="text-3xl font-bold text-center mb-8 text-red-500">Ficha de Personagem</h1>
      <CharacterSheet />
    </main>
  )
}
