import { UserPreferences, MealPlan, Meal } from '../types';

// Sample meal database - in a real app, this would be much larger and more diverse
const mealDatabase: Meal[] = [
  {
    name: "Oatmeal with Berries",
    calories: 300,
    protein: 10,
    carbs: 50,
    fat: 6,
    isVegetarian: true,
    isGlutenFree: true
  },
  {
    name: "Greek Yogurt Parfait",
    calories: 250,
    protein: 15,
    carbs: 30,
    fat: 8,
    isVegetarian: true,
    isGlutenFree: true
  },
  {
    name: "Grilled Chicken Salad",
    calories: 400,
    protein: 35,
    carbs: 20,
    fat: 22,
    isVegetarian: false,
    isGlutenFree: true
  },
  {
    name: "Quinoa Buddha Bowl",
    calories: 450,
    protein: 15,
    carbs: 65,
    fat: 18,
    isVegetarian: true,
    isGlutenFree: true
  },
  {
    name: "Salmon with Vegetables",
    calories: 500,
    protein: 40,
    carbs: 25,
    fat: 28,
    isVegetarian: false,
    isGlutenFree: true
  },
  {
    name: "Mixed Nuts and Dried Fruit",
    calories: 200,
    protein: 6,
    carbs: 20,
    fat: 14,
    isVegetarian: true,
    isGlutenFree: true
  }
];

export function generateMealPlan(preferences: UserPreferences): MealPlan {
  // Filter meals based on dietary restrictions
  const availableMeals = mealDatabase.filter(meal => {
    if (preferences.restrictions.includes('vegetarian') && !meal.isVegetarian) return false;
    if (preferences.restrictions.includes('gluten-free') && !meal.isGlutenFree) return false;
    return true;
  });

  // Simple meal selection - in a real app, this would be more sophisticated
  const breakfast = availableMeals.find(meal => meal.calories <= preferences.dailyCalories * 0.25) || availableMeals[0];
  const lunch = availableMeals.find(meal => meal.calories <= preferences.dailyCalories * 0.35) || availableMeals[1];
  const dinner = availableMeals.find(meal => meal.calories <= preferences.dailyCalories * 0.35) || availableMeals[2];
  const snacks = availableMeals.find(meal => meal.calories <= preferences.dailyCalories * 0.15) || availableMeals[5];

  const totalCalories = breakfast.calories + lunch.calories + dinner.calories + snacks.calories;

  return {
    breakfast,
    lunch,
    dinner,
    snacks,
    totalCalories
  };
}
