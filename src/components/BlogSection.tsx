import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BLOG_ARTICLES } from '../data/blog';
import { BlogArticle } from '../types';
import { Calendar, User, Clock, ChevronRight, BookOpen, Plus, Lock, X, FileText, Check, AlertTriangle } from 'lucide-react';

export default function BlogSection() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [activeCategory, setActiveCategory] = useState<'all' | 'fat_loss' | 'muscle_building' | 'nutrition' | 'supplements' | 'lifestyle'>('all');
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [isAddingArticle, setIsAddingArticle] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState<'fat_loss' | 'muscle_building' | 'nutrition' | 'supplements' | 'lifestyle'>('nutrition');
  const [readTime, setReadTime] = useState(5);
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load articles from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('fitlife_blog_articles');
    if (saved) {
      try {
        setArticles(JSON.parse(saved));
      } catch (e) {
        setArticles(BLOG_ARTICLES);
      }
    } else {
      setArticles(BLOG_ARTICLES);
      localStorage.setItem('fitlife_blog_articles', JSON.stringify(BLOG_ARTICLES));
    }
  }, []);

  const filteredArticles = articles.filter(art => {
    if (activeCategory === 'all') return true;
    return art.category === activeCategory;
  });

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Check password protection
    if (password !== '123456') {
      setError('Access Denied: Incorrect authorization password.');
      return;
    }

    // Validate inputs
    if (!title.trim() || !author.trim() || !summary.trim() || !content.trim()) {
      setError('Please fill out all required fields.');
      return;
    }

    // Create unique slug & ID
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    
    const id = `b_custom_${Date.now()}`;
    const publishedAt = new Date().toISOString().split('T')[0];

    // Split tags by comma
    const tagList = tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newArticle: BlogArticle = {
      id,
      title: title.trim(),
      slug,
      category,
      summary: summary.trim(),
      content: content.trim(),
      readTime: Number(readTime) || 5,
      tags: tagList.length > 0 ? tagList : ['Science', 'Performance'],
      author: author.trim(),
      publishedAt
    };

    const updatedArticles = [newArticle, ...articles];
    setArticles(updatedArticles);
    localStorage.setItem('fitlife_blog_articles', JSON.stringify(updatedArticles));

    // Clear form states
    setTitle('');
    setAuthor('');
    setCategory('nutrition');
    setReadTime(5);
    setSummary('');
    setTags('');
    setContent('');
    setPassword('');
    setSuccess('Article published successfully!');

    // Close publisher and view the newly published article directly for high-fidelity response
    setTimeout(() => {
      setIsAddingArticle(false);
      setSuccess('');
      setSelectedArticle(newArticle);
    }, 800);
  };

  const getCategoryLabel = (cat: string) => {
    return cat.replace('_', ' ');
  };

  return (
    <div id="blog_section_root" className="my-6 space-y-8">
      {/* Blog header / controls */}
      <div className="flex justify-between items-center bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-150 dark:border-neutral-800 shadow-sm flex-wrap gap-4">
        <div>
          <h3 className="text-xl font-black text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
            <BookOpen className="w-5.5 h-5.5 text-emerald-500" /> Fitness Science Journal
          </h3>
          <p className="text-xs text-neutral-400">Unlock the physiological sciences of performance, fat oxidation, and hypertrophic stimulus.</p>
        </div>

        <div className="flex gap-2">
          {!isAddingArticle && !selectedArticle && (
            <button
              id="btn_open_publish_article"
              onClick={() => setIsAddingArticle(true)}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-500/10 hover:opacity-90 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Publish Article
            </button>
          )}
        </div>
      </div>

      {/* Categories Bar */}
      {!isAddingArticle && !selectedArticle && (
        <div className="flex flex-wrap gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-900/80 rounded-2xl border border-neutral-200/40 dark:border-neutral-800/40">
          {(['all', 'fat_loss', 'muscle_building', 'nutrition', 'supplements', 'lifestyle'] as const).map(cat => (
            <button
              key={cat}
              id={`btn_blog_cat_${cat}`}
              onClick={() => { setActiveCategory(cat); setSelectedArticle(null); }}
              className={`px-3.5 py-1.5 text-xs font-bold capitalize rounded-xl transition cursor-pointer ${
                activeCategory === cat
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {isAddingArticle ? (
          /* Publish Article Form Panel */
          <motion.div
            key="publishing_form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white dark:bg-neutral-950 p-6 md:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-850 shadow-md max-w-2xl mx-auto space-y-6"
          >
            <div className="flex justify-between items-center border-b border-neutral-100 dark:border-neutral-800 pb-4">
              <div>
                <h4 className="text-lg font-black text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
                  <FileText className="w-5.5 h-5.5 text-emerald-500" /> Draft New Scientific Article
                </h4>
                <p className="text-xs text-neutral-400 mt-0.5">Share your fitness wisdom backed by physiological science.</p>
              </div>
              <button
                id="btn_cancel_publishing"
                onClick={() => {
                  setIsAddingArticle(false);
                  setError('');
                }}
                className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-850 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-xs flex items-center gap-2 font-semibold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs flex items-center gap-2 font-semibold animate-pulse">
                <Check className="w-4 h-4 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handlePublish} className="space-y-4 pt-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-neutral-400 dark:text-neutral-500 block">
                    Article Title *
                  </label>
                  <input
                    id="input_blog_title"
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g., Creatine Monohydrate & ATP Re-synthesis"
                    className="w-full text-xs bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-3 py-2.5 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                {/* Author */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-neutral-400 dark:text-neutral-500 block">
                    Author / Expert *
                  </label>
                  <input
                    id="input_blog_author"
                    type="text"
                    required
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    placeholder="e.g., Prof. Sarah Collins, CSCS"
                    className="w-full text-xs bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-3 py-2.5 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-neutral-400 dark:text-neutral-500 block">
                    Journal Category
                  </label>
                  <select
                    id="select_blog_category"
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full text-xs bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-3 py-2.5 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="fat_loss">Fat Loss</option>
                    <option value="muscle_building">Muscle Building</option>
                    <option value="nutrition">Nutrition</option>
                    <option value="supplements">Supplements</option>
                    <option value="lifestyle">Lifestyle</option>
                  </select>
                </div>

                {/* Read Time */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-neutral-400 dark:text-neutral-500 block">
                    Estimated Read Time (minutes)
                  </label>
                  <input
                    id="input_blog_readtime"
                    type="number"
                    min="1"
                    max="60"
                    value={readTime}
                    onChange={e => setReadTime(parseInt(e.target.value) || 5)}
                    className="w-full text-xs bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-3 py-2.5 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-neutral-400 dark:text-neutral-500 block">
                  Feed Summary Card Text *
                </label>
                <textarea
                  id="input_blog_summary"
                  required
                  rows={2}
                  maxLength={200}
                  value={summary}
                  onChange={e => setSummary(e.target.value)}
                  placeholder="Summarize the core premise of this scientific paper in 1 or 2 lines."
                  className="w-full text-xs bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                />
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-neutral-400 dark:text-neutral-500 block">
                  Tags (comma-separated list)
                </label>
                <input
                  id="input_blog_tags"
                  type="text"
                  value={tags}
                  onChange={e => setTags(e.target.value)}
                  placeholder="e.g., Creatine, ATP, Supplements, Strength"
                  className="w-full text-xs bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-3 py-2.5 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Content Body */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-neutral-400 dark:text-neutral-500 block">
                    Article Body Content *
                  </label>
                  <span className="text-[9px] text-neutral-400 font-mono">
                    Format: Use <code className="bg-neutral-100 dark:bg-neutral-900 px-1 py-0.5 rounded text-emerald-500">### Header</code>, <code className="bg-neutral-100 dark:bg-neutral-900 px-1 py-0.5 rounded text-emerald-500">#### Subheader</code>, and <code className="bg-neutral-100 dark:bg-neutral-900 px-1 py-0.5 rounded text-emerald-500">- list item</code>
                  </span>
                </div>
                <textarea
                  id="input_blog_content"
                  required
                  rows={8}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder={`### The Mechanism of ATP Re-synthesis\n\nATP represents the cellular fuel of human physical performance...\n\n#### The Role of Phosphocreatine\n\nWhen you supplement with micronized monohydrate, your intramuscular reserves rise...\n\n- Faster muscle ATP recovery\n- Lean muscle mass optimization`}
                  className="w-full text-xs bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium leading-relaxed"
                />
              </div>

              {/* Password protection block */}
              <div className="p-4 bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/80 rounded-2xl space-y-2">
                <label className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-neutral-400 dark:text-neutral-500 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-amber-500" /> Authorization Password Required *
                </label>
                <div className="relative">
                  <input
                    id="input_blog_password"
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter 123456 to publish..."
                    className="w-full text-xs bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  id="btn_form_cancel"
                  onClick={() => {
                    setIsAddingArticle(false);
                    setError('');
                  }}
                  className="px-4 py-2 border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="btn_form_submit"
                  className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:opacity-95 rounded-xl text-xs font-bold shadow-md shadow-emerald-500/10 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" /> Publish to Feed
                </button>
              </div>
            </form>
          </motion.div>
        ) : selectedArticle ? (
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
              className="text-xs font-bold text-emerald-500 hover:underline flex items-center gap-1 cursor-pointer"
            >
              ← Back to Article Feed
            </button>

            {/* Title Block */}
            <div className="space-y-3">
              <span className="px-2 py-0.5 text-[8px] font-black tracking-wider uppercase rounded bg-emerald-500/10 text-emerald-600">
                {getCategoryLabel(selectedArticle.category)}
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

            {/* Content Display Engine */}
            <div className="prose dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed space-y-4 border-t border-neutral-100 dark:border-neutral-850 pt-6">
              {selectedArticle.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.trim().startsWith('###')) {
                  return (
                    <h3 key={index} className="text-lg font-black text-neutral-850 dark:text-neutral-100 mt-6 mb-2">
                      {paragraph.replace('###', '').trim()}
                    </h3>
                  );
                }
                if (paragraph.trim().startsWith('####')) {
                  return (
                    <h4 key={index} className="text-base font-bold text-neutral-850 dark:text-neutral-200 mt-4 mb-1">
                      {paragraph.replace('####', '').trim()}
                    </h4>
                  );
                }
                if (paragraph.trim().startsWith('-')) {
                  return (
                    <ul key={index} className="list-disc pl-5 space-y-1.5 my-3">
                      {paragraph.split('\n').map((li, lIdx) => (
                        <li key={lIdx} className="text-neutral-600 dark:text-neutral-400 font-medium">
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
            {filteredArticles.length > 0 ? (
              filteredArticles.map(art => (
                <div
                  key={art.id}
                  id={`article_card_${art.id}`}
                  className="bg-white dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-150 dark:border-neutral-850 hover:border-neutral-300 dark:hover:border-neutral-750 transition flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400">
                      <span className="px-2 py-0.5 font-black uppercase rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-500">
                        {getCategoryLabel(art.category)}
                      </span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-emerald-500" /> {art.readTime} min read</span>
                    </div>

                    <h4 className="text-lg font-extrabold text-neutral-800 dark:text-neutral-100 leading-snug tracking-tight line-clamp-2">
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
                      className="font-bold text-emerald-500 hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      Read Science <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-neutral-400 font-medium text-xs">
                No articles published in this category yet. Click 'Publish Article' to write one!
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
