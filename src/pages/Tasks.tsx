import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';
import { v4 as uuidv4 } from 'uuid';
import { CheckCircle2, Circle, Trash2, Plus, Calendar as CalendarIcon } from 'lucide-react';

export const Tasks: React.FC = () => {
  const { state, setState } = useStore();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');

  const tasks = state.tasks || [];

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: uuidv4(),
      title: newTaskTitle.trim(),
      completed: false,
      dueDate: newTaskDate || new Date().toISOString().split('T')[0],
    };

    setState(s => ({
      ...s,
      tasks: [...(s.tasks || []), newTask]
    }));

    setNewTaskTitle('');
  };

  const toggleTask = (id: string) => {
    setState(s => ({
      ...s,
      tasks: s.tasks?.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    }));
  };

  const deleteTask = (id: string) => {
    setState(s => ({
      ...s,
      tasks: s.tasks?.filter(t => t.id !== id)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <CheckCircle2 className="text-indigo-600 h-7 w-7" />
          Minhas Tarefas
        </h2>

        <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="O que precisa ser feito?"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
          <input
            type="date"
            value={newTaskDate}
            onChange={(e) => setNewTaskDate(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
          <button
            type="submit"
            disabled={!newTaskTitle.trim()}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="h-5 w-5" /> Adicionar
          </button>
        </form>

        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <CheckCircle2 className="mx-auto h-12 w-12 text-gray-300 mb-3" />
              <p className="text-lg">Nenhuma tarefa cadastrada.</p>
              <p className="text-sm">Suas tarefas aparecerão aqui.</p>
            </div>
          ) : (
            tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()).map(task => (
              <div 
                key={task.id} 
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  task.completed ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-200 hover:border-indigo-200'
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className={`shrink-0 transition-colors ${task.completed ? 'text-emerald-500' : 'text-gray-300 hover:text-indigo-500'}`}
                  >
                    {task.completed ? <CheckCircle2 className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
                  </button>
                  <div className="flex-1">
                    <p className={`text-base font-medium transition-all ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <CalendarIcon className="h-3 w-3" />
                      {new Date(task.dueDate + 'T00:00:00').toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
