import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';
import { v4 as uuidv4 } from 'uuid';
import { Activity, Trash2, Plus, PenTool, BookTemplate, MessageSquare, AlertCircle } from 'lucide-react';

export const ClassActivities: React.FC = () => {
  const { state, setState } = useStore();
  const activities = state.activities || [];
  const classes = state.classes || [];

  const [isAdding, setIsAdding] = useState(false);
  const [filterClassId, setFilterClassId] = useState('all');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    classId: '',
    date: new Date().toISOString().split('T')[0],
    type: 'in_class' as const
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.classId || !formData.date) return;

    const newActivity = {
      id: uuidv4(),
      ...formData
    };

    setState(s => ({
      ...s,
      activities: [...(s.activities || []), newActivity]
    }));

    setFormData({ ...formData, title: '', description: '' });
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Excluir este registro?')) {
      setState(s => ({
        ...s,
        activities: s.activities?.filter(a => a.id !== id)
      }));
    }
  };

  const filteredActivities = activities
    .filter(a => filterClassId === 'all' || a.classId === filterClassId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getClassName = (id: string) => classes.find(c => c.id === id)?.name || 'Turma Excluída';

  const getTypeInfo = (type: string) => {
    switch(type) {
      case 'evaluation': return { icon: AlertCircle, label: 'Avaliação', classes: 'bg-red-100 text-red-700' };
      case 'homework': return { icon: BookTemplate, label: 'Tarefa de Casa', classes: 'bg-amber-100 text-amber-700' };
      case 'in_class': return { icon: PenTool, label: 'Atividade em Sala', classes: 'bg-blue-100 text-blue-700' };
      default: return { icon: MessageSquare, label: 'Outros', classes: 'bg-gray-100 text-gray-700' };
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
            <Activity className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Registro de Atividades</h2>
            <p className="text-gray-500">Histórico de provas, trabalhos e tarefas aplicadas.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={filterClassId}
            onChange={e => setFilterClassId(e.target.value)}
            className="flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-700 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="all">Todas as turmas</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2"
          >
            <Plus className="h-5 w-5" /> Registrar
          </button>
        </div>
      </div>

      {classes.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl flex items-center gap-3">
          <Activity className="h-5 w-5 text-amber-500" />
          <p>Você precisa cadastrar turmas na página de "Turmas" primeiro.</p>
        </div>
      )}

      {isAdding && classes.length > 0 && (
        <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 space-y-4">
          <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3">Novo Registro de Atividade</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Turma</label>
              <select
                required
                value={formData.classId}
                onChange={e => setFormData({ ...formData, classId: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="">Selecione...</option>
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Tipo</label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="in_class">Atividade em Sala</option>
                <option value="homework">Tarefa de Casa</option>
                <option value="evaluation">Avaliação / Prova</option>
                <option value="other">Outros</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Data Aplicada</label>
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
            <label className="text-sm font-medium text-gray-700">Título</label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Prova Bimestral de História"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Observações (opcional)</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div className="flex gap-3 justify-end pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700"
            >
              Registrar Atividade
            </button>
          </div>
        </form>
      )}

      <div className="relative border-l border-gray-200 ml-3 sm:ml-6 pl-6 sm:pl-8 space-y-8 py-4">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">Nenhuma atividade registrada encontrada.</p>
          </div>
        ) : (
          filteredActivities.map(activity => {
            const TypeInfo = getTypeInfo(activity.type);
            const TypeIcon = TypeInfo.icon;
            
            return (
              <div key={activity.id} className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                {/* Timeline Dot */}
                <span className="absolute -left-10 sm:-left-12 flex h-8 w-8 items-center justify-center rounded-full bg-white ring-8 ring-gray-50">
                  <span className={`h-8 w-8 rounded-full flex items-center justify-center border-2 border-white ${TypeInfo.classes}`}>
                    <TypeIcon className="h-4 w-4" />
                  </span>
                </span>
                
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-3 items-center flex-wrap">
                    <span className="text-sm text-gray-500 font-medium">
                      {new Date(activity.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${TypeInfo.classes}`}>
                      {TypeInfo.label}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-700 font-semibold px-2.5 py-1 rounded-md">
                      {getClassName(activity.classId)}
                    </span>
                  </div>
                  
                  <button onClick={() => handleDelete(activity.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{activity.title}</h3>
                {activity.description && (
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{activity.description}</p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
