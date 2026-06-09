import { createContext, useContext, useState } from 'react';

const StarredContext = createContext(null);
const STORAGE_KEY = 'viewtube_starred';

export function StarredProvider({ children }) {
  const [starred, setStarred] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  });

  const toggleStar = (videoId) => {
    setStarred((prev) => {
      const id = Number(videoId);
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const isStarred = (videoId) => starred.includes(Number(videoId));

  return (
    <StarredContext.Provider value={{ starred, toggleStar, isStarred }}>
      {children}
    </StarredContext.Provider>
  );
}

export const useStarred = () => useContext(StarredContext);
