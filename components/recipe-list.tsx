"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import type { Recipe } from "@/types/recipe"
import RecipeCard from "./recipe-card"
import SearchBar from "./search-bar"
import { Loader2 } from "lucide-react"

export default function RecipeList() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [initialized, setInitialized] = useState(false)

  // Initialize state from URL parameters only once
  useEffect(() => {
    if (!initialized) {
      const urlQuery = searchParams.get("search") || ""
      const urlCategory = searchParams.get("category") || "all"
      setSearchQuery(urlQuery)
      setSelectedCategory(urlCategory)
      setInitialized(true)
    }
  }, [searchParams, initialized])

  // Fetch recipes when search parameters change (but only after initialization)
  useEffect(() => {
    if (initialized) {
      fetchRecipes()
    }
  }, [searchQuery, selectedCategory, initialized])

  const fetchRecipes = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()

      if (searchQuery) params.set("search", searchQuery)
      if (selectedCategory && selectedCategory !== "all") params.set("category", selectedCategory)

      const url = params.toString() ? `/api/recipes?${params.toString()}` : "/api/recipes"
      const response = await fetch(url)

      if (response.ok) {
        const data = await response.json()
        setRecipes(data)
      }
    } catch (error) {
      console.error("Error fetching recipes:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateURL = (query: string, category: string) => {
    const params = new URLSearchParams()
    if (query) params.set("search", query)
    if (category && category !== "all") params.set("category", category)

    const newURL = params.toString() ? `?${params.toString()}` : window.location.pathname
    router.replace(newURL, { scroll: false })
  }

  const handleSearch = (query: string, category: string) => {
    setSearchQuery(query)
    setSelectedCategory(category)
    updateURL(query, category)
  }

  const handleRecipeDeleted = () => {
    fetchRecipes()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading recipes...</span>
      </div>
    )
  }

  const getEmptyStateMessage = () => {
    if (searchQuery && selectedCategory !== "all") {
      return `No recipes found matching "${searchQuery}" in ${selectedCategory} category.`
    } else if (searchQuery) {
      return `No recipes found matching "${searchQuery}".`
    } else if (selectedCategory !== "all") {
      return `No recipes found in ${selectedCategory} category.`
    }
    return "No recipes yet. Add your first recipe!"
  }

  return (
    <div className="space-y-6">
      <SearchBar
        onSearch={handleSearch}
        initialQuery={searchQuery}
        initialCategory={selectedCategory}
        key={`${searchQuery}-${selectedCategory}`} // Force re-render when URL changes
      />

      {recipes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">{getEmptyStateMessage()}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            {recipes.length} recipe{recipes.length !== 1 ? "s" : ""} found
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== "all" && ` in ${selectedCategory} category`}
          </div>
          <div className="grid gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} onDeleted={handleRecipeDeleted} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
