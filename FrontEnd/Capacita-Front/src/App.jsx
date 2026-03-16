<<<<<<< Updated upstream
import { useState, useEffect } from 'react';
import './App.css';

// Importação das páginas
import Home from './pages/home.jsx'; 
import MeusCursos from './pages/meusCursos.jsx'; 

// Importações de imagens do login
import logoImg from './assets/logo.png'; 
import appleIcon from './assets/icon-apple.png';
import googleIcon from './assets/icon-google.png';
import facebookIcon from './assets/icon-facebook.png';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [selectedCourses, setSelectedCourses] = useState([]); 
  const [currentPage, setCurrentPage] = useState('home'); 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
=======
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Mentor } from './pages/Mentor';
import { Profile } from './pages/Profile';
import MeusCursos from './pages/meusCursos';

const estaLogado = () => {
  const token = localStorage.getItem('token');
  return token !== null; 
};
>>>>>>> Stashed changes

  // Temporizador do Preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Função de Login
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true); 
  };

  // Função para adicionar/remover curso da lista
  const toggleCourse = (course) => {
    setSelectedCourses(prev => 
      prev.find(c => c.id === course.id) 
        ? prev.filter(c => c.id !== course.id) 
        : [...prev, course]
    );
  };

  // --- ÁREA DE EXIBIÇÃO DA TELA (LÓGICA DE NAVEGAÇÃO) ---

  // 1. Se estiver carregando, mostra o preloader
  if (isLoading) {
    return (
      <div className="preloader-container">
        <img src={logoImg} alt="Carregando..." className="preloader-logo" />
      </div>
    );
  }

  // 2. Se estiver logado, gerencia entre HOME e MEUS CURSOS
  if (isLoggedIn) {
    if (currentPage === 'meusCursos') {
      return (
        <MeusCursos 
          onNavigate={() => setCurrentPage('home')} 
          courses={selectedCourses} 
        />
      );
    }
    
    // Se não estiver em meusCursos, mostra a Home
    return (
      <Home 
        onNavigate={() => setCurrentPage('meusCursos')} 
        onToggleCourse={toggleCourse} 
        selectedCourses={selectedCourses}
      />
    );
  }

  // 3. Se não estiver logado, mostra a tela de LOGIN
  return (
<<<<<<< Updated upstream
    <div className="login-container">
      <div className="login-header">
        <div className="logo">
          <img src={logoImg} alt="Logo Capacita Mais" className="logo-img" />
        </div>
      </div>

      <div className="login-form-section">
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="sarah_alencar@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" /> Manter login
            </label>
            <a href="#" className="forgot-password">Esqueceu a senha?</a>
          </div>

          <button type="submit" className="btn-entrar">Entrar</button>

          <p className="register-link">
            Não possui conta? <a href="#">Clique aqui</a>
          </p>

          <div className="divider"></div>

          <div className="social-login">
            <button type="button" className="social-btn">
              <img src={appleIcon} alt="Login com Apple" />
            </button>
            <button type="button" className="social-btn">
              <img src={googleIcon} alt="Login com Google" />
            </button>
            <button type="button" className="social-btn">
              <img src={facebookIcon} alt="Login com Facebook" />
            </button>
          </div>
        </form>
      </div>
    </div>
=======
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <RotaProtegida>
            <Home />
          </RotaProtegida>}
        />

        <Route path="/mentor" element={<Mentor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        
        <Route path="/cursos" element={
          <RotaProtegida>
            <MeusCursos />
          </RotaProtegida>
        } />

        <Route path="/perfil" element={
          <RotaProtegida>
            <Profile />
          </RotaProtegida>}
        />
      </Routes>
    </BrowserRouter>
>>>>>>> Stashed changes
  );
}

export default App;