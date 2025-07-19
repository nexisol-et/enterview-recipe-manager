"use client"

import { useState } from "react"
import type { Recipe } from "@/types/recipe"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, ChefHat, Trash2, Eye, EyeOff } from "lucide-react"
import StarRating from "./star-rating"
import RatingModal from "./rating-modal"

interface RecipeCardProps {
  recipe: Recipe
  onDeleted: () => void
}

export default function RecipeCard({ recipe, onDeleted }: RecipeCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [currentRecipe, setCurrentRecipe] = useState(recipe)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this recipe?")) return

    try {
      setDeleting(true)
      const response = await fetch(`/api/recipes/${recipe.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        onDeleted()
      }
    } catch (error) {
      console.error("Error deleting recipe:", error)
    } finally {
      setDeleting(false)
    }
  }

  const handleRatingSubmit = async (rating: number) => {
    try {
      const response = await fetch(`/api/recipes/${recipe.id}/rating`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating }),
      })

      if (response.ok) {
        const updatedRecipe = await response.json()
        setCurrentRecipe(updatedRecipe)
      }
    } catch (error) {
      console.error("Error updating rating:", error)
      throw error
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-xl mb-2">{currentRecipe.title}</CardTitle>
              <p className="text-gray-600 mb-3">{currentRecipe.description}</p>

              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {currentRecipe.cookingTime} min
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {currentRecipe.servings} servings
                </Badge>
                <Badge className={getDifficultyColor(currentRecipe.difficulty)}>
                  <ChefHat className="w-3 h-3 mr-1" />
                  {currentRecipe.difficulty}
                </Badge>
                <Badge variant="secondary">{currentRecipe.category}</Badge>
                <button
                  onClick={() => setShowRatingModal(true)}
                  className="inline-flex items-center hover:bg-gray-100 rounded px-1 py-0.5 transition-colors"
                >
                  <StarRating rating={currentRecipe.rating || 0} size="sm" />
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDelete} disabled={deleting}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {showDetails && (
          <CardContent className="pt-0">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Ingredients:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {currentRecipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Instructions:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  {currentRecipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      <RatingModal
        recipe={currentRecipe}
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        onRatingSubmit={handleRatingSubmit}
      />
    </>
  )
}
