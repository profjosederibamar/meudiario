import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings, 
  Table, 
  ExternalLink, 
  ClipboardCheck, 
  Calendar as CalendarIcon, 
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  HelpCircle
} from 'lucide-react';
import { useStore } from '../store/StoreContext';

export const Dashboard: React.FC = () => {
  const { state } = useStore();

  const sections = [
    { id: 'bimester1', name: '1º Bimestre', icon: ClipboardCheck, path: '/bimestre/1', configured: !!state.sheetUrls.bimester1 },
    { id: 'bimester2', name: '2º Bimestre', icon: ClipboardCheck, path: '/bimestre/2', configured: !!state.sheetUrls.bimester2 },
    { id: 'bimester3', name: '3º Bimestre', icon: ClipboardCheck, path: '/bimestre/3', configured: !!state.sheetUrls.bimester3 },
    { id: 'bimester4', name: '4º Bimestre', icon: ClipboardCheck, path: '/bimestre/4', configured: !!state.sheetUrls.bimester4 },
    { id: 'reportCard', name: 'Boletim', icon: FileText, path: '/boletim', configured: !!state.sheetUrls.reportCard },
    { id: 'calendar', name: 'Calendário', icon: CalendarIcon, path: '/calendario', configured: !!state.sheetUrls.calendar },
  ];

  const configuredCount = sections.filter(s => s.configured).length;
  const totalCount = sections.length;
  const progressPercentage = Math.round((configuredCount / totalCount) * 100);

  const getCurrentBimester = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 1 && month <= 3) return '1º Bimestre';
    if (month >= 4 && month <= 6) return '2º Bimestre';
    if (month >= 7 && month <= 9) return '3º Bimestre';
    return '4º Bimestre';
  };

  const currentBimester = getCurrentBimester();

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">Bem-vindo ao Diário do Professor</h1>
          <p className="text-indigo-100 text-lg sm:text-xl mb-8 max-w-2xl leading-relaxed">
            Seu hub centralizado para gestão escolar. Integre suas planilhas do Google Sheets e tenha tudo organizado em um único aplicativo.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/configuracoes" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-xl text-indigo-700 bg-white hover:bg-indigo-50 shadow-md transition-all duration-200 hover:scale-105">
              <Settings className="mr-2 h-5 w-5" />
              Configurar Planilhas
            </Link>
            
            <Link to="/guia" className="inline-flex items-center px-6 py-3 border border-white/30 text-base font-semibold rounded-xl text-white bg-white/10 hover:bg-white/20 shadow-md transition-all duration-200 hover:scale-105">
              <HelpCircle className="mr-2 h-5 w-5" />
              Como Funciona
            </Link>
            
            {progressPercentage < 100 && (
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/30">
                <div className="mr-3">
                  <div className="text-sm font-medium text-indigo-50">Progresso da Configuração</div>
                  <div className="text-xs text-indigo-200">{configuredCount} de {totalCount} seções prontas</div>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-indigo-200/30 flex items-center justify-center relative">
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-white"
                      strokeDasharray={`${progressPercentage}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                  </svg>
                  <span className="text-sm font-bold">{progressPercentage}%</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-32 -mb-16 w-48 h-48 bg-blue-400 opacity-20 rounded-full blur-2xl"></div>
      </div>

      {/* Bimester Info Card */}
      <div className="bg-white rounded-2xl p-6 border border-indigo-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Período Atual: {currentBimester}</h2>
            <p className="text-sm text-gray-600 mt-1">
              Lembrete: As avaliações devem ser registradas dentro do bimestre correto.
            </p>
          </div>
        </div>
        <Link 
          to="/avaliacoes" 
          className="shrink-0 inline-flex items-center justify-center px-4 py-2 border border-indigo-200 text-sm font-medium rounded-lg text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors"
        >
          Ir para Avaliações
        </Link>
      </div>

      {/* Quick Access Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 px-1">Acesso Rápido</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link 
                key={section.id} 
                to={section.path}
                className={`group relative flex flex-col p-6 rounded-2xl border transition-all duration-200 hover:shadow-lg ${
                  section.configured 
                    ? 'bg-white border-gray-200 hover:border-indigo-300' 
                    : 'bg-gray-50 border-dashed border-gray-300 hover:border-gray-400 opacity-80'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${section.configured ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-500'}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  {section.configured ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <h3 className={`text-lg font-semibold ${section.configured ? 'text-gray-900' : 'text-gray-600'}`}>
                  {section.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {section.configured ? 'Planilha conectada' : 'Não configurado'}
                </p>
                
                {!section.configured && (
                  <div className="absolute inset-0 bg-gray-900/5 backdrop-blur-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      Configurar agora
                    </span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

