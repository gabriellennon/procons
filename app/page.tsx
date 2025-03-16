"use client"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Download, PlusCircle, Printer, RefreshCw, Trash2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./components/theme-toggle";
import { LanguageSelector } from "./components/language-selector";
import { useLanguage } from "@/contexts/language-context";

export default function Home() {
  const [title, setTitle] = useState<string>("")
  const [newItem, setNewItem] = useState<string>("")
  const [itemType, setItemType] = useState<"pro" | "con">("pro")
  const [prosList, setProsList] = useState<string[]>([])
  const [consList, setConsList] = useState<string[]>([])
  const printRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const { t } = useLanguage()

  // Log current theme for debugging
  useEffect(() => {
    console.log("Current theme:", theme)
  }, [theme])

  const handleAddItem = () => {
    if (!newItem.trim()) return

    if (itemType === "pro") {
      setProsList([...prosList, newItem])
    } else {
      setConsList([...consList, newItem])
    }

    setNewItem("")
  }

  const handleDeleteItem = (type: "pro" | "con", index: number) => {
    if (type === "pro") {
      setProsList(prosList.filter((_, i) => i !== index))
    } else {
      setConsList(consList.filter((_, i) => i !== index))
    }
  }

  const handleResetList = () => {
    setProsList([])
    setConsList([])
    setTitle("")
    setNewItem("")
    setItemType("pro")
  }

  const handlePrint = () => {
    window.print()
  }

  const totalItems = prosList.length + consList.length
  const prosPercentage = totalItems ? Math.round((prosList.length / totalItems) * 100) : 0
  const recommendation = prosPercentage >= 50 ? t.recommended : t.notRecommended

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 print:bg-white print:p-0 transition-colors duration-200">
      <div
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 print:shadow-none print:p-0 transition-colors duration-200"
        ref={printRef}
      >
        <div className="mb-8 print:mb-4">
          <div className="mb-8 flex flex-col-reverse md:flex-row justify-between items-center print:mb-4">
            <div className="flex md:flex-1 w-full md:mr-5 mt-6 md:mt-0">
              <Input
                id="title"
                placeholder={t.listTitle}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg print:border-none print:text-2xl print:font-bold print:p-0 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              />
            </div>
            <div className="flex gap-2 print:hidden">
              {/* Language selector */}
              <LanguageSelector />

              {/* Theme toggle */}
              <ThemeToggle />

              <Button
                variant="outline"
                size="sm"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                onClick={handleResetList}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                {t.resetList}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    {t.export}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handlePrint}>
                    <Printer className="h-4 w-4 mr-2" />
                    {t.printSaveAsPdf}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="mb-8 print:hidden">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Label htmlFor="new-item" className="text-base font-medium mb-2 block dark:text-gray-100">
                {t.addNewItem}
              </Label>
              <div className="flex gap-2">
                <Input
                  id="new-item"
                  placeholder={t.addNewItem}
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
                  className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                />
                <Button onClick={handleAddItem} size="icon">
                  <PlusCircle className="h-5 w-5" />
                  <span className="sr-only">{t.addNewItem}</span>
                </Button>
              </div>
            </div>

            <div className="flex-1">
              <Label className="text-base font-medium mb-2 block dark:text-gray-100">{t.selectType}</Label>
              <RadioGroup
                value={itemType}
                onValueChange={(value) => setItemType(value as "pro" | "con")}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pro" id="pro" />
                  <Label htmlFor="pro" className="text-emerald-600 dark:text-emerald-400 font-medium">
                    {t.pro}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="con" id="con" />
                  <Label htmlFor="con" className="text-rose-600 dark:text-rose-400 font-medium">
                    {t.con}
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:gap-4">
          {/* Pros List */}
          <div className="order-2 md:order-1">
            <h2 className="text-lg font-semibold mb-4 text-emerald-600 dark:text-emerald-400 flex items-center gap-2 print:text-xl">
              <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full"></span>
              {t.pros} ({prosList.length})
            </h2>
            <ul className="space-y-2">
              {prosList.map((item, index) => (
                <li
                  key={`pro-${index}`}
                  className="p-3 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 rounded-lg flex justify-between items-center print:bg-white"
                >
                  <span className="dark:text-gray-100">{item}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 print:hidden"
                    onClick={() => handleDeleteItem("pro", index)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete pro item</span>
                  </Button>
                </li>
              ))}
              {prosList.length === 0 && <li className="text-gray-400 dark:text-gray-500 italic">{t.noItemsYet}</li>}
            </ul>
          </div>

          {/* Cons List */}
          <div className="order-1 md:order-2">
            <h2 className="text-lg font-semibold mb-4 text-rose-600 dark:text-rose-400 flex items-center gap-2 print:text-xl">
              <span className="inline-block w-3 h-3 bg-rose-500 rounded-full"></span>
              {t.cons} ({consList.length})
            </h2>
            <ul className="space-y-2">
              {consList.map((item, index) => (
                <li
                  key={`con-${index}`}
                  className="p-3 bg-rose-50 dark:bg-rose-900/30 border border-rose-100 dark:border-rose-800 rounded-lg flex justify-between items-center print:bg-white"
                >
                  <span className="dark:text-gray-100">{item}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-rose-700 dark:text-rose-400 hover:text-rose-900 hover:bg-rose-100 dark:hover:bg-rose-900/50 print:hidden"
                    onClick={() => handleDeleteItem("con", index)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete con item</span>
                  </Button>
                </li>
              ))}
              {consList.length === 0 && <li className="text-gray-400 dark:text-gray-500 italic">{t.noItemsYet}</li>}
            </ul>
          </div>
        </div>

        {totalItems > 0 && (
          <div className="mt-8 pt-6 border-t dark:border-gray-700 print:mt-4 print:pt-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-base font-medium dark:text-gray-100 print:text-lg">{t.summary}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 print:text-base">
                  {prosList.length} {t.pros.toLowerCase()}, {consList.length} {t.cons.toLowerCase()}
                </p>
              </div>

              <div className="w-full md:w-auto">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-sm font-medium dark:text-gray-100 print:text-base">
                    {prosPercentage}% {t.positive}
                  </div>
                  <div
                    className={cn(
                      "px-2 py-1 text-xs font-medium rounded-full print:text-sm",
                      prosPercentage >= 50
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
                        : "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300",
                    )}
                  >
                    {recommendation}
                  </div>
                </div>

                <div className="w-full md:w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden print:h-4">
                  <div
                    className={cn(
                      "h-full",
                      prosPercentage >= 50 ? "bg-emerald-500 dark:bg-emerald-400" : "bg-rose-500 dark:bg-rose-400",
                    )}
                    style={{ width: `${prosPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-xs text-gray-400 dark:text-gray-500 text-center print:mt-12 print:text-sm">
          {title || t.title} - {t.createdOn} {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}
