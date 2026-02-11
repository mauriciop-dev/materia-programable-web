
import React from 'react';
import { Share2, Bookmark, Clock, ArrowLeft } from 'lucide-react';
import { Post } from '../types';

interface PostReaderProps {
  post: Post;
  onBack: () => void;
}

export const PostReader: React.FC<PostReaderProps> = ({ post, onBack }) => {
  return (
    <div className="bg-[#fdfbff] text-[#1a1c1e] min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-20">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 font-medium mb-12 hover:translate-x-[-4px] transition-transform"
        >
          <ArrowLeft size={20} />
          Volver a la Biblioteca
        </button>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <div className="flex items-center text-slate-500 text-sm gap-1">
              <Clock size={14} />
              <span>5 min de lectura</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 text-[#1a1c1e] leading-[1.1]">
            {post.title}
          </h1>

          {post.image_url && (
            <div className="rounded-[2rem] overflow-hidden mb-10 shadow-2xl shadow-blue-900/10">
              <img src={post.image_url} alt={post.title} className="w-full h-auto object-cover" />
              {post.image_prompt && (
                <p className="p-4 text-xs italic text-slate-500 bg-slate-50 border-t border-slate-100">
                  IA Prompt: {post.image_prompt}
                </p>
              )}
            </div>
          )}
        </header>

        <article 
          className="scientific-content text-lg leading-[1.8] text-slate-700 space-y-6"
          dangerouslySetInnerHTML={{ __html: post.content_html }}
        />

        {post.references_html && (
          <section className="mt-16 pt-12 border-t border-slate-200">
            <h3 className="text-xl font-bold mb-6 text-[#1a1c1e]">Referencias y Fuentes</h3>
            <div 
              className="text-sm text-slate-500 space-y-2 bg-slate-50 p-6 rounded-2xl"
              dangerouslySetInnerHTML={{ __html: post.references_html }}
            />
          </section>
        )}

        <footer className="mt-20 flex items-center justify-between border-t border-slate-200 pt-8">
          <div className="flex gap-4">
            <button className="p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
              <Share2 size={20} className="text-slate-700" />
            </button>
            <button className="p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
              <Bookmark size={20} className="text-slate-700" />
            </button>
          </div>
          <p className="text-sm text-slate-400 italic">ILMP - Instituto Latinoamericano de Materia Programable</p>
        </footer>
      </div>
    </div>
  );
};
