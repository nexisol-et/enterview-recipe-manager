# Recipe Manager - Full Stack Next.js App

A simple recipe management application built with Next.js, demonstrating proper layered architecture and API design patterns for junior developers.

## 🏗️ Architecture Overview

This application follows a clean layered architecture:

- **UI Layer**: React components that interact with APIs
- **API Layer**: Next.js API routes that handle HTTP requests
- **Repository Layer**: Data access layer with mock storage
- **Types**: TypeScript interfaces for type safety

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm or yarn

### Installation

1. Clone or download the project
2. Install dependencies:
   \`\`\`bash
   pnpm install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   pnpm dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

\`\`\`
├── app/
│   ├── api/recipes/          # API routes
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── add-recipe-form.tsx
│   ├── recipe-card.tsx
│   ├── recipe-list.tsx
│   └── search-bar.tsx
├── lib/
│   └── repository/          # Data access layer
│       └── recipe-repository.ts
├── types/
│   └── recipe.ts           # TypeScript interfaces
└── README.md
\`\`\`

## 🔧 Key Features

- ✅ Add new recipes with ingredients and instructions
- ✅ View all recipes with expandable details
- ✅ Search recipes by title, ingredients, or category
- ✅ Delete recipes with confirmation
- ✅ Responsive design with Tailwind CSS
- ✅ TypeScript for type safety
- ✅ Proper error handling
- ✅ Loading states

## 🎯 Learning Objectives

This project demonstrates:

1. **Separation of Concerns**: Clear separation between UI, API, and data layers
2. **API Design**: RESTful API endpoints with proper HTTP methods
3. **State Management**: React hooks for component state
4. **Form Handling**: Controlled components and form validation
5. **Error Handling**: Proper error handling in both client and server
6. **TypeScript**: Type safety throughout the application
7. **Responsive Design**: Mobile-first responsive layout

## 📋 API Endpoints

- \`GET /api/recipes\` - Get all recipes
- \`GET /api/recipes?search=query\` - Search recipes
- \`POST /api/recipes\` - Create a new recipe
- \`GET /api/recipes/[id]\` - Get a specific recipe
- \`PUT /api/recipes/[id]\` - Update a recipe
- \`DELETE /api/recipes/[id]\` - Delete a recipe

## 🔄 Data Flow

1. **UI Components** make HTTP requests to API routes
2. **API Routes** validate requests and call repository methods
3. **Repository Layer** handles data operations (currently mock data)
4. **Response** flows back through the layers to update the UI

## 📝 TODO Items for Enhancement

### 1. Add Recipe Categories Filter
- Add a dropdown/filter component to filter recipes by category
- Update the search functionality to work with category filters
- Store selected filters in URL parameters for bookmarkable searches

### 2. Implement Recipe Rating System
- Add a rating field to the Recipe interface (1-5 stars)
- Create a star rating component for display and input
- Update the repository to handle rating data
- Add sorting by rating functionality

### 3. Add Recipe Image Upload
- Extend the Recipe interface to include an image URL field
- Create an image upload component in the add recipe form
- Implement image storage (could use Vercel Blob or similar)
- Display recipe images in the recipe cards

### 4. Implement Recipe Editing
- Add an "Edit" button to recipe cards
- Create an edit recipe form (similar to add form but pre-populated)
- Implement PUT API endpoint usage in the frontend
- Add proper form validation for edit operations

### 5. Add Recipe Import/Export
- Create functionality to export recipes as JSON
- Add ability to import recipes from JSON files
- Implement bulk operations for multiple recipes
- Add data validation for imported recipes

## 🧪 Testing the Application

### Manual Testing Checklist:

1. **Add Recipe**: Fill out the form and verify the recipe appears in the list
2. **Search**: Test searching by recipe title, ingredients, and category
3. **View Details**: Click the eye icon to expand/collapse recipe details
4. **Delete Recipe**: Test the delete functionality with confirmation
5. **Form Validation**: Try submitting incomplete forms to test validation
6. **Responsive Design**: Test on different screen sizes

### API Testing:
You can test the API endpoints directly using tools like Postman or curl:

\`\`\`bash
# Get all recipes
curl http://localhost:3000/api/recipes

# Search recipes
curl "http://localhost:3000/api/recipes?search=pasta"

# Create a recipe
curl -X POST http://localhost:3000/api/recipes \\
  -H "Content-Type: application/json" \\
  -d '{"title":"Test Recipe","description":"Test","ingredients":["test"],"instructions":["test"],"cookingTime":10,"servings":1,"difficulty":"Easy","category":"Test"}'
\`\`\`

## 🎓 Interview Discussion Points

When presenting this project, be prepared to discuss:

1. **Architecture Decisions**: Why separate the repository layer?
2. **API Design**: RESTful principles and HTTP status codes
3. **State Management**: When to use local state vs. global state
4. **Error Handling**: How errors are handled at each layer
5. **Performance**: How to optimize the application (caching, pagination, etc.)
6. **Security**: What security considerations should be added
7. **Testing**: How you would add unit and integration tests
8. **Deployment**: How to deploy this application to production

## 🔧 Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built UI components
- **Lucide React**: Icon library

This project serves as a solid foundation for understanding full-stack development patterns and can be extended with additional features as needed.
