import { useState, useEffect } from 'react';
import './index.css';
import PreferencesForm from './components/PreferencesForm';
import MealPlanDisplay from './components/MealPlanDisplay';
import { UserPreferences, MealPlan } from './types';
import { generateMealPlan } from './utils/mealPlanner';
import { Salad } from 'lucide-react';

function App() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(() => {
    const saved = localStorage.getItem('preferences');
    return saved ? JSON.parse(saved) : null;
  });

  const [mealPlan, setMealPlan] = useState<MealPlan | null>(() => {
    const saved = localStorage.getItem('mealPlan');
    return saved ? JSON.parse(saved) : null;
  });

  const handlePreferencesSubmit = (newPreferences: UserPreferences) => {
    setPreferences(newPreferences);
    const newMealPlan = generateMealPlan(newPreferences);
    setMealPlan(newMealPlan);
  };

  useEffect(() => {
    if (preferences) {
      localStorage.setItem('preferences', JSON.stringify(preferences));
    }
    if (mealPlan) {
      localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
    }
  }, [preferences, mealPlan]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Salad size={40} className="text-green-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Nutrition Plan Generator
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Create your personalized meal plan based on your needs and preferences
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <PreferencesForm
            onSubmit={handlePreferencesSubmit}
            initialPreferences={preferences || undefined}
          />
          
          {mealPlan && (
            <MealPlanDisplay mealPlan={mealPlan} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
