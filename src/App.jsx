import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';;
import NotFound from './pages/NotFound.jsx';
import AuthPage from './pages/AuthPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import VerifyPage from './pages/VerifyPage.jsx';


function App() {
  return (
    <div className="min-h-screen bg-background">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-email" element={<VerifyPage />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/projects/" element={<ProjectsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App