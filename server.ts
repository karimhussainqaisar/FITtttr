import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client Lazily & Safely to prevent crashes on missing keys
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY is not configured in secrets. Please set it in the Settings -> Secrets panel.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'FitLife AI Service' });
});

// Helper to read and write articles from/to filesystem database
const articlesFilePath = path.join(process.cwd(), 'articles.json');

function readArticlesFromFile() {
  try {
    if (fs.existsSync(articlesFilePath)) {
      const data = fs.readFileSync(articlesFilePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading articles file:', err);
  }
  return [];
}

function writeArticlesToFile(articles: any[]) {
  try {
    fs.writeFileSync(articlesFilePath, JSON.stringify(articles, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing articles file:', err);
    return false;
  }
}

// Retrieve all articles from server database
app.get('/api/blog', (req, res) => {
  const articles = readArticlesFromFile();
  res.json(articles);
});

// Publish a new article to server database
app.post('/api/blog', (req, res) => {
  try {
    const { title, author, category, readTime, summary, tags, content, imageUrl, password } = req.body;

    const correctPassword = process.env.BLOG_PASSWORD || '123456';
    if (!password || password !== correctPassword) {
      res.status(401).json({ error: 'Access Denied: Incorrect authorization password.' });
      return;
    }

    if (!title || !author || !summary || !content) {
      res.status(400).json({ error: 'Please fill out all required fields.' });
      return;
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    
    const id = `b_custom_${Date.now()}`;
    const publishedAt = new Date().toISOString().split('T')[0];

    const newArticle = {
      id,
      title: title.trim(),
      slug,
      category,
      summary: summary.trim(),
      content: content.trim(),
      readTime: Number(readTime) || 5,
      tags: tags && tags.length > 0 ? tags : ['Science', 'Performance'],
      author: author.trim(),
      publishedAt,
      imageUrl: imageUrl || ''
    };

    const articles = readArticlesFromFile();
    articles.unshift(newArticle);
    writeArticlesToFile(articles);

    res.json({ success: true, article: newArticle });
  } catch (error: any) {
    console.error('Error publishing blog article:', error);
    res.status(500).json({ error: 'An internal server error occurred while publishing.' });
  }
});

// Delete an article from server database
app.delete('/api/blog/:id', (req, res) => {
  try {
    const { id } = req.params;
    let articles = readArticlesFromFile();
    const originalLength = articles.length;
    articles = articles.filter((art: any) => art.id !== id);
    
    if (articles.length === originalLength) {
      res.status(404).json({ error: 'Article not found.' });
      return;
    }

    writeArticlesToFile(articles);
    res.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting blog article:', error);
    res.status(500).json({ error: 'An internal server error occurred while deleting.' });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { prompt, profileContext } = req.body;

    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    const ai = getGeminiClient();

    // Construct a rich system context using user parameters
    const systemInstruction = `You are the FitLife AI Fitness Coach, an elite, scientifically-backed, extremely professional athletic personal trainer and clinical dietitian.
The user has provided the following biometrics:
- Age: ${profileContext?.age || 26}
- Gender: ${profileContext?.gender || 'not specified'}
- Height: ${profileContext?.height || 175} cm
- Current Weight: ${profileContext?.weight || 75} kg
- Target Weight: ${profileContext?.targetWeight || 70} kg
- Activity Multiplier: ${profileContext?.activityLevel || 'moderately active'}
- Nutrition Philosophy: ${profileContext?.dietStyle || 'balanced'} diet
- Calorie Daily Target: ${profileContext?.calorieGoal || 2000} kcal (P: ${profileContext?.proteinGoal || 150}g, C: ${profileContext?.carbsGoal || 220}g, F: ${profileContext?.fatGoal || 60}g)

Rules for response:
1. Always align recommendations with the user's caloric targets, target weight direction, and diet style (e.g. if they are Keto, do not suggest rice or wheat. If they are Pakistani/South Asian, offer healthy alternatives to traditional regional foods).
2. Keep your answers scientific, objective, encouraging, and clear.
3. Use markdown bullet points, bolding, and headers to structure workout plans and meal schedules clearly.
4. Provide realistic, actionable fitness corrections and mental encouragement. Do not suggest dangerous exercises or extreme caloric drops. Always maintain a professional, supportive coaching tone.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const reply = response.text;
    res.json({ reply });
  } catch (error: any) {
    console.error('Error in FitLife AI Coach proxy:', error);
    res.status(500).json({
      error: error.message || 'An internal error occurred while communicating with the AI Personal Trainer.'
    });
  }
});

// Configure Vite or Static files depending on Environment
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Running in Development mode - mounting Vite middleware...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    console.log('Running in Production mode - serving compiled static assets...');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FitLife AI server booting successfully on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
