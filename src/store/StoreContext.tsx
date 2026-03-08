import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppState, ClassLink } from './types';

const initialState: AppState = {
  sheetUrls: {
    bimester1: 'https://docs.google.com/spreadsheets/d/1rz4Vu2_bgqCJH7X5hPDSQFmRvVgRRJBdZphXK5IzTxE/edit?usp=sharing',
    bimester2: 'https://docs.google.com/spreadsheets/d/1rz4Vu2_bgqCJH7X5hPDSQFmRvVgRRJBdZphXK5IzTxE/edit?usp=sharing',
    bimester3: 'https://docs.google.com/spreadsheets/d/1rz4Vu2_bgqCJH7X5hPDSQFmRvVgRRJBdZphXK5IzTxE/edit?usp=sharing',
    bimester4: 'https://docs.google.com/spreadsheets/d/1rz4Vu2_bgqCJH7X5hPDSQFmRvVgRRJBdZphXK5IzTxE/edit?usp=sharing',
    reportCard: '',
    calendar: 'https://docs.google.com/spreadsheets/d/1Z8HAE5swjt4djCcvDpWueUCiFQ_Aq6V2-uBcCYatDz4/edit?usp=sharing',
    seminars: 'https://docs.google.com/spreadsheets/d/1FYWmBUYSwTUm_1rGdIO4MqbSurKB0pq3sRlaKblRBJo/edit?usp=sharing',
    attendance: 'https://docs.google.com/spreadsheets/d/1C8ARwdAes5QGDTCknim4D3FPbS-HDMDqd6uVvzn2sD8/edit?usp=sharing',
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

  // Load from localStorage on mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        const saved = localStorage.getItem('diario_professor_sheets');
        if (saved) {
          const parsed = JSON.parse(saved);
          setState(s => ({
            ...s,
            sheetUrls: { ...s.sheetUrls, ...(parsed.sheetUrls || {}) }
          }));
        }
      } catch (e) {
        console.error('Failed to load settings from localStorage', e);
      } finally {
        setIsLoaded(true);
      }
    };
    loadSettings();
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!isLoaded) return;

    const saveSettings = () => {
      try {
        localStorage.setItem('diario_professor_sheets', JSON.stringify(state));
      } catch (e) {
        console.error('Failed to save settings to localStorage', e);
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
