export interface Recipe {
  id: string
  title: string
  description: string
  ingredients: string[]
  instructions: string[]
  cookingTime: number
  servings: number
  difficulty: "Easy" | "Medium" | "Hard"
  category: string
  createdAt: string
}

export interface CreateRecipeRequest {
  title: string
  description: string
  ingredients: string[]
  instructions: string[]
  cookingTime: number
  servings: number
  difficulty: "Easy" | "Medium" | "Hard"
  category: string
}
