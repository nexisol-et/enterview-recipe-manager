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
  rating?: number // 1-5 stars, optional
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

export interface UpdateRatingRequest {
  rating: number
}
