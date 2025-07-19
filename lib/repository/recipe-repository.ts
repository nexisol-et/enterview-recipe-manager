import type { Recipe, CreateRecipeRequest } from "@/types/recipe"

// Mock data storage - In a real app, this would be a database
const recipes: Recipe[] = [
  {
    id: "1",
    title: "Spaghetti Carbonara",
    description: "Classic Italian pasta dish with eggs, cheese, and pancetta",
    ingredients: [
      "400g spaghetti",
      "200g pancetta",
      "4 large eggs",
      "100g Pecorino Romano cheese",
      "Black pepper",
      "Salt",
    ],
    instructions: [
      "Boil water and cook spaghetti according to package instructions",
      "Cook pancetta in a large pan until crispy",
      "Beat eggs with grated cheese and black pepper",
      "Drain pasta and add to pancetta pan",
      "Remove from heat and quickly mix in egg mixture",
      "Serve immediately with extra cheese",
    ],
    cookingTime: 20,
    servings: 4,
    difficulty: "Medium",
    category: "Italian",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Chicken Stir Fry",
    description: "Quick and healthy stir fry with vegetables",
    ingredients: [
      "500g chicken breast",
      "2 bell peppers",
      "1 onion",
      "2 cloves garlic",
      "2 tbsp soy sauce",
      "1 tbsp olive oil",
      "1 tsp ginger",
    ],
    instructions: [
      "Cut chicken into strips",
      "Heat oil in wok or large pan",
      "Cook chicken until golden",
      "Add vegetables and stir fry for 5 minutes",
      "Add soy sauce and ginger",
      "Serve with rice",
    ],
    cookingTime: 15,
    servings: 3,
    difficulty: "Easy",
    category: "Asian",
    createdAt: "2024-01-14T15:30:00Z",
  },
  {
    id: "3",
    title: "Chocolate Chip Cookies",
    description: "Soft and chewy homemade cookies",
    ingredients: [
      "2 cups flour",
      "1 cup butter",
      "3/4 cup brown sugar",
      "1/2 cup white sugar",
      "2 eggs",
      "2 cups chocolate chips",
      "1 tsp vanilla",
      "1 tsp baking soda",
    ],
    instructions: [
      "Preheat oven to 375°F",
      "Cream butter and sugars",
      "Add eggs and vanilla",
      "Mix in flour and baking soda",
      "Fold in chocolate chips",
      "Drop spoonfuls on baking sheet",
      "Bake for 9-11 minutes",
    ],
    cookingTime: 25,
    servings: 24,
    difficulty: "Easy",
    category: "Dessert",
    createdAt: "2024-01-13T09:15:00Z",
  },
]

export class RecipeRepository {
  static async getAllRecipes(): Promise<Recipe[]> {
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 100))
    return [...recipes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  static async getRecipeById(id: string): Promise<Recipe | null> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return recipes.find((recipe) => recipe.id === id) || null
  }

  static async createRecipe(recipeData: CreateRecipeRequest): Promise<Recipe> {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const newRecipe: Recipe = {
      id: Date.now().toString(),
      ...recipeData,
      createdAt: new Date().toISOString(),
    }

    recipes.push(newRecipe)
    return newRecipe
  }

  static async updateRecipe(id: string, recipeData: Partial<CreateRecipeRequest>): Promise<Recipe | null> {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const index = recipes.findIndex((recipe) => recipe.id === id)
    if (index === -1) return null

    recipes[index] = { ...recipes[index], ...recipeData }
    return recipes[index]
  }

  static async deleteRecipe(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const index = recipes.findIndex((recipe) => recipe.id === id)
    if (index === -1) return false

    recipes.splice(index, 1)
    return true
  }

  static async searchRecipes(query: string): Promise<Recipe[]> {
    await new Promise((resolve) => setTimeout(resolve, 150))

    const lowercaseQuery = query.toLowerCase()
    return recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(lowercaseQuery) ||
        recipe.description.toLowerCase().includes(lowercaseQuery) ||
        recipe.category.toLowerCase().includes(lowercaseQuery) ||
        recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(lowercaseQuery)),
    )
  }
}
