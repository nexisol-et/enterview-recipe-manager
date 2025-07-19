"use client"

import { useState, useEffect } from "react"
import type { Recipe } from "@/types/recipe"
import RecipeCard from "./recipe-card"
import SearchBar from "./search-bar"
import { Loader2 } from "lucide-react"

export default function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  const fetchRecipes = async (search?: string) => {
    try {
      setLoading(true)
      const url = search ? `/api/recipes?search=${encodeURIComponent(search)}` : "/api/recipes"
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

  useEffect(() => {
    fetchRecipes()
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    fetchRecipes(query)
  }

  const handleRecipeDeleted = () => {
    fetchRecipes(searchQuery)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading recipes...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <SearchBar onSearch={handleSearch} />

      {recipes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {searchQuery ? "No recipes found matching your search." : "No recipes yet. Add your first recipe!"}
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onDeleted={handleRecipeDeleted} />
          ))}
        </div>
      )}
    </div>
  )
}
