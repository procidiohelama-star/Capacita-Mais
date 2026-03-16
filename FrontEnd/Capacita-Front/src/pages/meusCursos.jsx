import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './meusCursos.css';
import semCursoImg from '../assets/semcurso.jpeg'; 

function MeusCursos() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [allAvailable, setAllAvailable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const tokenParts = token.split('.');
        const payload = JSON.parse(window.atob(tokenParts[1].replace(/-/g, '+').replace(/_/g, '/')));
        const userId = payload.sub;

        // Busca matrículas do usuário
        const resUser = await fetch(`http://localhost:3000/api/users/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (resUser.ok) {
          const data = await resUser.json();
          setCourses(data.enrollments || []);
        }

        const resAll = await fetch('http://localhost:3000/api/courses');
        if (resAll.ok) {
          const list = await resAll.json();
          setAllAvailable(list.filter(c => c.isPublished));
        }
      } catch (err) {
        console.error("Erro:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEnroll = async (courseId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:3000/api/enrollments', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ courseId })
      });
      if (res.ok) window.location.reload();
    } catch (err) {
      alert("Erro ao matricular");
    }
  };

  return (
    <div className="meus-cursos-container">
      
      {/* MODAL (Acionado pelos botões da interface) */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Escolha seus Cursos</h3>
            <div className="modal-grid">
              {allAvailable.map(c => {
                const isEnrolled = courses.some(m => m.course.id === c.id);
                return (
                  <div 
                    key={c.id} 
                    className={`modal-card ${isEnrolled ? 'selected' : ''}`}
                    onClick={() => !isEnrolled && handleEnroll(c.id)}
                  >
                    <div className="modal-card-img"></div>
                    <p style={{fontSize: '14px', fontWeight: 'bold'}}>{c.title}</p>
                    {isEnrolled && <span style={{color: '#88d4b4'}}>✓</span>}
                  </div>
                );
              })}
            </div>
            <button className="btn-close-modal" onClick={() => setIsModalOpen(false)}>Fechar</button>
          </div>
        </div>
      )}

      <header className="desktop-header">
        <div className="desktop-logo">Capacita<span>+</span></div>
        <nav className="desktop-nav">
          <Link to="/">Início</Link> 
          <Link to="/cursos" className="active">Meus Cursos</Link>
          <Link to="/mentor">Mentor+</Link>
          <Link to="/perfil">Meu Perfil</Link>
        </nav>
        <div className="desktop-user">
          
          <button className="add-course-btn" title="Adicionar Curso" onClick={() => setIsModalOpen(true)}>+</button>
          <div className="user-avatar" onClick={() => navigate('/perfil')}>👤</div>
        </div>
      </header>

      {/* HEADER MOBILE */}
      <header className="mobile-header">
        <h2>Meus Cursos</h2>
        <button className="add-course-btn" onClick={() => setIsModalOpen(true)}>+</button>
      </header>

      <main className="main-content">
        {loading ? (
          <p style={{textAlign: 'center', padding: '40px'}}>Carregando...</p>
        ) : courses.length === 0 ? (
          <div className="sem-cursos">
            <img src={semCursoImg} alt="Sem Cursos" />
            <p className="sem-cursos-title">Sua lista está vazia</p>
            <p className="sem-cursos-description">Clique no botão abaixo para escolher seu primeiro curso.</p>
            <button className="btn-explorar" onClick={() => setIsModalOpen(true)}>Explorar cursos</button>
          </div>
        ) : (
          <div className="cursos-grid">
            {courses.map(m => (
              <div key={m.id} className="course-card-premium">
                <div className="card-top">
                  <div className="course-image-placeholder"></div>
                  <div className="card-info">
                    <h4>{m.course.title}</h4>
                    <p className="card-desc">{m.course.description}</p>
                    <p className="card-time">🕒 10h restantes</p>
                  </div>
                  <div className="card-progress-circle">
                    <svg viewBox="0 0 36 36" className="circular-chart">
                      <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="circle" strokeDasharray="60, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <text x="18" y="20.35" className="percentage">60%</text>
                    </svg>
                  </div>
                </div>
                <div className="card-divider"></div>
                <button className="btn-continuar-premium">Continuar curso</button>
              </div>
            ))}
          </div>
        )}
      </main>

      <nav className="mobile-bottom-nav">
        <button className="nav-btn" onClick={() => navigate('/')}>
          <span className="icon">🏠</span><span>Início</span>
        </button>
        <button className="nav-btn active">
          <span className="icon">▶️</span><span>Meus Cursos</span>
        </button>
        <button className="nav-btn" onClick={() => navigate('/mentor')}><span className="icon">📖</span><span>Mentor+</span></button>
        <button className="nav-btn" onClick={() => navigate('/perfil')}><span className="icon">👤</span><span>Meu Perfil</span></button>
      </nav>
    </div>
  );
}

export default MeusCursos;