
import React, { useState } from 'react';
import { 
  Box, 
  Cpu, 
  Network, 
  Layers, 
  Zap, 
  ArrowRight, 
  Menu,
  X,
  BookOpen,
  Sparkles,
  Mail
} from 'lucide-react';
import { GeminiChat } from './components/GeminiChat';
import { PostReader } from './components/PostReader';
import { Post } from './types';

// Mock data for initial testing
const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'La Revolución de los Catoms en la Nanomedicina',
    slug: 'catoms-nanomedicina',
    category: 'Medicina',
    content_html: `
      <p>La materia programable está redefiniendo los límites de lo que consideramos posible en la intervención biológica. A través de la implementación de <strong>catoms</strong> (claytronic atoms), investigadores han logrado simular estructuras celulares que no solo imitan la función, sino que pueden ser reconfiguradas en tiempo real mediante señales de radiofrecuencia de baja intensidad.</p>
      <p>Este avance permite la creación de endoprótesis inteligentes que se adaptan al crecimiento del tejido circundante, eliminando la necesidad de múltiples cirugías en pacientes pediátricos. La capacidad de procesamiento distribuido dentro de cada nodo de materia permite una toma de decisiones local, reduciendo la latencia de respuesta ante cambios fisiológicos bruscos.</p>
    `,
    image_url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1000&auto=format&fit=crop',
    image_prompt: 'Cinematic laboratory render, micro-robots assembling a geometric lattice, 8k, scientific visualization, soft blue lighting.',
    references_html: '<ul><li>IEEE Transactions on Nanobioscience (2024)</li><li>Journal of Modular Robotics (Vol. 12)</li></ul>',
    created_at: '2024-05-20'
  }
];

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'explorer' | 'articles'>('home');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  if (selectedPost) {
    return <PostReader post={selectedPost} onBack={() => setSelectedPost(null)} />;
  }

  return (
    <div className={`min-h-screen ${activeTab === 'home' ? 'bg-slate-950 text-white' : 'bg-[#fdfbff] text-[#1a1c1e]'} transition-colors duration-500`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 border-b backdrop-blur-md ${activeTab === 'home' ? 'bg-slate-950/80 border-white/5' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-blue-500/20">
                <Box className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xl font-black tracking-tighter ${activeTab === 'home' ? 'text-white' : 'text-slate-900'}`}>
                ILMP<span className="text-blue-500">.EDU</span>
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-10">
              <NavButton active={activeTab === 'home'} theme={activeTab === 'home' ? 'dark' : 'light'} onClick={() => setActiveTab('home')}>Portal</NavButton>
              <NavButton active={activeTab === 'articles'} theme={activeTab === 'home' ? 'dark' : 'light'} onClick={() => setActiveTab('articles')}>Biblioteca</NavButton>
              <NavButton active={activeTab === 'explorer'} theme={activeTab === 'home' ? 'dark' : 'light'} onClick={() => setActiveTab('explorer')}>Agente AI</NavButton>
              <button className={`px-6 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 ${activeTab === 'home' ? 'bg-white text-slate-950 hover:bg-blue-400' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200'}`}>
                Investigación <ArrowRight size={16} />
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={activeTab === 'home' ? 'text-gray-300' : 'text-slate-900'}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {activeTab === 'home' && <HomeSection onExplore={() => setActiveTab('explorer')} onLibrary={() => setActiveTab('articles')} />}
        {activeTab === 'explorer' && <GeminiChat />}
        {activeTab === 'articles' && (
          <div className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-4xl font-black mb-4 text-[#1a1c1e]">Biblioteca del Futuro</h2>
            <p className="text-slate-500 mb-12">Explora los últimos descubrimientos en materia autómata y Claytronics.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOCK_POSTS.map(post => (
                <PostCard key={post.id} post={post} onClick={() => setSelectedPost(post)} />
              ))}
            </div>
            
            {/* Newsletter Subscription (MD3 Style) */}
            <div className="mt-32 p-10 bg-indigo-50 rounded-[2.5rem] border border-indigo-100 flex flex-col md:flex-row items-center gap-8 shadow-inner">
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-slate-900 mb-3 flex items-center gap-3">
                  <Mail className="text-indigo-600" />
                  Sincronización Diaria
                </h3>
                <p className="text-slate-600 max-w-md">Recibe los avances más críticos del ILMP directamente en tu red de comunicaciones (8am y 2pm COT).</p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="px-6 py-4 bg-white border border-indigo-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-72 shadow-sm"
                />
                <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2 whitespace-nowrap">
                  Unirse
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className={`border-t py-12 mt-20 ${activeTab === 'home' ? 'bg-slate-950 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Box className="w-5 h-5 text-blue-500" />
            <span className={`font-black tracking-tight ${activeTab === 'home' ? 'text-white' : 'text-slate-900'}`}>MATERIA PROGRAMABLE / ILMP</span>
          </div>
          <div className="mt-8 text-gray-500 text-sm font-medium">
            © {new Date().getFullYear()} Instituto Latinoamericano de Materia Programable.
          </div>
        </div>
      </footer>
    </div>
  );
};

const PostCard: React.FC<{ post: Post; onClick: () => void }> = ({ post, onClick }) => (
  <div 
    onClick={onClick}
    className="group bg-white rounded-[2rem] border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-blue-900/10 transition-all cursor-pointer transform hover:-translate-y-2"
  >
    <div className="h-48 overflow-hidden relative">
      <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-4 left-4">
        <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase text-blue-600 shadow-sm">
          {post.category}
        </span>
      </div>
    </div>
    <div className="p-8">
      <h3 className="text-xl font-bold mb-4 text-[#1a1c1e] group-hover:text-blue-600 transition-colors leading-snug">
        {post.title}
      </h3>
      <div className="flex items-center justify-between mt-6">
        <span className="text-slate-400 text-xs font-medium">Lectura: 5 min</span>
        <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <ArrowRight size={18} />
        </div>
      </div>
    </div>
  </div>
);

const NavButton: React.FC<{ children: React.ReactNode; active?: boolean; onClick: () => void; theme: 'light' | 'dark' }> = ({ children, active, onClick, theme }) => (
  <button 
    onClick={onClick}
    className={`text-sm font-bold tracking-tight transition-all hover:text-blue-500 ${active 
      ? 'text-blue-500 relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-blue-500' 
      : (theme === 'dark' ? 'text-gray-400' : 'text-slate-600')
    }`}
  >
    {children}
  </button>
);

const HomeSection: React.FC<{ onExplore: () => void; onLibrary: () => void }> = ({ onExplore, onLibrary }) => (
  <div className="relative overflow-hidden min-h-[90vh] flex flex-col justify-center">
    <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob"></div>
    <div className="absolute -bottom-8 right-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob animation-delay-4000"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-6 py-3 rounded-full mb-12 hover:scale-105 transition-transform cursor-default">
        <Sparkles className="w-4 h-4 text-blue-400" />
        <span className="text-blue-400 text-sm font-black uppercase tracking-[0.2em]">Alpha Research v0.2.1</span>
      </div>
      
      <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-tight">
        SOFTWARE <br />
        <span className="gradient-text">TANGIBLE.</span>
      </h1>
      
      <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
        El primer instituto iberoamericano dedicado a la digitalización de la estructura física. Claytronics, Nanobots y Arquitectura Dinámica.
      </p>

      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <button 
          onClick={onExplore}
          className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-[2rem] font-black text-xl shadow-2xl shadow-blue-500/30 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 w-full sm:w-auto"
        >
          <Zap className="w-6 h-6 fill-current" />
          ACCESO AGENTE
        </button>
        <button 
          onClick={onLibrary}
          className="bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white px-10 py-5 rounded-[2rem] font-black text-xl transition-all w-full sm:w-auto flex items-center justify-center gap-3"
        >
          <BookOpen className="w-6 h-6" />
          BIBLIOTECA
        </button>
      </div>

      <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
        <FeatureItem 
          num="01"
          title="CATOMS"
          desc="Nodos de computación de escala milimétrica que utilizan fuerzas electroestáticas para la auto-reconfiguración masiva."
        />
        <FeatureItem 
          num="02"
          title="RAG-MATTER"
          desc="Nuestro sistema de IA procesa papers científicos globales para generar conocimiento técnico optimizado en español."
        />
        <FeatureItem 
          num="03"
          title="EL FUTURO"
          desc="Desde hábitats espaciales adaptativos hasta medicina reconstructiva a nivel atómico. El hardware es ahora elástico."
        />
      </div>
    </div>
  </div>
);

const FeatureItem: React.FC<{ num: string; title: string; desc: string }> = ({ num, title, desc }) => (
  <div className="group">
    <div className="text-blue-500 font-black text-2xl mb-4 mono opacity-50 group-hover:opacity-100 transition-opacity">/{num}</div>
    <h3 className="text-2xl font-black mb-4 tracking-tight">{title}</h3>
    <p className="text-gray-500 font-medium leading-relaxed group-hover:text-gray-300 transition-colors">{desc}</p>
  </div>
);

export default App;
