export interface UserPreferences {
  dailyCalories: number;
  goal: 'lose' | 'maintain' | 'gain';
  restrictions: string[];
}

export interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  isVegetarian: boolean;
  isGlutenFree: boolean;
}

export interface MealPlan {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal;
  totalCalories: number;
}
