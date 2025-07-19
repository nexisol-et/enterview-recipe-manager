import RecipeList from "@/components/recipe-list"
import AddRecipeForm from "@/components/add-recipe-form"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Recipe Manager</h1>
          <p className="text-gray-600">Manage your favorite recipes</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <AddRecipeForm />
          </div>
          <div className="lg:col-span-2">
            <RecipeList />
          </div>
        </div>
      </div>
    </div>
  )
}
