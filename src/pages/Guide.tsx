import React from 'react';
import { Link } from 'react-router-dom';
import { Table, ExternalLink, HelpCircle } from 'lucide-react';

export const Guide: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <HelpCircle className="mr-3 h-7 w-7 text-indigo-600" />
          Guia de Uso
        </h1>
      </div>

      <div className="bg-white shadow-sm rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Table className="mr-3 h-7 w-7 text-indigo-600" />
          Como conectar suas planilhas?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="relative">
            <div className="bg-indigo-50 w-10 h-10 rounded-full flex items-center justify-center text-indigo-700 font-bold text-lg mb-4">1</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Prepare a Planilha</h3>
            <p className="text-gray-600 text-sm">
              Abra sua planilha no Google Sheets. Clique no botão verde <strong>Compartilhar</strong> no canto superior direito.
            </p>
          </div>
          
          <div className="relative">
            <div className="hidden md:block absolute top-5 -left-4 w-8 h-0.5 bg-gray-200"></div>
            <div className="bg-indigo-50 w-10 h-10 rounded-full flex items-center justify-center text-indigo-700 font-bold text-lg mb-4">2</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ajuste as Permissões</h3>
            <p className="text-gray-600 text-sm">
              Altere o Acesso Geral para <strong>"Qualquer pessoa com o link"</strong>. Escolha "Leitor" para apenas ver, ou "Editor" para poder modificar pelo app.
            </p>
          </div>
          
          <div className="relative">
            <div className="hidden md:block absolute top-5 -left-4 w-8 h-0.5 bg-gray-200"></div>
            <div className="bg-indigo-50 w-10 h-10 rounded-full flex items-center justify-center text-indigo-700 font-bold text-lg mb-4">3</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Copie e Cole</h3>
            <p className="text-gray-600 text-sm">
              Copie o link gerado e cole na página de <Link to="/configuracoes" className="text-indigo-600 hover:underline font-medium">Configurações</Link> deste aplicativo.
            </p>
          </div>
        </div>

        <div className="mt-8 p-5 bg-amber-50 rounded-xl border border-amber-200 flex items-start">
          <div className="flex-shrink-0 mt-0.5">
            <ExternalLink className="h-5 w-5 text-amber-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-bold text-amber-800 mb-1">
              Dica de Ouro: Uma planilha, várias abas
            </h3>
            <p className="text-sm text-amber-700">
              Você não precisa de um arquivo diferente para cada seção. Você pode usar a <strong>mesma planilha</strong> com várias abas. Basta copiar o link enquanto estiver na aba desejada (o link terá um <code>#gid=...</code> no final que identifica a aba específica).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
