
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { Message } from '../types';

export const GeminiChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '¡Hola! Soy el núcleo cognitivo de Materia Programable. ¿Qué aspecto de la tecnología claytrónica o modular te gustaría explorar hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: 'Eres un experto en materia programable, nanotecnología y claytronics. Tu objetivo es explicar conceptos complejos de forma sencilla y apasionante en español. Usa un tono futurista y técnico pero accesible. Si el usuario pregunta por aplicaciones prácticas, menciona medicina, exploración espacial y arquitectura dinámica.',
          temperature: 0.7,
        }
      });

      const aiResponse = response.text || "Lo siento, no pude procesar esa información en mi núcleo de datos.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Error de conexión con la red neuronal central. Por favor, verifica tu enlace." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 h-[calc(100vh-140px)] flex flex-col">
      <div className="flex items-center gap-3 mb-6 bg-blue-500/10 p-4 rounded-2xl border border-blue-500/20">
        <Sparkles className="text-blue-400" />
        <div>
          <h2 className="text-lg font-bold">Explorador Cognitivo AI</h2>
          <p className="text-xs text-blue-400/80">Gemini 3 Flash Enhanced</p>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-6 mb-6 pr-4 custom-scrollbar"
      >
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`p-2 rounded-xl ${msg.role === 'user' ? 'bg-purple-600' : 'bg-slate-800'}`}>
              {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
            </div>
            <div className={`max-w-[80%] p-4 rounded-2xl leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-purple-600/10 border border-purple-500/20 text-white' 
                : 'bg-slate-900 border border-white/5 text-gray-300'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-xl bg-slate-800 animate-pulse">
              <Bot size={20} />
            </div>
            <div className="bg-slate-900 border border-white/5 p-4 rounded-2xl">
              <Loader2 className="animate-spin text-blue-400" />
            </div>
          </div>
        )}
      </div>

      <div className="relative group">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Pregunta sobre catoms, algoritmos de forma o nano-materia..."
          className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 pl-6 pr-16 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder:text-gray-600"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="absolute right-3 top-2 bottom-2 px-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl transition-colors flex items-center justify-center"
        >
          <Send size={18} />
        </button>
      </div>
      <p className="text-center text-[10px] text-gray-600 mt-3 uppercase tracking-widest font-bold">
        Interficie de Consulta Neuronal v1.0.4
      </p>
    </div>
  );
};
