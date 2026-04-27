import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';
import { v4 as uuidv4 } from 'uuid';
import { BookOpen, Calendar as CalendarIcon, Plus, Trash2, Users } from 'lucide-react';

export const StudyPlan: React.FC = () => {
  const { state, setState } = useStore();
  const plans = state.studyPlans || [];
  const classes = state.classes || [];

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    classId: ''
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.classId || !formData.date) return;

    const newPlan = {
      id: uuidv4(),
      ...formData
    };

    setState(s => ({
      ...s,
      studyPlans: [...(s.studyPlans || []), newPlan]
    }));

    setFormData({ ...formData, title: '', description: '' });
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Excluir este planejamento?')) {
      setState(s => ({
        ...s,
        studyPlans: s.studyPlans?.filter(p => p.id !== id)
      }));
    }
  };

  const getClassBadge = (classId: string) => {
    const c = classes.find(x => x.id === classId);
    if (!c) return null;
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-medium">
        <Users className="w-3 h-3" />
        {c.name}
      </span>
    );
  };

  // Group plans by date
  const sortedPlans = [...plans].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
            <BookOpen className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Planejamento de Estudos</h2>
            <p className="text-gray-500">Organize o conteúdo que será lecionado em sala de aula.</p>
          </div>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            <Plus className="h-5 w-5" /> Novo Planejamento
          </button>
        )}
      </div>

      {classes.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl flex items-center gap-3">
          <BookOpen className="h-5 w-5 text-amber-500" />
          <p>Você precisa cadastrar turmas antes de criar planejamentos.</p>
        </div>
      )}

      {isAdding && classes.length > 0 && (
        <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 space-y-4 relative">
          <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3">Criar Planejamento da Aula</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Turma</label>
              <select
                required
                value={formData.classId}
                onChange={e => setFormData({ ...formData, classId: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="">Selecione a turma...</option>
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.shift})</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Data Prevista</label>
              <input
                required
                type="date"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Tópico / Título</label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Introdução à Trigonometria"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Descrição / Metodologia</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva as atividades, páginas do livro e recursos que serão utilizados..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div className="flex gap-3 justify-end pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
            >
              Salvar Planejamento
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {sortedPlans.length === 0 ? (
          <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-2xl">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Nenhum planejamento registrado</h3>
            <p className="text-gray-500 mt-1">Clique no botão "Novo Planejamento" para começar a organizar suas aulas.</p>
          </div>
        ) : (
          sortedPlans.map(plan => (
            <div key={plan.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 flex flex-col md:flex-row gap-5 hover:border-indigo-200 transition-colors">
              <div className="w-full md:w-32 shrink-0 flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl border border-gray-100 text-center">
                <CalendarIcon className="h-6 w-6 text-indigo-500 mb-1" />
                <span className="text-sm font-bold text-gray-900">{new Date(plan.date + 'T00:00:00').toLocaleDateString('pt-BR')}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{plan.title}</h3>
                    <div className="mt-1 mb-3">
                      {getClassBadge(plan.classId)}
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(plan.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                
                <p className="text-gray-700 bg-gray-50 p-4 rounded-xl text-sm leading-relaxed border border-gray-100 whitespace-pre-line">
                  {plan.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
