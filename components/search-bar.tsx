"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

interface SearchBarProps {
  onSearch: (query: string, category: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(searchParams.get("search") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "all")

  // Available categories - in a real app, this might come from an API
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Italian", label: "Italian" },
    { value: "Asian", label: "Asian" },
    { value: "Dessert", label: "Dessert" },
    { value: "American", label: "American" },
    { value: "Mexican", label: "Mexican" },
    { value: "Indian", label: "Indian" },
    { value: "Mediterranean", label: "Mediterranean" },
  ]

  // Update URL parameters when search or category changes
  const updateURL = (searchQuery: string, selectedCategory: string) => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("search", searchQuery)
    if (selectedCategory && selectedCategory !== "all") params.set("category", selectedCategory)

    const newURL = params.toString() ? `?${params.toString()}` : window.location.pathname
    router.replace(newURL, { scroll: false })
  }

  // Initialize from URL parameters on component mount
  useEffect(() => {
    const urlQuery = searchParams.get("search") || ""
    const urlCategory = searchParams.get("category") || "all"
    setQuery(urlQuery)
    setCategory(urlCategory)
    onSearch(urlQuery, urlCategory)
  }, [searchParams, onSearch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query, category)
    updateURL(query, category)
  }

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory)
    onSearch(query, newCategory)
    updateURL(query, newCategory)
  }

  const handleClear = () => {
    setQuery("")
    setCategory("all")
    onSearch("", "all")
    updateURL("", "all")
  }

  const hasActiveFilters = query || category !== "all"

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search recipes by title, ingredients, or description..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pr-10"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => setQuery("")}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        <Button type="submit">
          <Search className="w-4 h-4" />
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <label htmlFor="category-select" className="text-sm font-medium text-gray-700">
            Category:
          </label>
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger id="category-select" className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={handleClear} className="flex items-center gap-2 bg-transparent">
            <X className="w-4 h-4" />
            Clear Filters
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {query && (
            <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
              <span>Search: "{query}"</span>
              <button
                onClick={() => {
                  setQuery("")
                  onSearch("", category)
                  updateURL("", category)
                }}
                className="ml-1 hover:bg-blue-200 rounded p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          {category !== "all" && (
            <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-md text-sm">
              <span>Category: {categories.find((c) => c.value === category)?.label}</span>
              <button
                onClick={() => {
                  setCategory("all")
                  onSearch(query, "all")
                  updateURL(query, "all")
                }}
                className="ml-1 hover:bg-green-200 rounded p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
