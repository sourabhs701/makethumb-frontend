import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ProtectedRoute from '@/components/routing/ProtectedRoute';
import { ErrorBoundary } from '@/components/routing/ErrorBoundary';

const New = lazy(() => import('./pages/New.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const AuthPage = lazy(() => import('./pages/AuthPage.jsx'));
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'));
const SignupPage = lazy(() => import('./pages/SignupPage.jsx'));
const ProjectPage = lazy(() => import('./pages/ProjectPage.jsx'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'));
const VerifyPage = lazy(() => import('./pages/VerifyPage.jsx'));
const ResumePage = lazy(() => import('./pages/ResumePage.jsx'));
const SettingsPage = lazy(() => import('./pages/SettingsPage.jsx'));
const NewImport = lazy(() => import('./pages/NewImport.jsx'));
const LandingPage = lazy(() => import('./pages/LandingPage.jsx'));

function App() {
  return (
    <div className="min-h-screen bg-background">
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<div className="p-6">Loading...</div>}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/new" element={<New />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/new" element={<New />} />
              <Route path="/new/import" element={<NewImport />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/projects/" element={<ProjectsPage />} />
                <Route path="/projects/:slug" element={<ProjectPage />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>

              <Route path="/verify-email" element={<VerifyPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  )
}

export default App