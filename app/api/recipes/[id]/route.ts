import { type NextRequest, NextResponse } from "next/server"
import { RecipeRepository } from "@/lib/repository/recipe-repository"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const recipe = await RecipeRepository.getRecipeById(params.id)

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 })
    }

    return NextResponse.json(recipe)
  } catch (error) {
    console.error("Error fetching recipe:", error)
    return NextResponse.json({ error: "Failed to fetch recipe" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const recipe = await RecipeRepository.updateRecipe(params.id, body)

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 })
    }

    return NextResponse.json(recipe)
  } catch (error) {
    console.error("Error updating recipe:", error)
    return NextResponse.json({ error: "Failed to update recipe" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await RecipeRepository.deleteRecipe(params.id)

    if (!success) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Recipe deleted successfully" })
  } catch (error) {
    console.error("Error deleting recipe:", error)
    return NextResponse.json({ error: "Failed to delete recipe" }, { status: 500 })
  }
}
