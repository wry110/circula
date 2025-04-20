export interface CharacterData {
  name: string
  class: "Lutador" | "Prático" | "Ocultista" | ""
  race: string
  level: number
  background: string
  alignment: string
  experience: number
  ntp: number // Nível de Terror Presenciado (%)
  attributes: {
    forca: number // Força (FOR)
    agilidade: number // Agilidade (AGI)
    intelecto: number // Intelecto (INT)
    disposicao: number // Disposição (DIS)
    vigor: number // Vigor (VIG)
  }
  skills: {
    atletismo: { trained: boolean; bonus: number } // FOR
    culinaria: { trained: boolean; bonus: number } // AGI
    conhecimento: { trained: boolean; bonus: number } // INT
    destreza: { trained: boolean; bonus: number } // AGI
    diplomacia: { trained: boolean; bonus: number } // DIS
    fortitude: { trained: boolean; bonus: number } // VIG
    furtividade: { trained: boolean; bonus: number } // AGI
    intimidacao: { trained: boolean; bonus: number } // DIS
    intuicao: { trained: boolean; bonus: number } // DIS
    investigacao: { trained: boolean; bonus: number } // INT
    labia: { trained: boolean; bonus: number } // DIS
    luta: { trained: boolean; bonus: number } // FOR
    medicina: { trained: boolean; bonus: number } // INT
    ocultismo: { trained: boolean; bonus: number } // INT
    percepcao: { trained: boolean; bonus: number } // DIS
    profissao: { trained: boolean; bonus: number; attribute: string } // VAR
    pontaria: { trained: boolean; bonus: number } // AGI
    reflexos: { trained: boolean; bonus: number } // AGI
    religiao: { trained: boolean; bonus: number } // INT
    sobrevivencia: { trained: boolean; bonus: number } // INT
    tecnologia: { trained: boolean; bonus: number } // INT
    vontade: { trained: boolean; bonus: number } // DIS
  }
  inventory: Array<{
    id: string
    name: string
    quantity: number
    weight: number
    description: string
  }>
  powers: Array<{
    id: string
    name: string
    level: number
    type: string
    actionTime: string
    range: string
    requirements: string
    duration: string
    description: string
  }>
  notes: string
  health: {
    current: number
    maximum: number
    temporary: number
  }
  sanity: {
    current: number
    maximum: number
  }
  effortPoints: {
    current: number
    maximum: number
  }
  savingThrows: {
    forca: boolean
    agilidade: boolean
    intelecto: boolean
    disposicao: boolean
    vigor: boolean
  }
  armorClass: number
  initiative: number
  speed: number
  weapons: Array<{
    id: string
    name: string
    type: string
    damage: string
    damageType: string
    range: string
    properties: string
    ammo?: number
    maxAmmo?: number
  }>
}
