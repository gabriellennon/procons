"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define available languages
export type Language = "en" | "pt" | "es"

// Define translations interface
export interface Translations {
  title: string
  listTitle: string
  addNewItem: string
  selectType: string
  pro: string
  con: string
  resetList: string
  export: string
  printSaveAsPdf: string
  pros: string
  cons: string
  noItemsYet: string
  summary: string
  positive: string
  recommended: string
  notRecommended: string
  createdOn: string
  lightMode: string
  darkMode: string
  titleSeo: string
  descriptionSeo: string

}

// Define translations for each language
const translations: Record<Language, Translations> = {
  en: {
    title: "Pros & Cons List",
    listTitle: "List Title",
    addNewItem: "Add New Item",
    selectType: "Select Type",
    pro: "Pro",
    con: "Con",
    resetList: "Reset List",
    export: "Export",
    printSaveAsPdf: "Print / Save as PDF",
    pros: "Pros",
    cons: "Cons",
    noItemsYet: "No items added yet",
    summary: "Summary",
    positive: "Positive",
    recommended: "Recommended",
    notRecommended: "Not Recommended",
    createdOn: "Created on",
    lightMode: "Light mode",
    darkMode: "Dark mode",
    titleSeo: "Pros and Cons List – Make Smarter Decisions Online",
    descriptionSeo: "Easily create a pros and cons list to analyze decisions before taking action. Compare advantages and disadvantages visually and get a data-driven recommendation!"
  },
  pt: {
    title: "Lista de Prós e Contras",
    listTitle: "Título da Lista",
    addNewItem: "Adicionar Novo Item",
    selectType: "Selecionar Tipo",
    pro: "Pró",
    con: "Contra",
    resetList: "Reiniciar Lista",
    export: "Exportar",
    printSaveAsPdf: "Imprimir / Salvar como PDF",
    pros: "Prós",
    cons: "Contras",
    noItemsYet: "Nenhum item adicionado ainda",
    summary: "Resumo",
    positive: "Positivo",
    recommended: "Recomendado",
    notRecommended: "Não Recomendado",
    createdOn: "Criado em",
    lightMode: "Modo claro",
    darkMode: "Modo escuro",
    titleSeo: "Lista de Prós e Contras – Tome Decisões Inteligentes",
    descriptionSeo: "Crie listas de prós e contras para tomar decisões melhores! Compare vantagens e desvantagens visualmente e obtenha uma recomendação baseada nos seus critérios.",
  },
  es: {
    title: "Lista de Pros y Contras",
    listTitle: "Título de la Lista",
    addNewItem: "Añadir Nuevo Elemento",
    selectType: "Seleccionar Tipo",
    pro: "Pro",
    con: "Contra",
    resetList: "Reiniciar Lista",
    export: "Exportar",
    printSaveAsPdf: "Imprimir / Guardar como PDF",
    pros: "Pros",
    cons: "Contras",
    noItemsYet: "Aún no se han añadido elementos",
    summary: "Resumen",
    positive: "Positivo",
    recommended: "Recomendado",
    notRecommended: "No Recomendado",
    createdOn: "Creado el",
    lightMode: "Modo claro",
    darkMode: "Modo oscuro",
    titleSeo: "Lista de Pros y Contras – Toma Decisiones Inteligentes",
    descriptionSeo: "Crea listas de pros y contras fácilmente para analizar decisiones antes de actuar. Compara ventajas y desventajas visualmente y obtén una recomendación basada en datos."
  },
}

// Create language context
interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Create language provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize with browser language or default to English
  const [language, setLanguageState] = useState<Language>("en")

  // Load saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "pt", "es"].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0]
      if (browserLang === "pt") setLanguageState("pt")
      else if (browserLang === "es") setLanguageState("es")
      // Default is already "en"
    }
  }, [])

  // Save language preference when it changes
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  // Get translations for current language
  const t = translations[language]

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Create hook for using language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

