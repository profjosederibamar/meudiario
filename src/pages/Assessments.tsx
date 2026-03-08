import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { SheetEmbed } from '../components/SheetEmbed';
import { AppState } from '../store/types';

export const Assessments: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useStore();
  
  const bimesterKey = `bimester${id}` as keyof AppState['sheetUrls'];
  const url = state.sheetUrls[bimesterKey] || '';
  
  return <SheetEmbed url={url} title={`${id}º Bimestre`} />;
};
