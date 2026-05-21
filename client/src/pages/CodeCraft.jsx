import { useState, useLayoutEffect, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// Refactored Data Structure
const REPOSITORY_DATA = [
  {
    uid: 'auth-secure',
    title: 'Robust Auth & Session Logic',
    summary: 'Enterprise-grade login system utilizing bcrypt, explicit status codes, and httpOnly cookie security.',
    lang: 'javascript',
    activeCode: `router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ msg: 'USER_NOT_FOUND' });
    if (!user.isVerified) return res.status(403).json({ msg: 'ACCOUNT_NOT_VERIFIED' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'INVALID_CREDENTIALS' });

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '6h' });

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 6 * 60 * 60 * 1000,
    }).json({ success: true, user: user.name });
  } catch (err) {
    res.status(500).send('INTERNAL_SERVER_ERROR');
  }
});`,
    legacyCode: `// Standard/Insecure approach often found in tutorials
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.send('Invalid login');
  }
  const token = jwt.sign({ id: user._id }, 'secret');
  res.json({ token });
});`,
    highlights: [
      'Bcrypt integration for non-reversible password security.',
      'Explicit HTTP status handling for frontend state management.',
      'Cookie-based JWT storage to mitigate XSS vulnerabilities.',
    ],
  },

  {
    uid: 'api-rate-limiter',
    title: 'Intelligent API Rate Limiting',
    summary: 'Redis-backed sliding window rate limiter to protect endpoints from abuse and DDoS attempts.',
    lang: 'javascript',
    activeCode: `const rateLimit = async (req, res, next) => {
  const key = \`rate:\${req.ip}:\${req.path}\`;
  const limit = 100;
  const window = 60; // seconds

  const current = await redis.incr(key);
  if (current === 1) await redis.expire(key, window);

  res.setHeader('X-RateLimit-Limit', limit);
  res.setHeader('X-RateLimit-Remaining', Math.max(0, limit - current));

  if (current > limit) {
    return res.status(429).json({
      msg: 'RATE_LIMIT_EXCEEDED',
      retryAfter: await redis.ttl(key),
    });
  }
  next();
};`,
    legacyCode: `// No rate limiting — common in beginner APIs
router.post('/api/data', async (req, res) => {
  // Endpoint wide open to unlimited requests
  const data = await fetchData();
  res.json(data);
});`,
    highlights: [
      'Redis sliding window prevents burst abuse without blocking legitimate users.',
      'Exposes RateLimit headers for client-side retry logic.',
      'Returns retryAfter so clients can back off gracefully.',
    ],
  },

  {
    uid: 'db-query-optimizer',
    title: 'Optimized Database Query Pattern',
    summary: 'Lean MongoDB aggregation with field projection, pagination, and index-aware filtering.',
    lang: 'javascript',
    activeCode: `const getProducts = async (req, res) => {
  const { page = 1, limit = 20, category, minPrice } = req.query;
  const skip = (page - 1) * limit;

  const pipeline = [
    { $match: {
      ...(category && { category }),
      ...(minPrice && { price: { $gte: Number(minPrice) } }),
      isActive: true,
    }},
    { $project: { name: 1, price: 1, category: 1, thumbnail: 1 } },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: Number(limit) },
  ];

  const [products, total] = await Promise.all([
    Product.aggregate(pipeline),
    Product.countDocuments({ isActive: true }),
  ]);

  res.json({ products, total, page, pages: Math.ceil(total / limit) });
};`,
    legacyCode: `// Fetching everything, filtering in memory
const getProducts = async (req, res) => {
  const products = await Product.find({});
  const filtered = products.filter(p => p.isActive);
  res.json(filtered);
};`,
    highlights: [
      'Aggregation pipeline filtering at the DB level — zero unnecessary data transfer.',
      'Field projection keeps payloads lean and fast.',
      'Parallel countDocuments with Promise.all halves response time.',
    ],
  },

  {
    uid: 'async-error-handler',
    title: 'Global Async Error Middleware',
    summary: 'Express error boundary that catches async throws, normalizes error shape, and prevents server crashes.',
    lang: 'javascript',
    activeCode: `// Wrapper utility
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Global error middleware (register last in Express)
const errorMiddleware = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'INTERNAL_SERVER_ERROR';

  console.error(\`[\${req.method}] \${req.path} → \${status}: \${err.message}\`);

  res.status(status).json({
    success: false,
    code: status,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

// Usage
router.get('/user/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw Object.assign(new Error('USER_NOT_FOUND'), { statusCode: 404, isOperational: true });
  res.json(user);
}));`,
    legacyCode: `// Try-catch in every route — repetitive and crash-prone
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
});`,
    highlights: [
      'asyncHandler wrapper eliminates repetitive try-catch in every route.',
      'Operational vs programmer errors are distinguished — no leaking stack traces in production.',
      'Centralized logging gives full request context on every error.',
    ],
  },

  {
    uid: 'file-upload-secure',
    title: 'Secure File Upload Pipeline',
    summary: 'Multer + Sharp image processing with MIME validation, size limits, and cloud storage integration.',
    lang: 'javascript',
    activeCode: `const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error('INVALID_FILE_TYPE'), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

const uploadAvatar = async (req, res) => {
  const optimized = await sharp(req.file.buffer)
    .resize(400, 400, { fit: 'cover' })
    .webp({ quality: 80 })
    .toBuffer();

  const filename = \`avatars/\${req.user.id}-\${Date.now()}.webp\`;
  await s3.putObject({ Bucket: process.env.S3_BUCKET, Key: filename, Body: optimized, ContentType: 'image/webp' }).promise();

  await User.findByIdAndUpdate(req.user.id, { avatar: filename });
  res.json({ success: true, avatar: filename });
};`,
    legacyCode: `// No validation, stored locally, original size kept
const upload = multer({ dest: 'uploads/' });

router.post('/avatar', upload.single('file'), (req, res) => {
  const user = User.findById(req.user.id);
  user.avatar = req.file.path;
  user.save();
  res.send('Uploaded');
});`,
    highlights: [
      'MIME whitelist blocks disguised executable uploads.',
      'Sharp converts & resizes in-memory — zero unprocessed files touch disk.',
      'Cloud storage with structured keys enables CDN and lifecycle policies.',
    ],
  },

  {
    uid: 'react-query-pattern',
    title: 'Server State Management with React Query',
    summary: 'Declarative data fetching with caching, background refetch, and optimistic UI updates.',
    lang: 'jsx',
    activeCode: `const useUpdateTask = (projectId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, updates }) =>
      api.patch(\`/tasks/\${taskId}\`, updates),

    // Optimistic update
    onMutate: async ({ taskId, updates }) => {
      await queryClient.cancelQueries(['tasks', projectId]);
      const previous = queryClient.getQueryData(['tasks', projectId]);

      queryClient.setQueryData(['tasks', projectId], (old) =>
        old.map((t) => (t.id === taskId ? { ...t, ...updates } : t))
      );
      return { previous };
    },

    onError: (err, _, context) => {
      queryClient.setQueryData(['tasks', projectId], context.previous);
      toast.error('Update failed. Changes reverted.');
    },

    onSettled: () => queryClient.invalidateQueries(['tasks', projectId]),
  });
};`,
    legacyCode: `// Manual state, no cache, no rollback
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(false);

const updateTask = async (taskId, updates) => {
  setLoading(true);
  try {
    await api.patch(\`/tasks/\${taskId}\`, updates);
    const res = await api.get('/tasks');
    setTasks(res.data);
  } catch (err) {
    alert('Error updating task');
  } finally {
    setLoading(false);
  }
};`,
    highlights: [
      'Optimistic updates give instant UI feedback before server confirmation.',
      'Automatic rollback on error keeps data consistent without manual state handling.',
      'Query invalidation ensures all components sharing the key stay in sync.',
    ],
  },

  {
    uid: 'env-config-validation',
    title: 'Startup Environment Validation',
    summary: 'Zod-based config schema that crashes fast on missing env vars before the server ever binds.',
    lang: 'javascript',
    activeCode: `import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().regex(/^\d+$/).transform(Number),
  MONGO_URI: z.string().url(),
  JWT_KEY: z.string().min(32, 'JWT_KEY must be at least 32 characters'),
  S3_BUCKET: z.string().min(1),
  REDIS_URL: z.string().url(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment configuration:');
  parsed.error.issues.forEach(({ path, message }) => {
    console.error(\`  → \${path.join('.')}: \${message}\`);
  });
  process.exit(1);
}

export const config = parsed.data;`,
    legacyCode: `// Trusting process.env directly — silent failures at runtime
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const JWT_KEY = process.env.JWT_SECRET; // typo — undefined silently

mongoose.connect(MONGO_URI); // crashes at runtime, not startup
app.listen(PORT);            // NaN port — cryptic error`,
    highlights: [
      'Zod schema fails at process startup — not deep into a user request.',
      'Human-readable error output lists every missing or malformed variable.',
      'Exported config object replaces raw process.env access across the codebase.',
    ],
  },
  
];

const CodeCraftPage = () => {
  const [focusedSnippet, setFocusedSnippet] = useState(null);
  const layoutRoot = useRef(null);
  const cardElements = useRef([]);

  // Logic Refactor: Using a more robust ref setter
  const registerCard = useCallback((el, i) => {
    if (el) cardElements.current[i] = el;
  }, []);

  // GSAP: Advanced stagger and scroll logic
  useLayoutEffect(() => {
    const animationContext = gsap.context(() => {
      gsap.from(cardElements.current, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        stagger: 0.15,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: layoutRoot.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, layoutRoot);

    return () => {
      animationContext.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Accessibility: Keyboard listener
  useEffect(() => {
    const handleExit = (e) => e.key === 'Escape' && setFocusedSnippet(null);
    window.addEventListener('keydown', handleExit);
    return () => window.removeEventListener('keydown', handleExit);
  }, []);

  return (
    <main ref={layoutRoot} className="container mx-auto py-24 px-6 lg:px-12 bg-background">
      <Helmet>
        <title>Code Craft | Sadik Aslam</title>
        <meta name="description" content="A deep dive into high-performance patterns and software architecture by Sadik Aslam." />
        <meta property="og:site_name" content="Sadik Aslam" />
        <link rel="canonical" href="https://www.sadikaslam.in/codecraft" />
      </Helmet>
      {/* Narrative Header */}
      <header className="text-center mb-16">
        <motion.h1 
          className="text-5xl font-black tracking-tight text-primary uppercase"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          Code Craft
        </motion.h1>
        <motion.p 
          className="mt-6 text-lg text-secondary/80 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Engineering high-performance systems requires attention to detail. 
          Compare my production-ready patterns against standard implementations.
        </motion.p>
      </header>

      {/* Action Prompt */}
      <section className="mb-20">
        <Link to="/services" className="group block p-10 bg-zinc-50 border border-zinc-200 rounded-3xl text-center transition-all hover:shadow-2xl hover:border-primary/20">
          <h3 className="text-2xl font-black text-primary mb-3">Elevate Your Infrastructure</h3>
          <p className="text-secondary font-medium">Expert consulting and full-stack architecture. Your first session is complimentary.</p>
          <div className="mt-6 text-xs font-bold uppercase tracking-widest text-primary/40 group-hover:text-primary transition-colors">Explore Services &rarr;</div>
        </Link>
      </section>

      {/* Snippet Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {REPOSITORY_DATA.map((item, i) => (
          <article 
            key={item.uid}
            ref={(el) => registerCard(el, i)}
            className="flex flex-col bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
          >
            <div className="p-8 flex flex-col h-full">
              <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6 italic">"{item.summary}"</p>

              {/* Code Preview Node */}
              <div className="bg-[#0d1117] p-4 rounded-xl mb-8 overflow-hidden">
                <SyntaxHighlighter
                  language={item.lang}
                  style={atomDark}
                  customStyle={{ background: 'transparent', fontSize: '0.7rem', padding: 0 }}
                >
                  {item.activeCode.split('\n').slice(0, 5).join('\n')}
                </SyntaxHighlighter>
              </div>

              <div className="mt-auto pt-6 border-t border-zinc-50 flex items-center justify-between">
                <button 
                  onClick={() => setFocusedSnippet(item)}
                  className="px-6 py-2.5 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-lg hover:brightness-110 transition-all"
                >
                  Deep Dive
                </button>
                <Link to="/services" className="text-[10px] font-bold text-zinc-400 hover:text-primary transition-colors uppercase">Consult &rarr;</Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Comparison Modal Overlay */}
      <AnimatePresence>
        {focusedSnippet && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 sm:p-12">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-900/90 backdrop-blur-xl"
              onClick={() => setFocusedSnippet(null)}
            />
            
            <motion.div 
              initial={{ y: 50, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 50, scale: 0.95 }}
              className="relative bg-white w-full max-w-6xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 border-b flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-black text-primary">{focusedSnippet.title}</h2>
                  <p className="text-zinc-500 mt-1 font-medium italic">{focusedSnippet.summary}</p>
                </div>
                <button onClick={() => setFocusedSnippet(null)} className="text-3xl font-light hover:rotate-90 transition-transform">&times;</button>
              </div>

              <div className="p-10 overflow-y-auto space-y-10 scroll-smooth">
                {/* Visual Indicators */}
                <div className="flex gap-4">
                  <span className="flex items-center gap-2 px-4 py-1.5 bg-rose-50 border border-rose-100 text-rose-700 text-[10px] font-black uppercase rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" /> Legacy Pattern
                  </span>
                  <span className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-black uppercase rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Optimized Build
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <section>
                    <h4 className="text-xs font-black uppercase text-rose-600 mb-3 tracking-widest">Typical Implementation</h4>
                    <SyntaxHighlighter language={focusedSnippet.lang} style={atomDark} className="rounded-2xl !p-6 !bg-zinc-800 text-xs">
                      {focusedSnippet.legacyCode}
                    </SyntaxHighlighter>
                  </section>
                  <section>
                    <h4 className="text-xs font-black uppercase text-emerald-700 mb-3 tracking-widest">Engineered Solution</h4>
                    <SyntaxHighlighter language={focusedSnippet.lang} style={atomDark} className="rounded-2xl !p-6 !bg-zinc-900 text-xs shadow-inner">
                      {focusedSnippet.activeCode}
                    </SyntaxHighlighter>
                  </section>
                </div>

                <div className="pt-8 border-t border-zinc-100">
                  <h4 className="text-lg font-black text-primary mb-4">Architecture Rationale</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {focusedSnippet.highlights.map((note, idx) => (
                      <li key={idx} className="p-5 bg-zinc-50 rounded-xl text-sm text-zinc-600 leading-relaxed border-l-4 border-emerald-500">
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default CodeCraftPage;
