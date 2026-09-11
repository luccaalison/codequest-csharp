import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { ProgramPage } from './pages/ProgramPage'
import { SectionPage } from './pages/SectionPage'
import { LessonPage } from './pages/LessonPage'
import { SettingsPage } from './pages/SettingsPage'

export function App() {
  return (
    <Routes>
      {/* The lesson player is deliberately outside the shell: no header, no distractions. */}
      <Route path="/licao/:lessonId" element={<LessonPage />} />

      <Route element={<AppShell />}>
        <Route path="/" element={<ProgramPage />} />
        <Route path="/secao/:sectionId" element={<SectionPage />} />
        <Route path="/ajustes" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
