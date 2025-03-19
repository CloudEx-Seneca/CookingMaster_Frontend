export interface Ingredient {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Recipe {
  id: number;
  name: string;
  ingredients: Ingredient[];  // Now using the Ingredient type for ingredients
  description: string;
  image: string;
  author: string;
  user_id: number;
}
