import React from 'react';
import { AlertCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SheetEmbed: React.FC<{ url: string, title: string, className?: string }> = ({ url, title, className = "h-[calc(100vh-8rem)]" }) => {
  if (!url) {
    return (
      <div className={`flex flex-col items-center justify-center bg-white rounded-xl shadow border border-dashed border-gray-300 p-6 text-center ${className}`}>
        <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Planilha não configurada</h3>
        <p className="text-gray-500 mb-4 max-w-md">
          Você ainda não configurou o link da planilha do Google para a página de <strong>{title}</strong>.
        </p>
        <Link to="/configuracoes" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
          Ir para Configurações
        </Link>
      </div>
    );
  }

  // Optimize URL for embedding if it's a standard Google Sheets URL
  let embedUrl = url;
  if (url.includes('docs.google.com/spreadsheets') && !url.includes('rm=minimal') && !url.includes('pubhtml')) {
    const separator = url.includes('?') ? '&' : '?';
    embedUrl = `${url}${separator}rm=minimal`;
  }

  return (
    <div className={`flex flex-col bg-white rounded-xl shadow overflow-hidden border border-gray-200 ${className}`}>
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-900 font-medium">
          <ExternalLink className="h-4 w-4 mr-1" />
          Abrir no Google Sheets
        </a>
      </div>
      <iframe
        src={embedUrl}
        className="w-full h-full border-0"
        title={`Planilha de ${title}`}
        allowFullScreen
      ></iframe>
    </div>
  );
};
