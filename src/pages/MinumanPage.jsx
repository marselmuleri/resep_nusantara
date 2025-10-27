// src/pages/MinumanPage.jsx

import { useState, useEffect } from 'react';
import { ResepMinuman } from '../data/minuman';
import RecipeGrid from '../components/minuman/RecipeGrid';

export default function MinumanPage({ favorites, onToggleFavorite, onOpenDetail }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [bahanQuery, setBahanQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 3;

  const allMinuman = Object.values(ResepMinuman.resep);

  useEffect(() => {
    let filtered = allMinuman;
    if (searchQuery.trim() !== '') {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(recipe => recipe.name.toLowerCase().includes(lowercasedQuery));
    }
    if (bahanQuery.trim() !== '') {
      const lowerBahan = bahanQuery.toLowerCase();
      filtered = filtered.filter(recipe => recipe.ingredients.some(bahan => bahan.toLowerCase().includes(lowerBahan)));
    }
    setFilteredRecipes(filtered);
  }, [searchQuery, bahanQuery, allMinuman]);

  // Reset page ke 1 hanya saat filter berubah
  useEffect(() => {
    setPage(1);
  }, [searchQuery, bahanQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredRecipes.length / PAGE_SIZE);
  const paginatedRecipes = filteredRecipes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-cyan-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Cari nama minuman..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full md:w-1/2"
          />
          <input
            type="text"
            placeholder="Filter bahan..."
            value={bahanQuery}
            onChange={e => setBahanQuery(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full md:w-1/2"
          />
        </div>
        <RecipeGrid
          recipes={paginatedRecipes}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          onOpenDetail={onOpenDetail}
        />
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              className="px-3 py-1 rounded bg-green-100 text-green-700 disabled:opacity-50"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Prev
            </button>
            <span className="font-semibold">{page} / {totalPages}</span>
            <button
              className="px-3 py-1 rounded bg-green-100 text-green-700 disabled:opacity-50"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}