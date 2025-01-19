import { MealPlan } from '../types';
import { Utensils } from 'lucide-react';

interface MealPlanDisplayProps {
  mealPlan: MealPlan;
}

export default function MealPlanDisplay({ mealPlan }: MealPlanDisplayProps) {
  const renderMeal = (meal: typeof mealPlan.breakfast, title: string) => (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <div className="space-y-2">
        <p className="text-gray-700">{meal.name}</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-gray-600">Calories: {meal.calories}</div>
          <div className="text-gray-600">Protein: {meal.protein}g</div>
          <div className="text-gray-600">Carbs: {meal.carbs}g</div>
          <div className="text-gray-600">Fat: {meal.fat}g</div>
        </div>
        <div className="flex gap-2 text-sm">
          {meal.isVegetarian && (
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Vegetarian</span>
          )}
          {meal.isGlutenFree && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">Gluten-free</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
          <Utensils />
          <h2>Your Daily Meal Plan</h2>
        </div>
        <p className="text-gray-600">Total Calories: {mealPlan.totalCalories}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderMeal(mealPlan.breakfast, 'Breakfast')}
        {renderMeal(mealPlan.lunch, 'Lunch')}
        {renderMeal(mealPlan.dinner, 'Dinner')}
        {renderMeal(mealPlan.snacks, 'Snacks')}
      </div>
    </div>
  );
}
