import React from 'react';
import { useStore } from '../store/StoreContext';
import { SheetEmbed } from '../components/SheetEmbed';

export const ReportCard: React.FC = () => {
  const { state } = useStore();
  return <SheetEmbed url={state.sheetUrls.reportCard} title="Boletim" />;
};
