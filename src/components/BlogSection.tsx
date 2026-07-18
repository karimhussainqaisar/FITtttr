import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BLOG_ARTICLES } from '../data/blog';
import { BlogArticle } from '../types';
import { Calendar, User, Clock, ChevronRight, BookOpen } from 'lucide-react';

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'fat_loss' | 'muscle_building' | 'nutrition'>('all');
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  const filteredArticles = BLOG_ARTICLES.filter(art => {
    if (activeCategory === 'all') return true;
    return art.category === activeCategory;
  });

  return (
    <div id="blog_section_root" className="my-6 space-y-8">
      {/* Blog header / controls */}
      <div className="flex justify-between items-center bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm flex-wrap gap-4">
        <div>
          <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
            <BookOpen className="w-5.5 h-5.5 text-emerald-500" /> Fitness Science Journal
          </h3>
          <p className="text-xs text-neutral-400">Unlock the physiological sciences of performance, fat oxidation, and hypertrophic stimulus.</p>
        </div>

        <div className="flex gap-2">
          {(['all', 'fat_loss', 'muscle_building', 'nutrition'] as const).map(cat => (
            <button
              key={cat}
              id={`btn_blog_cat_${cat}`}
              onClick={() => { setActiveCategory(cat); setSelectedArticle(null); }}
              className={`px-3 py-1.5 text-xs font-bold capitalize rounded-xl transition ${
                activeCategory === cat
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedArticle ? (
          /* Render Active Full Article */
          <motion.div
            key="active_article"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white dark:bg-neutral-950 p-6 md:p-8 rounded-3xl border border-neutral-150 dark:border-neutral-850 shadow-md space-y-6 max-w-3xl mx-auto"
          >
            {/* Breadcrumb back */}
            <button
              id="btn_back_to_blog_list"
              onClick={() => setSelectedArticle(null)}
              className="text-xs font-bold text-emerald-500 hover:underline flex items-center gap-1"
            >
              ← Back to Article List
            </button>

            {/* Title Block */}
            <div className="space-y-3">
              <span className="px-2 py-0.5 text-[8px] font-black tracking-wider uppercase rounded bg-emerald-500/10 text-emerald-600">
                {selectedArticle.category.replace('_', ' ')}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-neutral-50 leading-tight">
                {selectedArticle.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 pt-1">
                <span className="flex items-center gap-1"><User className="w-4 h-4" /> {selectedArticle.author}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {selectedArticle.publishedAt}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {selectedArticle.readTime} min read</span>
              </div>
            </div>

            {/* Markdown rendered equivalent content */}
            <div className="prose dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed space-y-4 border-t border-neutral-100 dark:border-neutral-850 pt-6">
              {selectedArticle.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.trim().startsWith('###')) {
                  return (
                    <h3 key={index} className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mt-6 mb-2">
                      {paragraph.replace('###', '').trim()}
                    </h3>
                  );
                }
                if (paragraph.trim().startsWith('####')) {
                  return (
                    <h4 key={index} className="text-base font-bold text-neutral-800 dark:text-neutral-200 mt-4 mb-1">
                      {paragraph.replace('####', '').trim()}
                    </h4>
                  );
                }
                if (paragraph.trim().startsWith('-')) {
                  return (
                    <ul key={index} className="list-disc pl-5 space-y-1.5 my-3">
                      {paragraph.split('\n').map((li, lIdx) => (
                        <li key={lIdx} className="text-neutral-600 dark:text-neutral-400">
                          {li.replace('-', '').trim()}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={index} className="font-medium text-neutral-600 dark:text-neutral-300">
                    {paragraph.trim()}
                  </p>
                );
              })}
            </div>

            <div className="border-t border-neutral-100 dark:border-neutral-850 pt-6 flex flex-wrap gap-2">
              {selectedArticle.tags.map((tag, tIdx) => (
                <span key={tIdx} className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 text-neutral-400 rounded-lg">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        ) : (
          /* List of Articles Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map(art => (
              <div
                key={art.id}
                id={`article_card_${art.id}`}
                className="bg-white dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-150 dark:border-neutral-850 hover:border-neutral-300 dark:hover:border-neutral-750 transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400">
                    <span className="px-2 py-0.5 font-black uppercase rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-500">
                      {art.category.replace('_', ' ')}
                    </span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-emerald-500" /> {art.readTime} min read</span>
                  </div>

                  <h4 className="text-lg font-extrabold text-neutral-800 dark:text-neutral-100 leading-snug tracking-tight">
                    {art.title}
                  </h4>
                  <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="border-t border-neutral-50 dark:border-neutral-850 pt-4 mt-4 flex items-center justify-between text-xs">
                  <span className="font-mono text-neutral-400 text-[10px]">By {art.author}</span>
                  <button
                    id={`btn_read_article_${art.id}`}
                    onClick={() => setSelectedArticle(art)}
                    className="font-bold text-emerald-500 hover:underline flex items-center gap-0.5"
                  >
                    Read Science <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
