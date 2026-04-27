/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './store/StoreContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Assessments } from './pages/Assessments';
import { ReportCard } from './pages/ReportCard';
import { Calendar } from './pages/Calendar';
import { Settings } from './pages/Settings';
import { Guide } from './pages/Guide';
import { Seminars } from './pages/Seminars';
import { Attendance } from './pages/Attendance';
import { Tasks } from './pages/Tasks';
import { StudyPlan } from './pages/StudyPlan';
import { ClassActivities } from './pages/ClassActivities';
import { Classes } from './pages/Classes';

export default function App() {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="bimestre/:id" element={<Assessments />} />
            <Route path="boletim" element={<ReportCard />} />
            <Route path="calendario" element={<Calendar />} />
            <Route path="seminarios" element={<Seminars />} />
            <Route path="frequencia" element={<Attendance />} />
            <Route path="tarefas" element={<Tasks />} />
            <Route path="planejamento" element={<StudyPlan />} />
            <Route path="atividades" element={<ClassActivities />} />
            <Route path="turmas" element={<Classes />} />
            <Route path="guia" element={<Guide />} />
            <Route path="configuracoes" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </StoreProvider>
  );
}
