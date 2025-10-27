// src/main.jsx
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import MakananPage from './pages/MakananPage';
import MinumanPage from './pages/MinumanPage';
import ProfilePage from './pages/ProfilePage';
import DesktopNavbar from './components/navbar/DesktopNavbar';
import MobileNavbar from './components/navbar/MobileNavbar';
import './index.css'
import PWABadge from './PWABadge';
import RecipeDetailModal from './components/RecipeDetailModal';
import FavoritesPage from './pages/FavoritesPage'; // Tambahkan import
import { ResepMakanan } from './data/makanan';
import { ResepMinuman } from './data/minuman';

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch {
      return [];
    }
  });
  const [detailRecipe, setDetailRecipe] = useState(null);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleToggleFavorite = (id) => {
    setFavorites(prev => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter(favId => favId !== id);
      } else {
        updated = [...prev, id];
      }
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const handleOpenDetail = (recipe) => {
    setDetailRecipe(recipe);
  };

  const handleCloseDetail = () => {
    setDetailRecipe(null);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage favorites={favorites} onToggleFavorite={handleToggleFavorite} onOpenDetail={handleOpenDetail} />;
      case 'makanan':
        return <MakananPage favorites={favorites} onToggleFavorite={handleToggleFavorite} onOpenDetail={handleOpenDetail} />;
      case 'minuman':
        return <MinumanPage favorites={favorites} onToggleFavorite={handleToggleFavorite} onOpenDetail={handleOpenDetail} />;
      case 'favorites': // Tambahkan case untuk halaman favorit
        return (
          <FavoritesPage
            favorites={favorites}
            recipes={[...Object.values(ResepMakanan.resep), ...Object.values(ResepMinuman.resep)]} // Gabungkan data makanan dan minuman
            onToggleFavorite={handleToggleFavorite}
            onOpenDetail={handleOpenDetail}
          />
        );
      case 'profile':
        return <ProfilePage favorites={favorites} onToggleFavorite={handleToggleFavorite} onOpenDetail={handleOpenDetail} />;
      default:
        return <HomePage favorites={favorites} onToggleFavorite={handleToggleFavorite} onOpenDetail={handleOpenDetail} />;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Navbar */}
      <DesktopNavbar currentPage={currentPage} onNavigate={handleNavigation} />
      {/* Main Content */}
      <main className="min-h-screen">
        {renderCurrentPage()}
      </main>
      {/* Mobile Navbar */}
      <MobileNavbar currentPage={currentPage} onNavigate={handleNavigation} />
      <PWABadge />
      {/* Detail Modal */}
      {detailRecipe && (
        <RecipeDetailModal recipe={detailRecipe} onClose={handleCloseDetail} />
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
)