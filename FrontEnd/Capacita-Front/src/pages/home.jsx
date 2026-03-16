import { useState } from 'react';
import './Home.css';

// Importação das imagens dos cursos
import tdahImg from '../assets/TDAH-simbolo.jpg';
import teaImg from '../assets/simbolos-do-autismo-7_xl.jpeg';
import touretteImg from '../assets/touretsimbolo.jpg';

function Home({ onNavigate, onToggleCourse, selectedCourses }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lista de cursos disponíveis para o Modal
  const availableCourses = [
    { id: 1, title: 'TDAH: Estratégias Práticas', image: tdahImg, duration: '2h', desc: 'Aprenda manejo de comportamento e foco.' },
    { id: 2, title: 'TEA Nível 1 de Suporte', image: teaImg, duration: '3h', desc: 'Fundamentos e inclusão escolar.' },
    { id: 3, title: 'Síndrome de Tourette', image: touretteImg, duration: '2h', desc: 'Manejo de tiques e práticas de suporte.' },
  ];

  return (
    <div className="home-container">
      
      {/* 1. BOTÃO FLUTUANTE (Fora do header para aparecer em qualquer tela) */}
      <button className="fab-select" onClick={() => setIsModalOpen(true)}>
        + Escolher Cursos
      </button>

<<<<<<< Updated upstream
      {/* 2. MODAL DE SELEÇÃO */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Escolha seus Cursos</h3>
            <div className="modal-grid">
              {availableCourses.map(course => (
                <div 
                  key={course.id} 
                  className={`modal-card ${selectedCourses && selectedCourses.find(c => c.id === course.id) ? 'selected' : ''}`}
                  onClick={() => onToggleCourse(course)}
                >
                  <img src={course.image} alt={course.title} />
                  <p>{course.title}</p>
                </div>
              ))}
=======
      <main className="main-content">
        <section className="promo-banner">
          <div>
            <h2>Seja Premium e libere todos os conteúdos!</h2>
            <p>Acesse Mentorias exclusivas e certificados validados pelo MEC.</p>
          </div>
          <Link to="/premium" className="btn-premium">Conhecer Planos</Link>
        </section>

        <section className="section-container">
          {carregando ? (
            <h3 className="section-title">Buscando informações...</h3>
          ) : (
            <>
              <h3 className="section-title">
                {cursosMatriculados.length > 0 ? 'Continue de onde parou' : 'Cursos que você pode gostar'}
              </h3>
              <div className="cards-grid">
                {cursosMatriculados.length > 0 ? (
                  cursosMatriculados.map((matricula) => (
                    <div className="course-card" key={matricula.id}>
                      <div className="course-image"></div>
                      <div className="course-info">
                        <h4>{matricula.course.title}</h4>
                        <div className="progress-bar-bg">
                          <div className="progress-bar-fill" style={{ width: '50%' }}></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: '#666' }}>Você ainda não está matriculado em nenhum curso.</p>
                )}
              </div>
            </>
          )}
        </section>
        
        <section className="section-container">
          <h3 className="section-title">Explorar Categorias</h3>
          <div className="categories-grid">
            <div className="category-card">TDAH</div>
            <div className="category-card">TEA</div>
            <div className="category-card">Dislexia</div>
            <div className="category-card">Altas Habilidades / Superdotação</div>
            <div className="category-card">Educação Inclusiva</div>
          </div>
        </section>

        <section className="section-container">
          <h3 className="section-title">Cursos Mais Procurados</h3>
          {carregando ? (
             <p style={{ color: '#666' }}>Carregando catálogo...</p>
          ) : (
            <div className="cards-grid">
              {cursosDisponiveis.length > 0 ? (
                cursosDisponiveis.map((curso) => (
                  <div className="course-card" key={curso.id}>
                    <div className="course-image"></div>
                    <div className="course-info">
                      <h4>{curso.title}</h4>
                      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
                        {curso.description}
                      </p>
                      <span style={{ 
                        fontSize: '15px', 
                        fontWeight: 'bold', 
                        color: curso.price === 0 ? '#00796b' : '#333',
                        backgroundColor: curso.price === 0 ? '#e0f2f1' : 'transparent',
                        padding: curso.price === 0 ? '4px 8px' : '0',
                        borderRadius: '4px'
                      }}>
                        {formatarPreco(curso.price)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: '#666', fontStyle: 'italic' }}>
                  Não existem cursos disponíveis no momento.
                </p>
              )}
>>>>>>> Stashed changes
            </div>
            <button className="btn-close-modal" onClick={() => setIsModalOpen(false)}>Pronto</button>
          </div>
        </div>
      )}

      {/* 💻 HEADER EXCLUSIVO PARA DESKTOP */}
      <header className="desktop-header">
        <div className="desktop-logo">Capacita<span>+</span></div>
        <nav className="desktop-nav">
          <button className="active">Início</button>
          <button className='botoes' onClick={onNavigate}>
            Meus Cursos {selectedCourses?.length > 0 && `(${selectedCourses.length})`}
          </button>
          <button>Mentor+</button>
          <button>Meu Perfil</button>
        </nav>
        <div className="desktop-user">
          <button className="search-btn">🔍</button>
          <div className="user-avatar">👤</div>
        </div>
      </header>

      {/* 📱 HEADER EXCLUSIVO PARA MOBILE */}
      <header className="mobile-header">
        <h2>Olá Sarah</h2>
        <button className="search-btn">🔍</button>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="main-content">
        
        {/* BANNER PLANO PREMIUM */}
        <section className="banner">
          <div className="banner-info">
            <h3>Plano Premium</h3>
            <p>Desbloqueie ferramentas para maior produtividade</p>
            <button className="btn-conheca">Conheça agora</button>
          </div>
          <div className="banner-illustration">☁️🛡️</div>
          <div className="banner-dots">
            <span className="dot active"></span><span className="dot"></span><span className="dot"></span><span className="dot"></span><span className="dot"></span>
          </div>
        </section>

        {/* CATEGORIAS */}
        <section className="section">
          <h3 className="section-title">Categorias</h3>
          <div className="cards-wrapper">
            <div className="card category-card">
              <div className="cat-info">
                <h4>TEA</h4><p>5 Cursos</p>
              </div>
              <div className="cat-icon">🧩</div>
            </div>
            <div className="card category-card">
              <div className="cat-info">
                <h4>TDAH</h4><p>15 Cursos</p>
              </div>
              <div className="cat-icon">🧠</div>
            </div>
            <div className="card category-card">
              <div className="cat-info">
                <h4>Dislexia</h4><p>13 Cursos</p>
              </div>
              <div className="cat-icon">📚</div>
            </div>
          </div>
        </section>

        {/* CURSOS MAIS PROCURADOS */}
        <section className="section">
          <h3 className="section-title">Cursos Mais Procurados</h3>
          <div className="cards-wrapper">
            <div className="card course-card">
              <div className="course-img">🎀</div>
              <div className="course-info">
                <h4>TEA Nível 1</h4>
                <p>4.5 ★ <span className="students">10.5k Estudantes</span></p>
              </div>
            </div>
            <div className="card course-card">
              <div className="course-img">🎀</div>
              <div className="course-info">
                <h4>TEA Nível 2</h4>
                <p>4.5 ★ <span className="students">10.5k Estudantes</span></p>
              </div>
            </div>
            <div className="card course-card">
              <div className="puzzle-img">🧩</div>
              <div className="course-info">
                <h4>Inclusão Escolar</h4>
                <p>4.8 ★ <span className="students">8.2k Estudantes</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* FERRAMENTAS MAIS UTILIZADAS */}
        <section className="section">
          <h3 className="section-title">Ferramentas Mais Utilizadas</h3>
          <div className="cards-wrapper">
            <div className="card tool-card">
              <div className="tool-icon">📋</div>
              <div className="tool-info">
                <h4>SENSORISCAN</h4>
                <p>Ferramenta prática para avaliar...</p>
              </div>
            </div>
            <div className="card tool-card">
              <div className="tool-icon">💬</div>
              <div className="tool-info">
                <h4>COMUNICAVISUAL</h4>
                <p>Edição de rotinas visuais...</p>
              </div>
            </div>
            <div className="card tool-card">
              <div className="tool-icon">📅</div>
              <div className="tool-info">
                <h4>ROTINAPLUS</h4>
                <p>Organização de horários...</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 📱 MENU INFERIOR MOBILE */}
      <nav className="mobile-bottom-nav">
        <button className="nav-btn active">
          <span className="icon">🏠</span><span>Início</span>
        </button>
        <button className="nav-btn" onClick={onNavigate}>
          <span className="icon">▶️</span><span>Meus Cursos</span>
        </button>
        <button className="nav-btn"><span className="icon">📖</span><span>Mentor+</span></button>
        <button className="nav-btn"><span className="icon">👤</span><span>Meu Perfil</span></button>
      </nav>

    </div>
  );
}

export default Home;