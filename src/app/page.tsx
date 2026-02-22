'use client';

export default function LandingPage() {
  const freePreviewUseCases = [
    {
      id: 1,
      title: "Autonomous Overnight Product Launch",
      category: "Product Development",
      description: "AI gets GitHub+Stripe+deploy access, builds and launches a product while you sleep. Wake up to live sales.",
      promptTeaser: "You are an autonomous product builder with access to GitHub, Stripe, and deployment tools..."
    },
    {
      id: 2,
      title: "Email Triage & AI Reply Drafting",
      category: "Productivity",
      description: "Connect Gmail OAuth. AI monitors inbox, flags urgent emails, drafts replies in your voice.",
      promptTeaser: "Monitor my Gmail inbox every 30 minutes. Flag urgent emails based on sender, subject, and content..."
    },
    {
      id: 3,
      title: "Nightly Memory Consolidation",
      category: "Knowledge Management",
      description: "2am cron reviews all conversations, extracts durable facts, updates PARA knowledge base. AI remembers everything tomorrow.",
      promptTeaser: "Review all conversations from the past 24 hours. Extract key facts, decisions, and insights..."
    },
    {
      id: 4,
      title: "Multi-Agent Coding Army",
      category: "Development",
      description: "Spawn parallel Claude Code agents in git worktrees for simultaneous features. One orchestrator, many workers.",
      promptTeaser: "You are the orchestrator for a multi-agent coding team. Analyze the project requirements..."
    },
    {
      id: 5,
      title: "Proactive Stripe Sales Reports",
      category: "Business Intelligence",
      description: "Heartbeat/cron hits Stripe API, messages you revenue update every few hours without you touching a dashboard.",
      promptTeaser: "Every 4 hours, fetch Stripe data for the past 24 hours. Calculate total revenue, number of transactions..."
    }
  ];

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          The OpenClaw Playbook
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl">
          30 curated AI automation use cases. Copy-paste prompts. Real tutorials. Start automating tonight.
        </p>

        {/* Free Preview Use Cases */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-purple-400">Free Preview: 5 Use Cases</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {freePreviewUseCases.map((useCase) => (
              <div 
                key={useCase.id}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-purple-600 transition-colors"
              >
                <div className="text-xs text-purple-400 font-semibold mb-2 uppercase tracking-wide">
                  {useCase.category}
                </div>
                <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{useCase.description}</p>
                <div className="bg-gray-950 border border-gray-800 rounded p-3 text-xs text-gray-500 font-mono">
                  {useCase.promptTeaser}
                </div>
              </div>
            ))}
            {/* Locked Placeholder */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 relative overflow-hidden opacity-60">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent"></div>
              <div className="relative z-10">
                <div className="text-xs text-gray-500 font-semibold mb-2 uppercase tracking-wide">
                  + 25 More Use Cases
                </div>
                <h3 className="text-xl font-bold mb-3">Unlock All 30</h3>
                <p className="text-gray-500 text-sm">
                  Get instant access to all 30 use cases with complete prompts, implementation guides, and real-world examples.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mb-20">
          <button
            onClick={handleCheckout}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-12 rounded-lg text-xl transition-colors shadow-lg shadow-purple-900/50"
          >
            Get All 30 Use Cases — $39
          </button>
          <p className="text-gray-500 text-sm mt-4">One-time payment. Instant access. No subscription.</p>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-purple-400">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">What do I get?</h3>
              <p className="text-gray-400">
                You get 30 complete AI automation use cases. Each includes a full description, copy-paste ready prompts, 
                implementation details, and real-world examples. Everything you need to start automating your workflows tonight.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Is this for developers?</h3>
              <p className="text-gray-400">
                These use cases range from beginner-friendly (no coding required) to advanced developer workflows. 
                Each use case clearly indicates technical requirements. If you can copy-paste and follow instructions, 
                you can use most of these automations.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">What's the refund policy?</h3>
              <p className="text-gray-400">
                If you're not satisfied within 30 days, email us for a full refund. No questions asked. 
                We stand behind the quality of this playbook.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 mt-20 py-8 text-center text-gray-500 text-sm">
        <p>&copy; 2026 The OpenClaw Playbook. All rights reserved.</p>
      </div>
    </div>
  );
}
