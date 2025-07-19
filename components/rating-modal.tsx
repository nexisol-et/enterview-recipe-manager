"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import StarRating from "./star-rating"
import type { Recipe } from "@/types/recipe"

interface RatingModalProps {
  recipe: Recipe
  isOpen: boolean
  onClose: () => void
  onRatingSubmit: (rating: number) => void
}

export default function RatingModal({ recipe, isOpen, onClose, onRatingSubmit }: RatingModalProps) {
  const [selectedRating, setSelectedRating] = useState(recipe.rating || 0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (selectedRating === 0) return

    try {
      setIsSubmitting(true)
      await onRatingSubmit(selectedRating)
      onClose()
    } catch (error) {
      console.error("Error submitting rating:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setSelectedRating(recipe.rating || 0)
    onClose()
  }

  const ratingLabels = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rate Recipe</DialogTitle>
          <DialogDescription>How would you rate "{recipe.title}"?</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="text-center">
            <StarRating
              rating={selectedRating}
              size="lg"
              interactive
              onRatingChange={setSelectedRating}
              className="justify-center mb-2"
            />
            {selectedRating > 0 && (
              <p className="text-sm text-gray-600">{ratingLabels[selectedRating as keyof typeof ratingLabels]}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={selectedRating === 0 || isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Rating"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
