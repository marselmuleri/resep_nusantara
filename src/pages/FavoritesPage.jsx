import RecipeGrid from '../components/makanan/RecipeGrid';

export default function FavoritesPage({ favorites, recipes, onToggleFavorite, onOpenDetail }) {
  // Filter resep berdasarkan ID favorit
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 text-center mb-4">
          Resep Favorit
        </h1>
        <p className="text-center text-slate-500 max-w-2xl mx-auto mb-8">
          Berikut adalah daftar resep yang telah kamu favoritkan.
        </p>
        <RecipeGrid
          recipes={favoriteRecipes}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          onOpenDetail={onOpenDetail}
        />
        {favoriteRecipes.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500">Belum ada resep yang difavoritkan.</p>
          </div>
        )}
      </main>
    </div>
  );
}

// Contoh penggunaan:
// <FavoritesPage
//   favorites={favorites}
//   recipes={[...Object.values(ResepMakanan.resep), ...Object.values(ResepMinuman.resep)]} // Gabungkan data makanan dan minuman
//   onToggleFavorite={handleToggleFavorite}
//   onOpenDetail={handleOpenDetail}
// />