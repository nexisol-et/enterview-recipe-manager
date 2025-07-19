import { type NextRequest, NextResponse } from "next/server"
import { RecipeRepository } from "@/lib/repository/recipe-repository"
import type { CreateRecipeRequest } from "@/types/recipe"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const category = searchParams.get("category")

    let recipes
    if (search || category) {
      recipes = await RecipeRepository.searchRecipes(search || "", category || "")
    } else {
      recipes = await RecipeRepository.getAllRecipes()
    }

    return NextResponse.json(recipes)
  } catch (error) {
    console.error("Error fetching recipes:", error)
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateRecipeRequest = await request.json()

    // Basic validation
    if (!body.title || !body.ingredients || !body.instructions) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const recipe = await RecipeRepository.createRecipe(body)
    return NextResponse.json(recipe, { status: 201 })
  } catch (error) {
    console.error("Error creating recipe:", error)
    return NextResponse.json({ error: "Failed to create recipe" }, { status: 500 })
  }
}
