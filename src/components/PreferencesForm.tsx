import { useState } from 'react';
import { UserPreferences } from '../types';
import { Save } from 'lucide-react';

interface PreferencesFormProps {
  onSubmit: (preferences: UserPreferences) => void;
  initialPreferences?: UserPreferences;
}

export default function PreferencesForm({ onSubmit, initialPreferences }: PreferencesFormProps) {
  const [preferences, setPreferences] = useState<UserPreferences>(initialPreferences || {
    dailyCalories: 2000,
    goal: 'maintain',
    restrictions: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  const toggleRestriction = (restriction: string) => {
    setPreferences(prev => ({
      ...prev,
      restrictions: prev.restrictions.includes(restriction)
        ? prev.restrictions.filter(r => r !== restriction)
        : [...prev.restrictions, restriction],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Daily Calories
        </label>
        <input
          type="number"
          value={preferences.dailyCalories}
          onChange={(e) => setPreferences(prev => ({ ...prev, dailyCalories: parseInt(e.target.value) }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="1000"
          max="5000"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Goal
        </label>
        <select
          value={preferences.goal}
          onChange={(e) => setPreferences(prev => ({ ...prev, goal: e.target.value as UserPreferences['goal'] }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="lose">Lose Weight</option>
          <option value="maintain">Maintain Weight</option>
          <option value="gain">Gain Weight</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Dietary Restrictions
        </label>
        <div className="space-y-2">
          {['vegetarian', 'gluten-free'].map(restriction => (
            <label key={restriction} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.restrictions.includes(restriction)}
                onChange={() => toggleRestriction(restriction)}
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 capitalize">{restriction}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        <Save size={20} />
        Save Preferences
      </button>
    </form>
  );
}
