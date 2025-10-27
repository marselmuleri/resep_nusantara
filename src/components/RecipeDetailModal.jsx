import React from 'react';

export default function RecipeDetailModal({ recipe, onClose }) {
  if (!recipe) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <img src={recipe.image_url} alt={recipe.name} className="w-full h-48 object-cover rounded-xl mb-4" />
        <h2 className="text-2xl font-bold mb-2">{recipe.name}</h2>
        <h3 className="font-semibold mb-1">Bahan:</h3>
        <ul className="mb-3 list-disc ml-5">
          {recipe.ingredients.map((bahan, i) => (
            <li key={i}>{bahan}</li>
          ))}
        </ul>
        <h3 className="font-semibold mb-1">Langkah-langkah:</h3>
        <ol className="mb-3 list-decimal ml-5">
          {recipe.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
