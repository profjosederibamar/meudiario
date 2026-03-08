import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';
import { Save, CheckCircle, AlertTriangle } from 'lucide-react';

export const Settings: React.FC = () => {
  const { state, updateSheetUrl } = useStore();
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const fields = [
    { key: 'bimester1', label: '1º Bimestre' },
    { key: 'bimester2', label: '2º Bimestre' },
    { key: 'bimester3', label: '3º Bimestre' },
    { key: 'bimester4', label: '4º Bimestre' },
    { key: 'reportCard', label: 'Boletim' },
    { key: 'calendar', label: 'Calendário' },
    { key: 'seminars', label: 'Seminários' },
    { key: 'attendance', label: 'Frequência' },
  ] as const;

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Configurações de Planilhas</h2>
      </div>

      <div className="bg-white shadow rounded-xl p-6 border border-gray-200">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Importante:</strong> Para que a planilha apareça aqui, você precisa ir no Google Sheets, clicar em "Compartilhar" e mudar o acesso para <strong>"Qualquer pessoa com o link"</strong>.
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Cole abaixo os links das suas planilhas do Google Sheets para cada seção do aplicativo.
        </p>

        <form onSubmit={handleSave} className="space-y-5">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Link da Planilha de {field.label}
              </label>
              <input
                type="url"
                value={state.sheetUrls[field.key]}
                onChange={(e) => updateSheetUrl(field.key, e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/..."
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          ))}

          <div className="pt-6 mt-6 flex items-center gap-4 border-t border-gray-200">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar Configurações
            </button>
            {saved && (
              <span className="inline-flex items-center text-sm text-green-600 font-medium">
                <CheckCircle className="h-5 w-5 mr-1" /> Salvo com sucesso!
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
