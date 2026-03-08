import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, BarChart3, ShoppingBag, CalendarDays, 
  LayoutTemplate, Filter, Bot, Zap, Layers,
  CheckCircle2, ArrowRight, ChevronRight, Menu, X
} from 'lucide-react';

// --- Data Models ---

const snapshotPillars = [
  { title: 'Mission', desc: 'Build a high-converting, automated dropshipping brand.' },
  { title: 'AI Core', desc: 'Leverage AI for product descriptions, support, and dynamic pricing.' },
  { title: 'Supplier Network', desc: 'Vetted, fast-shipping suppliers (US/EU focus).' },
  { title: 'Mobile-First', desc: 'Optimized for thumb-scrolling and fast mobile checkouts.' },
  { title: 'Paid Traffic Ready', desc: 'Pixel-perfect tracking for Meta, TikTok, and Google Ads.' },
  { title: 'Automated Ops', desc: 'Zero-touch order fulfillment and tracking updates.' }
];

const kpis = [
  { metric: '3%+', label: 'Conversion Rate', color: 'text-emerald-500' },
  { metric: '<1.8s', label: 'Page Load Time', color: 'text-blue-500' },
  { metric: '2.8×', label: 'Target ROAS', color: 'text-purple-500' },
  { metric: '45%', label: 'Cart Recovery', color: 'text-orange-500' },
  { metric: '40%+', label: 'Gross Margin', color: 'text-pink-500' }
];

const niches = [
  { name: 'Home & Decor', margin: '40-60%', strategy: 'High ticket, aesthetic focus. Pinterest & IG visual marketing.' },
  { name: 'Fitness & Gym', margin: '50-70%', strategy: 'Problem-solving gear. TikTok organic & influencer marketing.' },
  { name: 'Pet Supplies', margin: '45-65%', strategy: 'High emotional attachment. Subscription models for consumables.' },
  { name: 'Beauty & Skincare', margin: '60-80%', strategy: 'Before/after UGC. High repeat purchase rate.' },
  { name: 'Eco-Friendly', margin: '35-55%', strategy: 'Values-driven marketing. Premium pricing for sustainability.' },
  { name: 'Tech Gadgets', margin: '30-50%', strategy: 'Trend-driven. Fast product cycles. YouTube tech reviews.' },
  { name: 'Baby & Kids', margin: '40-60%', strategy: 'Safety and education focus. Mom-bloggers and Facebook groups.' },
  { name: 'Outdoor & Survival', margin: '45-65%', strategy: 'Passionate community. High AOV bundles.' }
];

const phases = [
  { week: 'Week 1', title: 'Niche & Supplier Validation', tasks: ['Market research', 'Competitor analysis', 'Supplier outreach'] },
  { week: 'Week 2', title: 'Brand Identity & Assets', tasks: ['Logo & typography', 'Color palette', 'Brand voice guidelines'] },
  { week: 'Week 3', title: 'Platform Setup', tasks: ['Shopify/Next.js init', 'Domain configuration', 'Payment gateways'] },
  { week: 'Week 4', title: 'Core Pages & UX', tasks: ['Homepage design', 'PDP templates', 'Navigation structure'] },
  { week: 'Week 5', title: 'Product Import & AI Copy', tasks: ['Import winning products', 'Generate AI descriptions', 'Pricing strategy'] },
  { week: 'Week 6', title: 'Conversion Optimization', tasks: ['Upsell funnels', 'Email flows (Klaviyo)', 'Reviews integration'] },
  { week: 'Week 7', title: 'Tracking & Analytics', tasks: ['Pixel installation', 'Google Analytics 4', 'Triple Whale setup'] },
  { week: 'Week 8', title: 'Launch & Scale', tasks: ['Soft launch', 'Ad campaign creation', 'Daily optimization'] }
];

const pageTypes = [
  'Homepage (Story & Best Sellers)', 'Product Detail Page (PDP)', 'Collection/Category Pages',
  'Slide-out Cart', 'Optimized Checkout', 'Order Confirmation', 'Track Order',
  'About Us', 'Contact / Support', 'FAQ', 'Returns Policy', 'Shipping Info',
  'Daily Deals / Flash Sales', 'Smart Search Results'
];

const funnelStages = [
  { stage: 'Impression', metric: 'CTR > 1.5%', desc: 'Ad creative & copy effectiveness' },
  { stage: 'Click', metric: 'Bounce < 40%', desc: 'Landing page relevance & load speed' },
  { stage: 'View Content', metric: 'ATC > 8%', desc: 'Product page persuasiveness' },
  { stage: 'Add to Cart', metric: 'IC > 50%', desc: 'Cart drawer UX & clear pricing' },
  { stage: 'Initiate Checkout', metric: 'PUR > 60%', desc: 'Frictionless checkout process' },
  { stage: 'Purchase', metric: 'Conv > 3%', desc: 'Overall funnel success' }
];

const aiRoles = [
  { type: 'Dev-Time (Google AI Studio)', items: ['Market research synthesis', 'Code generation (React/Tailwind)', 'SEO metadata generation', 'Initial product description drafting'] },
  { type: 'Live User-Facing (Gemini)', items: ['Smart search & recommendations', 'AI Customer Support Chatbot', 'Dynamic pricing optimization', 'Personalized email content generation'] }
];

const weapons = [
  'Dynamic Free Shipping Bar', 'Buy Now, Pay Later (BNPL)', 'Exit-Intent AI Popups',
  'Abandoned Cart SMS/Email', 'Sticky Add-to-Cart Button', 'Trust Badges & Security',
  'UGC Video Reviews', 'Frequently Bought Together', 'Countdown Timers (Scarcity)',
  'One-Click Upsells (Post-Purchase)'
];

const techStack = [
  { category: 'Frontend/Platform', tools: 'Shopify Plus or Next.js + Vercel' },
  { category: 'Sourcing', tools: 'DSers, Zendrop, or AutoDS' },
  { category: 'Marketing', tools: 'Klaviyo (Email/SMS), Meta Ads, TikTok Ads' },
  { category: 'Analytics', tools: 'Triple Whale, GA4, Microsoft Clarity' },
  { category: 'Customer Experience', tools: 'Loox (Reviews), AfterShip (Tracking), Gorgias (Support)' }
];

// --- Components ---

const SectionHeader = ({ title, icon: Icon, description }: { title: string, icon: any, description?: string }) => (
  <div className="mb-8 border-b border-slate-200 pb-6">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
        <Icon size={24} />
      </div>
      <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h2>
    </div>
    {description && <p className="text-slate-500 text-lg ml-12">{description}</p>}
  </div>
);

export default function App() {
  const [activeSection, setActiveSection] = useState('snapshot');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'snapshot', title: 'Project Snapshot', icon: Target },
    { id: 'kpis', title: 'Target KPIs', icon: BarChart3 },
    { id: 'niches', title: '8 Winning Niches', icon: ShoppingBag },
    { id: 'phases', title: '8 Build Phases', icon: CalendarDays },
    { id: 'pages', title: '14 Page Types', icon: LayoutTemplate },
    { id: 'funnel', title: 'Conversion Funnel', icon: Filter },
    { id: 'ai', title: 'AI & Gemini Roles', icon: Bot },
    { id: 'weapons', title: '10 Conversion Weapons', icon: Zap },
    { id: 'stack', title: 'Full Tech Stack', icon: Layers },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'snapshot':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <SectionHeader title="Project Snapshot" icon={Target} description="The 6 core pillars of our dropshipping strategy." />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {snapshotPillars.map((pillar, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{pillar.title}</h3>
                  <p className="text-slate-600">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'kpis':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <SectionHeader title="Target KPIs" icon={BarChart3} description="The metrics that define success." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {kpis.map((kpi, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center flex flex-col items-center justify-center h-40">
                  <span className={`text-4xl font-bold ${kpi.color} mb-2`}>{kpi.metric}</span>
                  <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">{kpi.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'niches':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <SectionHeader title="8 Winning Niches" icon={ShoppingBag} description="High-margin categories with proven demand." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {niches.map((niche, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{niche.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">{niche.strategy}</p>
                  </div>
                  <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 whitespace-nowrap text-center">
                    <span className="block text-xs text-slate-400 uppercase font-semibold">Margin</span>
                    <span className="font-mono font-medium text-slate-700">{niche.margin}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'phases':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <SectionHeader title="8 Build Phases" icon={CalendarDays} description="Week-by-week execution plan." />
            <div className="space-y-4">
              {phases.map((phase, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-6">
                  <div className="md:w-48 shrink-0">
                    <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-bold rounded-full mb-2">{phase.week}</span>
                    <h3 className="font-bold text-slate-900">{phase.title}</h3>
                  </div>
                  <div className="flex-1">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {phase.tasks.map((task, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2 text-slate-600">
                          <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-sm">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'pages':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <SectionHeader title="14 Page Types" icon={LayoutTemplate} description="Essential views for a complete e-commerce experience." />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {pageTypes.map((page, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3 hover:border-indigo-300 transition-colors cursor-default">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{page}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'funnel':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <SectionHeader title="Conversion Funnel" icon={Filter} description="Micro-metrics at every step of the customer journey." />
            <div className="max-w-3xl mx-auto">
              {funnelStages.map((stage, idx) => (
                <div key={idx} className="relative flex items-center mb-4 last:mb-0">
                  {/* Funnel visual representation */}
                  <div className="absolute left-0 w-full h-full bg-indigo-50 rounded-xl -z-10" 
                       style={{ width: `${100 - (idx * 12)}%`, marginLeft: `${idx * 6}%` }} />
                  
                  <div className="w-full flex items-center justify-between p-5 border border-slate-200 rounded-xl bg-white/80 backdrop-blur-sm"
                       style={{ width: `${100 - (idx * 12)}%`, marginLeft: `${idx * 6}%` }}>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{stage.stage}</h3>
                      <p className="text-sm text-slate-500">{stage.desc}</p>
                    </div>
                    <div className="bg-indigo-600 text-white px-3 py-1 rounded-lg font-mono text-sm font-bold shadow-sm whitespace-nowrap ml-4">
                      {stage.metric}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'ai':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <SectionHeader title="AI & Gemini Roles" icon={Bot} description="How we leverage AI throughout the lifecycle." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aiRoles.map((role, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">{role.type}</h3>
                  <ul className="space-y-3">
                    {role.items.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-3 text-slate-700">
                        <div className="p-1 bg-indigo-50 rounded text-indigo-600 mt-0.5">
                          <Zap size={14} />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'weapons':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <SectionHeader title="10 Conversion Weapons" icon={Zap} description="Tactics to maximize AOV and conversion rate." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {weapons.map((weapon, idx) => (
                <div key={idx} className="bg-gradient-to-br from-white to-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm shrink-0">
                    {idx + 1}
                  </div>
                  <span className="font-medium text-slate-800">{weapon}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'stack':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <SectionHeader title="Full Tech Stack" icon={Layers} description="The tools powering the operation." />
            <div className="space-y-3">
              {techStack.map((stack, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="sm:w-1/3">
                    <h3 className="font-bold text-slate-400 uppercase tracking-wider text-xs">{stack.category}</h3>
                  </div>
                  <div className="sm:w-2/3">
                    <p className="font-medium text-slate-900 text-lg">{stack.tools}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans flex flex-col md:flex-row">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <Target className="text-indigo-400" />
          <span className="font-bold text-lg tracking-tight">DropBlueprint</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-10 w-72 bg-slate-900 text-slate-300 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 hidden md:flex items-center gap-3 border-b border-slate-800">
          <div className="bg-indigo-500 p-2 rounded-lg">
            <Target className="text-white" size={24} />
          </div>
          <span className="font-bold text-xl text-white tracking-tight">DropBlueprint</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-3">Blueprint Sections</div>
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-left
                  ${isActive 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'hover:bg-slate-800 hover:text-white'
                  }
                `}
              >
                <Icon size={20} className={isActive ? 'text-indigo-200' : 'text-slate-400'} />
                <span className="font-medium">{section.title}</span>
                {isActive && <ChevronRight size={16} className="ml-auto opacity-50" />}
              </button>
            );
          })}
        </div>
        
        <div className="p-6 border-t border-slate-800">
          <div className="bg-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider">Status: Ready</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              All systems go. Follow the phases sequentially for optimal launch trajectory.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 h-screen overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6 md:p-12">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-0 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
