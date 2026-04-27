import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';
import { v4 as uuidv4 } from 'uuid';
import { Users, Trash2, Plus, Edit2, Check } from 'lucide-react';

export const Classes: React.FC = () => {
  const { state, setState } = useStore();
  const classes = state.classes || [];

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({ name: '', shift: 'Matutino', year: '' });

  const handleSave = () => {
    if (!formData.name.trim()) return;

    if (editingId) {
      setState(s => ({
        ...s,
        classes: s.classes?.map(c => c.id === editingId ? { ...formData, id: editingId } : c)
      }));
      setEditingId(null);
    } else {
      const newClass = {
        id: uuidv4(),
        ...formData
      };
      setState(s => ({
        ...s,
        classes: [...(s.classes || []), newClass]
      }));
      setIsAdding(false);
    }
    setFormData({ name: '', shift: 'Matutino', year: '' });
  };

  const handleEdit = (c: any) => {
    setFormData({ name: c.name, shift: c.shift, year: c.year });
    setEditingId(c.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta turma? Planos e atividades associadas podem perder a referência.')) {
      setState(s => ({
        ...s,
        classes: s.classes?.filter(c => c.id !== id)
      }));
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="text-indigo-600 h-8 w-8" />
            Minhas Turmas
          </h2>
          <p className="text-gray-500 mt-2">Cadastre e gerencie as turmas que você leciona.</p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-sm transition-colors"
          >
            <Plus className="h-5 w-5" /> Nova Turma
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-indigo-100 flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 space-y-1 w-full">
            <label className="text-sm font-medium text-gray-700">Nome da Turma</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: 1º Ano A"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div className="w-full sm:w-48 space-y-1">
            <label className="text-sm font-medium text-gray-700">Ano Letivo</label>
            <input
              type="text"
              value={formData.year}
              onChange={e => setFormData({ ...formData, year: e.target.value })}
              placeholder="Ex: 2026"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div className="w-full sm:w-48 space-y-1">
            <label className="text-sm font-medium text-gray-700">Turno</label>
            <select
              value={formData.shift}
              onChange={e => setFormData({ ...formData, shift: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            >
              <option>Matutino</option>
              <option>Vespertino</option>
              <option>Noturno</option>
              <option>Integral</option>
            </select>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => { setIsAdding(false); setEditingId(null); setFormData({ name: '', shift: 'Matutino', year: '' }); }}
              className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 flex-1 sm:flex-none"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={!formData.name}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2 flex-1 sm:flex-none"
            >
              <Check className="h-5 w-5" /> Salvar
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map(c => (
          <div key={c.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow relative group">
            <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => handleEdit(c)}
                className="p-1.5 text-gray-500 hover:text-indigo-600 bg-gray-50 hover:bg-indigo-50 rounded-lg"
                title="Editar"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button 
                onClick={() => handleDelete(c.id)}
                className="p-1.5 text-gray-500 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-lg"
                title="Excluir"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            
            <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-4">
              <Users className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{c.name}</h3>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="bg-gray-100 px-2.5 py-1 rounded-md">{c.shift}</span>
              {c.year && <span className="bg-gray-100 px-2.5 py-1 rounded-md">Ano: {c.year}</span>}
            </div>
          </div>
        ))}

        {classes.length === 0 && !isAdding && (
          <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
            <Users className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhuma turma cadastrada</h3>
            <p className="text-gray-500 mb-6">Cadastre suas turmas para poder criar planejamentos e atividades para elas.</p>
            <button
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-semibold hover:bg-indigo-100 transition-colors"
            >
              <Plus className="h-5 w-5" /> Adicionar Primeira Turma
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
