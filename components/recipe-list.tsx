"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import type { Recipe } from "@/types/recipe"
import RecipeCard from "./recipe-card"
import SearchBar from "./search-bar"
import { Loader2 } from "lucide-react"

export default function RecipeList() {
  const searchParams = useSearchParams()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const fetchRecipes = useCallback(async (search?: string, category?: string) => {
    try {
      setLoading(true)
      const params = new URLSearchParams()

      if (search) params.set("search", search)
      if (category && category !== "all") params.set("category", category)

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
  }, [])

  // Initialize from URL parameters
  useEffect(() => {
    const urlSearch = searchParams.get("search") || ""
    const urlCategory = searchParams.get("category") || "all"

    setSearchQuery(urlSearch)
    setCategoryFilter(urlCategory)
    fetchRecipes(urlSearch, urlCategory)
  }, [searchParams, fetchRecipes])

  const handleSearch = useCallback(
    (query: string, category: string) => {
      setSearchQuery(query)
      setCategoryFilter(category)
      fetchRecipes(query, category)
    },
    [fetchRecipes],
  )

  const handleRecipeDeleted = useCallback(() => {
    fetchRecipes(searchQuery, categoryFilter)
  }, [fetchRecipes, searchQuery, categoryFilter])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading recipes...</span>
      </div>
    )
  }

  const getEmptyStateMessage = () => {
    if (searchQuery && categoryFilter !== "all") {
      return `No recipes found matching "${searchQuery}" in ${categoryFilter} category.`
    } else if (searchQuery) {
      return `No recipes found matching "${searchQuery}".`
    } else if (categoryFilter !== "all") {
      return `No recipes found in ${categoryFilter} category.`
    }
    return "No recipes yet. Add your first recipe!"
  }

  return (
    <div className="space-y-6">
      <SearchBar onSearch={handleSearch} />

      {recipes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">{getEmptyStateMessage()}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            {recipes.length} recipe{recipes.length !== 1 ? "s" : ""} found
            {searchQuery && ` for "${searchQuery}"`}
            {categoryFilter !== "all" && ` in ${categoryFilter} category`}
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
