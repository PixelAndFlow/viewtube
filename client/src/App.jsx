import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StarredProvider } from './context/StarredContext';
import { ThemeProvider } from './context/ThemeContext';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import WatchPage from './pages/WatchPage';
import SearchResults from './pages/SearchResults';
import StarredPage from './pages/StarredPage';
import WatchHistoryPage from './pages/WatchHistoryPage';
import TrendingPage from './pages/TrendingPage';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <StarredProvider>
          <NavBar />
          <div className="app-body">
            <Sidebar />
            <div className="app-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/watch/:id" element={<WatchPage />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/starred" element={<StarredPage />} />
                <Route path="/history" element={<WatchHistoryPage />} />
                <Route path="/trending" element={<TrendingPage />} />
              </Routes>
            </div>
          </div>
        </StarredProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
