import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppState, ClassLink } from './types';

const initialState: AppState = {
  sheetUrls: {
    bimester1: '',
    bimester2: '',
    bimester3: '',
    bimester4: '',
    reportCard: '',
    calendar: '',
  }
};

type StoreContextType = {
  state: AppState;
  updateSheetUrl: (key: keyof AppState['sheetUrls'], url: string) => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from server on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        if (response.ok) {
          const serverData = await response.json();
          if (Object.keys(serverData).length > 0) {
            setState(s => ({
              ...s,
              sheetUrls: { ...s.sheetUrls, ...(serverData.sheetUrls || {}) }
            }));
          } else {
            // If server is empty, try localStorage
            const saved = localStorage.getItem('diario_professor_sheets');
            if (saved) {
              const parsed = JSON.parse(saved);
              setState(s => ({
                ...s,
                sheetUrls: { ...s.sheetUrls, ...(parsed.sheetUrls || {}) }
              }));
            }
          }
        }
      } catch (e) {
        console.error('Failed to load settings from server', e);
      } finally {
        setIsLoaded(true);
      }
    };
    loadSettings();
  }, []);

  // Save to server and localStorage whenever state changes
  useEffect(() => {
    if (!isLoaded) return;

    const saveSettings = async () => {
      try {
        localStorage.setItem('diario_professor_sheets', JSON.stringify(state));
        await fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(state)
        });
      } catch (e) {
        console.error('Failed to save settings to server', e);
      }
    };

    const timeoutId = setTimeout(saveSettings, 500); // Debounce saves
    return () => clearTimeout(timeoutId);
  }, [state, isLoaded]);

  const updateSheetUrl = (key: keyof AppState['sheetUrls'], url: string) => {
    setState(s => ({
      ...s,
      sheetUrls: {
        ...s.sheetUrls,
        [key]: url
      }
    }));
  };

  return (
    <StoreContext.Provider value={{ state, updateSheetUrl }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
