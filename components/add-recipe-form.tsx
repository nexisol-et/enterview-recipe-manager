"use client"

import type React from "react"

import { useState } from "react"
import type { CreateRecipeRequest } from "@/types/recipe"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Plus, X } from "lucide-react"

export default function AddRecipeForm() {
  const [formData, setFormData] = useState<CreateRecipeRequest>({
    title: "",
    description: "",
    ingredients: [""],
    instructions: [""],
    cookingTime: 0,
    servings: 1,
    difficulty: "Easy",
    category: "",
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Filter out empty ingredients and instructions
    const cleanedData = {
      ...formData,
      ingredients: formData.ingredients.filter((item) => item.trim() !== ""),
      instructions: formData.instructions.filter((item) => item.trim() !== ""),
    }

    if (cleanedData.ingredients.length === 0 || cleanedData.instructions.length === 0) {
      alert("Please add at least one ingredient and one instruction")
      return
    }

    try {
      setSubmitting(true)
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData),
      })

      if (response.ok) {
        // Reset form
        setFormData({
          title: "",
          description: "",
          ingredients: [""],
          instructions: [""],
          cookingTime: 0,
          servings: 1,
          difficulty: "Easy",
          category: "",
        })
        // Refresh the page to show new recipe
        window.location.reload()
      }
    } catch (error) {
      console.error("Error creating recipe:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }))
  }

  const removeIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }))
  }

  const updateIngredient = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((item, i) => (i === index ? value : item)),
    }))
  }

  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }))
  }

  const removeInstruction = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index),
    }))
  }

  const updateInstruction = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.map((item, i) => (i === index ? value : item)),
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Recipe</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Recipe Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
              placeholder="e.g., Italian, Asian, Dessert"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="cookingTime">Cooking Time (min)</Label>
              <Input
                id="cookingTime"
                type="number"
                value={formData.cookingTime}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, cookingTime: Number.parseInt(e.target.value) || 0 }))
                }
                min="1"
                required
              />
            </div>

            <div>
              <Label htmlFor="servings">Servings</Label>
              <Input
                id="servings"
                type="number"
                value={formData.servings}
                onChange={(e) => setFormData((prev) => ({ ...prev, servings: Number.parseInt(e.target.value) || 1 }))}
                min="1"
                required
              />
            </div>

            <div>
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value: "Easy" | "Medium" | "Hard") =>
                  setFormData((prev) => ({ ...prev, difficulty: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Ingredients</Label>
              <Button type="button" variant="outline" size="sm" onClick={addIngredient}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  placeholder="Enter ingredient"
                />
                {formData.ingredients.length > 1 && (
                  <Button type="button" variant="outline" size="sm" onClick={() => removeIngredient(index)}>
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Instructions</Label>
              <Button type="button" variant="outline" size="sm" onClick={addInstruction}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Textarea
                  value={instruction}
                  onChange={(e) => updateInstruction(index, e.target.value)}
                  placeholder={`Step ${index + 1}`}
                  rows={2}
                />
                {formData.instructions.length > 1 && (
                  <Button type="button" variant="outline" size="sm" onClick={() => removeInstruction(index)}>
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Adding Recipe..." : "Add Recipe"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
