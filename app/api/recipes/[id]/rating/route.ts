import { type NextRequest, NextResponse } from "next/server"
import { RecipeRepository } from "@/lib/repository/recipe-repository"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { rating } = body

    // Validate rating
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 })
    }

    const recipe = await RecipeRepository.updateRecipeRating(params.id, rating)

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 })
    }

    return NextResponse.json(recipe)
  } catch (error) {
    console.error("Error updating recipe rating:", error)
    return NextResponse.json({ error: "Failed to update recipe rating" }, { status: 500 })
  }
}
