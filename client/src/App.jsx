import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StarredProvider } from './context/StarredContext';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import WatchPage from './pages/WatchPage';
import SearchResults from './pages/SearchResults';
import StarredPage from './pages/StarredPage';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <StarredProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/watch/:id" element={<WatchPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/starred" element={<StarredPage />} />
        </Routes>
      </StarredProvider>
    </BrowserRouter>
  );
}
