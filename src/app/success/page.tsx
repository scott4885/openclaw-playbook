'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UseCase {
  id: number;
  title: string;
  category: string;
  description: string;
  prompt: string;
  tools?: string[];
}

const allUseCases: UseCase[] = [
  {
    id: 1,
    title: "Autonomous Overnight Product Launch",
    category: "Product Development",
    description: "AI gets GitHub+Stripe+deploy access, builds and launches a product while you sleep. Wake up to live sales. Grant your AI agent access to GitHub (repo creation, code push), Stripe (product + price setup), and deployment (Netlify/Vercel). Give it a product idea and let it build the entire stack overnight.",
    prompt: `You are an autonomous product builder with full access to GitHub, Stripe, and deployment tools.

**Your mission:** Build and launch a complete product by morning.

**Steps:**
1. Create a new GitHub repository for the product
2. Build a landing page with:
   - Hero section with clear value proposition
   - Feature highlights
   - Pricing section
   - Stripe checkout integration
3. Set up Stripe product and pricing ($X one-time payment)
4. Implement checkout flow and success page
5. Deploy to Netlify/Vercel
6. Test the complete purchase flow
7. Send me a summary with live URL and first sale notification setup

**Requirements:**
- Use Next.js 14 + Tailwind for fast development
- Mobile-responsive design
- Working Stripe integration
- Deployed and live by 6am

**Tools available:** GitHub API, Stripe API, Netlify/Vercel CLI

Start now. Don't ask for permission on design choices—just ship.`,
    tools: ["GitHub", "Stripe", "Netlify/Vercel", "Next.js"]
  },
  {
    id: 2,
    title: "Email Triage & AI Reply Drafting",
    category: "Productivity",
    description: "Connect Gmail OAuth. AI monitors inbox, flags urgent emails, drafts replies in your voice. Set up OAuth access to your Gmail, then configure a heartbeat or cron to check every 30 minutes. AI analyzes incoming emails, prioritizes them, and drafts contextual replies based on your writing style.",
    prompt: `Monitor my Gmail inbox every 30 minutes. Flag urgent emails based on sender, subject, and content patterns.

**For each email, determine:**
1. **Urgency level:** Critical / High / Normal / Low
2. **Category:** Client / Team / Sales / Administrative / Newsletter
3. **Action needed:** Reply / Forward / Archive / Flag for review

**For emails requiring replies:**
- Draft a response in my voice (analyze my sent emails to learn my style)
- Include key points I should address
- Suggest 2-3 alternative tones (professional / friendly / brief)

**Notification format:**
Send me a digest every 2 hours with:
- 🔴 Critical emails (immediate attention)
- 🟡 High priority (reply today)
- ✅ Handled (auto-archived newsletters, etc.)

**Tools:** Gmail API (OAuth), sentiment analysis, pattern recognition

If an email matches urgent criteria (client escalation, time-sensitive request, executive sender), notify immediately via Telegram.`,
    tools: ["Gmail API", "OAuth", "Telegram", "Heartbeat/Cron"]
  },
  {
    id: 3,
    title: "Nightly Memory Consolidation",
    category: "Knowledge Management",
    description: "2am cron reviews all conversations, extracts durable facts, updates PARA knowledge base. AI remembers everything tomorrow. Schedule a daily 2am cron job that reviews all chat logs, extracts key decisions and facts, then updates your long-term memory files (MEMORY.md, project notes, decision logs).",
    prompt: `Run at 2:00 AM daily. Review all conversations and activities from the past 24 hours.

**Extract and categorize:**

**🧠 Durable Facts:**
- Personal preferences discovered
- Important decisions made
- New contacts/relationships
- Skills learned or improved

**📊 Project Updates:**
- Progress on active projects
- Blockers identified
- Next steps defined
- Deadlines approaching

**💡 Insights & Patterns:**
- Recurring themes in conversations
- New interests or goals mentioned
- Habit changes
- Areas needing attention

**Process:**
1. Read all conversation logs from past 24h
2. Extract significant events (ignore small talk)
3. Update MEMORY.md with new durable facts
4. Update project-specific notes in relevant directories
5. Flag any action items that weren't completed
6. Generate a brief overnight summary for morning review

**Output location:**
- MEMORY.md (append new facts)
- memory/YYYY-MM-DD.md (daily log)
- Project-specific files as needed

This ensures continuity across sessions—you remember everything important.`,
    tools: ["Cron", "File system", "Memory management"]
  },
  {
    id: 4,
    title: "Multi-Agent Coding Army",
    category: "Development",
    description: "Spawn parallel Claude Code agents in git worktrees for simultaneous features. One orchestrator, many workers. Create multiple git worktrees for parallel development, then spawn a subagent for each feature. The orchestrator coordinates work and merges results.",
    prompt: `You are the orchestrator for a multi-agent coding team. Analyze the project requirements and break them into parallel workstreams.

**Setup:**
1. Create git worktrees for each feature branch:
   - \`git worktree add ../feature-1 -b feature-1\`
   - \`git worktree add ../feature-2 -b feature-2\`
   - etc.

2. Spawn a Claude Code subagent for each workstream:
   - Each agent works in isolation in its own worktree
   - Provide clear, bounded instructions
   - Set a completion signal (file or status marker)

**Example parallel tasks:**
- Agent 1: Build authentication system
- Agent 2: Create dashboard UI
- Agent 3: Set up database schema
- Agent 4: Write API endpoints

**Orchestrator responsibilities:**
- Monitor agent progress (check for completion signals)
- Resolve merge conflicts
- Run integration tests after merging
- Coordinate dependencies (if Agent 3 must finish before Agent 4)

**Completion:**
Once all agents signal done:
1. Merge feature branches in dependency order
2. Run full test suite
3. Create summary PR with all changes
4. Report final status

**Tools:** git worktree, subagent spawning, Claude Code CLI`,
    tools: ["Git worktrees", "Subagents", "Claude Code"]
  },
  {
    id: 5,
    title: "Proactive Stripe Sales Reports",
    category: "Business Intelligence",
    description: "Heartbeat/cron hits Stripe API, messages you revenue update every few hours without you touching a dashboard. Configure a heartbeat check or cron job that pulls Stripe data and sends you formatted revenue updates automatically.",
    prompt: `Every 4 hours, fetch Stripe data for the past 24 hours. Calculate total revenue, number of transactions, and top products.

**Metrics to track:**
1. **Revenue:**
   - Total (past 24h, past 7d, past 30d)
   - Growth vs. previous period
   - Average transaction value

2. **Transactions:**
   - Successful payments
   - Failed payments (with failure reasons)
   - Refunds issued

3. **Products:**
   - Best sellers
   - Revenue by product
   - New vs. returning customers

**Report format (send via Telegram):**

\`\`\`
💰 Stripe Sales Report
━━━━━━━━━━━━━━━━━━━━
📊 Past 24 hours:
   Revenue: $XXX (+X% vs prev 24h)
   Orders: XX
   Avg order: $XX

🏆 Top product: [Product Name] ($XXX)

⚠️ Issues:
   - X failed payments
   - X refunds ($XX total)

📈 7-day trend: [▁▂▃▅▆▇█]
\`\`\`

**Alert triggers:**
- Revenue spike (>50% increase)
- High failure rate (>10%)
- First sale of new product
- Refund requested

**Tools:** Stripe API, cron/heartbeat, Telegram notification`,
    tools: ["Stripe API", "Heartbeat", "Telegram"]
  },
  {
    id: 6,
    title: "Schedule Optimization",
    category: "Healthcare Operations",
    description: "Healthcare/dental open slot filling, provider utilization tracking, proactive patient scheduling. Monitor appointment scheduling systems, identify open slots, and proactively reach out to patients who need appointments. Track provider utilization and flag inefficiencies.",
    prompt: `You are a healthcare scheduling optimizer. Monitor appointment calendars and maximize provider utilization.

**Data sources:**
- Practice management system API (or scrape scheduling portal)
- Patient lists with last visit dates
- Provider schedules and availability

**Tasks:**

1. **Open Slot Detection:**
   - Scan calendars for gaps >30min
   - Identify patterns (Mondays 2-4pm always empty)
   - Calculate opportunity cost of empty slots

2. **Patient Outreach:**
   - Find patients overdue for appointments (last visit >6mo ago)
   - Match patient needs to open slots
   - Generate outreach messages: "Hi [Name], you're due for your checkup. Dr. [X] has availability on [Date] at [Time]. Reply YES to book."

3. **Provider Utilization:**
   - Calculate % of available hours booked
   - Flag providers with <70% utilization
   - Suggest schedule adjustments

4. **Proactive Scheduling:**
   - For patients with standing appointments (cleanings every 6mo), auto-schedule next visit
   - Send confirmation requests

**Output:**
- Daily report: X open slots, Y outreach messages sent, Z bookings made
- Weekly provider utilization dashboard
- Revenue recovered from filled slots

**Tools:** Calendar APIs, SMS/email for outreach, analytics`,
    tools: ["Calendar API", "SMS/Email", "Analytics"]
  },
  {
    id: 7,
    title: "Research & Competitive Intelligence",
    category: "Business Intelligence",
    description: "Multi-source web research → structured report with executive summary. Give the AI a research topic, and it searches multiple sources, synthesizes findings, and delivers a formatted report with citations.",
    prompt: `Conduct comprehensive research on: [TOPIC]

**Research process:**

1. **Information gathering:**
   - Web search (news, academic, industry sources)
   - Competitor websites and marketing materials
   - Social media sentiment
   - Recent funding/acquisition announcements

2. **Analysis:**
   - Identify key trends
   - Compare competitors (features, pricing, positioning)
   - Extract quantitative data (market size, growth rates)
   - Note expert opinions and predictions

3. **Synthesis:**
   - What are the 3-5 most important findings?
   - What opportunities exist?
   - What risks should be considered?
   - What's missing from current solutions?

**Deliverable format:**

**Executive Summary** (3-4 sentences)

**Key Findings:**
1. [Finding with data/citation]
2. [Finding with data/citation]
3. [Finding with data/citation]

**Competitive Landscape:**
| Company | Strengths | Weaknesses | Pricing |
|---------|-----------|------------|---------|
| ...     | ...       | ...        | ...     |

**Opportunities:**
- [Opportunity 1]
- [Opportunity 2]

**Recommendations:**
- [Action item 1]
- [Action item 2]

**Sources:** [List of URLs and citations]

**Tools:** Web search, web scraping, data extraction`,
    tools: ["Web search", "Web scraping", "Data extraction"]
  },
  {
    id: 8,
    title: "Content Creation Pipeline",
    category: "Marketing",
    description: "Topic → SEO outline → full draft → formatted for platform → scheduled. Automate the entire content creation workflow from ideation to publication.",
    prompt: `Create a complete blog post on: [TOPIC]

**Pipeline:**

1. **SEO Research:**
   - Search for top-ranking content on this topic
   - Extract common keywords and phrases
   - Identify content gaps (questions not answered)
   - Determine ideal word count (based on top 10 results)

2. **Outline creation:**
   - H1: [Compelling headline with keyword]
   - H2: Introduction (hook + what reader will learn)
   - H2: [Main section 1]
     - H3: [Subsection]
     - H3: [Subsection]
   - H2: [Main section 2]
   - H2: [Main section 3]
   - H2: Conclusion (summary + CTA)

3. **Draft writing:**
   - Conversational tone, 8th-grade readability
   - Short paragraphs (2-3 sentences max)
   - Include examples and data
   - Natural keyword integration (no stuffing)

4. **Formatting:**
   - Add bullet points and numbered lists
   - Bold key phrases
   - Include [IMAGE PLACEHOLDER] where visuals would help
   - Add internal link suggestions

5. **Meta data:**
   - SEO title (60 chars max)
   - Meta description (155 chars max)
   - Suggested slug

**Deliverable:**
- Full markdown draft
- SEO metadata
- Publishing checklist (images needed, links to add, etc.)

**Optional:** If publishing API available, schedule post for [DATE/TIME]`,
    tools: ["Web search", "SEO tools", "CMS API"]
  },
  {
    id: 9,
    title: "Social Media Reply Monitoring",
    category: "Social Media",
    description: "Track @mentions, replies, engagement. Alert on important interactions. Monitor your social media accounts and notify you of important engagements that need responses.",
    prompt: `Monitor my social media accounts for @mentions, replies, and important engagement.

**Platforms to track:**
- Twitter/X
- LinkedIn
- Instagram
- Facebook

**What to flag:**

🔴 **High priority (immediate notification):**
- Mentions from verified accounts or influencers
- Customer complaints or negative sentiment
- Direct questions that need answers
- Engagement from target accounts (prospects, partners)

🟡 **Medium priority (daily digest):**
- Positive mentions and testimonials
- General questions
- Comment threads with >10 replies
- Mentions from accounts with >10k followers

🟢 **Low priority (weekly summary):**
- Generic engagement (likes, retweets)
- Bot/spam mentions
- Off-topic conversations

**For each flagged item, provide:**
- Platform and post link
- User info (follower count, verification status)
- Sentiment analysis (positive/neutral/negative)
- Suggested reply (3 options: professional, casual, humorous)
- Context (why this matters)

**Automation:**
- Auto-like positive mentions
- Auto-hide spam/abusive comments
- Track response rate and average response time

**Digest format:**
Send via Telegram every 4 hours with summary and links to respond.

**Tools:** Twitter API, LinkedIn API, social monitoring tools`,
    tools: ["Twitter API", "LinkedIn API", "Social monitoring"]
  },
  {
    id: 10,
    title: "Meeting Transcript Injection",
    category: "Knowledge Management",
    description: "Teams/Zoom VTT file → parse → key decisions/actions → inject into AI memory. After every meeting, automatically process the transcript and update your knowledge base with decisions and action items.",
    prompt: `Process meeting transcript and extract actionable intelligence.

**Input:** Meeting transcript file (VTT, TXT, or direct paste)

**Extract:**

1. **Meeting metadata:**
   - Date and time
   - Participants
   - Duration
   - Meeting topic/title

2. **Key decisions made:**
   - What was decided?
   - Who made the decision?
   - Any dissenting opinions?

3. **Action items:**
   - Task description
   - Assigned to whom
   - Deadline (if mentioned)
   - Dependencies

4. **Important information:**
   - New facts learned
   - Numbers/metrics discussed
   - Follow-up meetings scheduled
   - Resources mentioned (links, docs, tools)

5. **Open questions:**
   - What remains unresolved?
   - What needs more research?

**Output format:**

**Meeting: [Title]**
**Date:** [Date]
**Participants:** [Names]

**Decisions:**
✅ [Decision 1]
✅ [Decision 2]

**Action Items:**
- [ ] [Task 1] (@person, due [date])
- [ ] [Task 2] (@person, due [date])

**Key Information:**
- [Fact 1]
- [Fact 2]

**Open Questions:**
- [Question 1]
- [Question 2]

**Next steps:** [Summary]

---

**Inject this summary into:**
1. MEMORY.md (durable facts and decisions)
2. Project-specific notes
3. Calendar (create action item reminders)

**Tools:** VTT parser, NLP extraction, file system`,
    tools: ["Transcript parsing", "NLP", "File system"]
  },
  {
    id: 11,
    title: "Calendar Intelligence",
    category: "Productivity",
    description: "Parse .ics meeting invites → build prep brief → flag conflicts → remind 30min before. Automatically analyze your calendar and help you prepare for meetings.",
    prompt: `Monitor my calendar and provide intelligent meeting preparation.

**For each upcoming meeting:**

1. **Conflict detection:**
   - Check for double-bookings
   - Flag back-to-back meetings with no break
   - Identify travel time conflicts (meeting at different locations)

2. **Preparation brief:**
   - Meeting title and time
   - Participants (with LinkedIn context if available)
   - Agenda (from invite or email thread)
   - Relevant files/emails (search for participant names + meeting topic)
   - Previous meeting notes (if recurring meeting)

3. **Pre-meeting checklist:**
   - Materials to review
   - Questions to prepare
   - Tech check (Zoom link working? Presentation ready?)

4. **Reminder schedule:**
   - 24h before: Send prep brief
   - 30min before: "Your meeting with [X] starts in 30 minutes. Key points: [...]"
   - 5min before: "Meeting starting soon. Join link: [URL]"

**Daily digest (8am):**
📅 **Today's schedule:**

9:00 AM - Team standup (Zoom)
- No prep needed, recurring check-in

10:30 AM - Client presentation (In person at [Location])
⚠️ **Action needed:**
- Review proposal deck
- Leave by 10:00 AM (20min drive)
- Bring laptop + charger

2:00 PM - Interview: [Candidate name]
📋 **Prep brief:**
- Resume: [link]
- Questions to ask: [list]
- Scorecard: [link]

**Tools:** Calendar API (.ics parsing), email search, LinkedIn API`,
    tools: ["Calendar API", "Email", "LinkedIn"]
  },
  {
    id: 12,
    title: "Customer Support Bot",
    category: "Customer Service",
    description: "Train on docs/policies → answer questions → escalate complex cases. Build a customer support AI that handles common questions and escalates when needed.",
    prompt: `You are a customer support AI trained on our documentation and policies.

**Knowledge base:**
- Product documentation
- FAQ
- Return/refund policies
- Troubleshooting guides
- Known issues and workarounds

**Interaction flow:**

1. **Greet customer:**
   "Hi! I'm here to help. What can I assist you with today?"

2. **Understand the issue:**
   - Ask clarifying questions
   - Identify issue category (billing, technical, shipping, etc.)
   - Check if this is a known issue

3. **Provide solution:**
   - Search knowledge base for answer
   - Provide step-by-step instructions
   - Include relevant links to docs
   - Offer alternative solutions if available

4. **Escalation triggers:**
   🔴 **Escalate to human if:**
   - Customer is angry/frustrated (sentiment analysis)
   - Issue is not in knowledge base
   - Security/account access issue
   - Refund >$100 requested
   - Problem not resolved after 3 attempts

5. **Follow-up:**
   - "Did this solve your problem?" (thumbs up/down)
   - If unresolved, escalate or suggest next steps
   - Log interaction for training

**Escalation handoff:**
When escalating, provide human agent with:
- Customer info and history
- Issue summary
- Solutions already attempted
- Suggested next steps

**Metrics to track:**
- Resolution rate (% solved without escalation)
- Average response time
- Customer satisfaction score
- Top issues (for doc improvement)

**Tools:** Knowledge base search, sentiment analysis, ticketing system API`,
    tools: ["Knowledge base", "Sentiment analysis", "Ticketing system"]
  },
  {
    id: 13,
    title: "Data Analysis & Executive Reporting",
    category: "Business Intelligence",
    description: "CSV/Excel input → AI analysis → insights → formatted executive summary. Upload a dataset and get an instant analysis with visualizations and recommendations.",
    prompt: `Analyze this dataset and provide executive-level insights.

**Input:** [CSV/Excel file or paste data]

**Analysis steps:**

1. **Data exploration:**
   - How many rows/columns?
   - What time period does this cover?
   - Any missing or invalid data?
   - Key metrics present (revenue, users, transactions, etc.)

2. **Descriptive statistics:**
   - Summary stats (mean, median, min, max)
   - Identify outliers
   - Spot trends over time

3. **Key insights:**
   - What's the story this data tells?
   - What's working well?
   - What's concerning?
   - Any unexpected patterns?

4. **Comparisons:**
   - Period over period (MoM, YoY)
   - Segment performance (if applicable)
   - Benchmark against industry standards (if known)

5. **Visualizations:**
   (Describe charts that would be useful)
   - Time series: [Metric over time]
   - Bar chart: [Comparison]
   - Pie chart: [Distribution]

**Executive summary format:**

**📊 Data Analysis Report**
**Period:** [Date range]
**Records analyzed:** [X]

**🎯 Key findings:**
1. [Most important insight with number]
2. [Second insight]
3. [Third insight]

**📈 Performance:**
- [Metric 1]: $X (+Y% vs last period)
- [Metric 2]: X units (-Y% vs last period)

**⚠️ Concerns:**
- [Issue 1]
- [Issue 2]

**💡 Recommendations:**
1. [Action based on data]
2. [Action based on data]

**Next steps:**
- [Follow-up analysis needed]
- [Data to collect]

**Tools:** Data analysis libraries, statistical analysis`,
    tools: ["Data analysis", "Statistics", "Visualization"]
  },
  {
    id: 14,
    title: "Deployment Pipeline Monitor",
    category: "DevOps",
    description: "git push → build → HTTP verify → notify success/failure → auto-rollback on fail. Monitor your deployment pipeline and handle failures automatically.",
    prompt: `Monitor the deployment pipeline and handle failures gracefully.

**Pipeline stages to monitor:**

1. **Code push detected** (webhook from GitHub)
   - Log: "Deployment started for commit [hash]"
   - Track: Deployment ID, timestamp, branch

2. **Build phase:**
   - Monitor build logs
   - Track build time
   - Detect build failures (exit codes, error keywords)

3. **Deployment:**
   - Confirm deployment to staging/production
   - Verify deployment ID matches build

4. **Health checks:**
   - HTTP GET to [URL]/health or main page
   - Expected: 200 status code
   - Check response time (<2s)
   - Verify key elements present (API endpoints, database connectivity)

5. **Verification:**
   - Run smoke tests (critical user flows)
   - Check error rates in logs
   - Monitor first 5 minutes for spikes in errors

**Success notification:**
\`\`\`
✅ Deployment successful
Commit: [hash] by [author]
Build time: [X]s
Deployed to: [production URL]
Health check: PASSED
\`\`\`

**Failure handling:**
If any check fails:

🚨 **Immediate actions:**
1. Notify via Telegram: "Deployment FAILED at [stage]"
2. Include error logs
3. Auto-rollback to last known good deployment
4. Verify rollback successful
5. Create incident report

**Auto-rollback process:**
- Identify last successful deployment
- Trigger rollback via deployment API
- Run health checks on rolled-back version
- Confirm rollback success

**Metrics to track:**
- Deployment frequency
- Success rate
- Average deploy time
- Mean time to recovery (MTTR)

**Tools:** GitHub webhooks, deployment API, HTTP monitoring, log analysis`,
    tools: ["GitHub webhooks", "Deployment API", "HTTP monitoring"]
  },
  {
    id: 15,
    title: "Lead Generation Pipeline",
    category: "Sales",
    description: "Scrape targets, AI qualification scoring, CRM-ready export. Automatically find and qualify leads based on your criteria.",
    prompt: `Build a qualified lead list for: [TARGET MARKET]

**Step 1: Lead sourcing**

Find companies/contacts matching:
- Industry: [e.g., dental practices, SaaS companies, etc.]
- Location: [geographic area]
- Size: [employee count or revenue range]
- Technology used: [specific tools/platforms]

**Sources:**
- LinkedIn search
- Company directories
- Industry associations
- Web scraping (company websites)
- Social media

**Step 2: Data collection**

For each lead, gather:
- Company name
- Website
- Contact person (decision maker)
- Email address (or pattern)
- Phone number
- LinkedIn profile
- Company size
- Tech stack (if relevant)
- Recent news/funding

**Step 3: Qualification scoring**

Score each lead (0-100) based on:
- **Fit:** Do they match ideal customer profile? (40 points)
- **Intent:** Signs they're looking for solutions? (30 points)
- **Reachability:** Valid email/phone? Active on LinkedIn? (20 points)
- **Timing:** Recent trigger events (funding, hiring, news)? (10 points)

**Step 4: Enrichment**

For high-scoring leads (>70):
- Find more contacts at the company
- Identify pain points (from website, reviews, social)
- Suggest personalized outreach angle
- Draft intro email

**Output format:**

CSV with columns:
| Company | Contact | Email | Score | Pain Points | Outreach Angle |
|---------|---------|-------|-------|-------------|----------------|
| ...     | ...     | ...   | 85    | ...         | ...            |

**Deliverable:**
- scored_leads.csv
- Top 20 leads with personalized outreach drafts
- Summary: X leads found, Y qualified, Z ready for outreach

**Tools:** Web scraping, LinkedIn API, email finder tools, CRM`,
    tools: ["Web scraping", "LinkedIn", "Email finder", "CRM"]
  },
  {
    id: 16,
    title: "Crypto Price Alerting",
    category: "Finance",
    description: "Monitor price thresholds, send alerts, optional auto-execute on signal. Track crypto prices and execute trades based on your rules.",
    prompt: `Monitor cryptocurrency prices and execute my trading strategy.

**Assets to track:**
- [BTC, ETH, SOL, etc.]

**Alert rules:**

1. **Price thresholds:**
   - Alert if BTC > $X or < $Y
   - Alert if ETH drops >10% in 1 hour
   - Alert if [COIN] reaches new ATH

2. **Market conditions:**
   - Volume spike (>2x average)
   - Volatility spike (>5% in 15min)
   - Major news detected (scan crypto news sources)

3. **Portfolio alerts:**
   - Total portfolio value > $X or < $Y
   - Any holding down >15% from purchase price
   - Rebalancing needed (allocation drift >10%)

**Notification format:**

\`\`\`
🚨 Price Alert
BTC: $X,XXX (+5.2% in 1h)
Trigger: Above $X threshold

Current portfolio value: $XX,XXX
24h change: +$X,XXX (+3.1%)

Action suggested: [Based on strategy]
\`\`\`

**Optional: Auto-execute trades**

⚠️ **High risk - only enable if you trust the strategy!**

If enabled, execute trades when:
- Price hits predefined buy/sell points
- Technical indicators trigger (RSI, MACD, etc.)
- Stop-loss activated

**Safety rails:**
- Max trade size: [% of portfolio]
- Daily trade limit: [number]
- Require confirmation for trades >$X
- Never trade more than X% of holdings

**Data sources:**
- Exchange APIs (Coinbase, Binance, etc.)
- Price feeds (CoinGecko, CoinMarketCap)
- News aggregators (CryptoPanic, Twitter)

**Tools:** Exchange APIs, price feeds, trading bots`,
    tools: ["Exchange APIs", "Price feeds", "Trading bots"]
  },
  {
    id: 17,
    title: "LinkedIn Pre-Meeting Intelligence",
    category: "Sales & Networking",
    description: "Research person + company → build meeting prep brief automatically. Before every meeting, get a dossier on who you're meeting with.",
    prompt: `Create a meeting preparation brief for: [PERSON NAME] at [COMPANY]

**Research steps:**

1. **Person intel (LinkedIn, Twitter, etc.):**
   - Current role and tenure
   - Career history (previous companies/roles)
   - Education
   - Shared connections
   - Recent posts/activity (what are they talking about?)
   - Interests and hobbies (from bio/posts)

2. **Company intel:**
   - What does the company do? (in simple terms)
   - Company size and growth
   - Recent news (funding, product launches, hiring)
   - Key competitors
   - Tech stack (if relevant)
   - Culture signals (Glassdoor, LinkedIn posts)

3. **Relationship mapping:**
   - How are we connected? (mutual connections)
   - Have we interacted before? (search email/CRM)
   - Any shared interests or background?

4. **Context for this meeting:**
   - Why are we meeting? (from calendar invite)
   - What do they likely want?
   - What do I want from this meeting?

**Prep brief format:**

**Meeting Prep: [Person] @ [Company]**
**Time:** [Date/Time]
**Meeting type:** [Sales call, networking, interview, etc.]

**👤 About [Person]:**
- Role: [Title] at [Company] (X years)
- Background: [Previous role] at [Previous company]
- Shared connections: [Names]
- Recent activity: [e.g., "Posted about AI adoption challenges"]
- Interests: [e.g., "Runs marathons, interested in edtech"]

**🏢 About [Company]:**
- What they do: [Elevator pitch]
- Size: [Employees/Revenue]
- Recent news: [e.g., "Raised $10M Series A last month"]
- Pain points: [Based on industry/news]

**🎯 Meeting strategy:**
- Their likely goal: [What they want]
- My goal: [What I want]
- Talking points:
  1. [Topic 1 - mention shared interest]
  2. [Topic 2 - reference their recent post]
  3. [Topic 3 - address their pain point]
- Questions to ask: [3-5 thoughtful questions]

**✅ Pre-meeting checklist:**
- [ ] Review their LinkedIn
- [ ] Read their recent posts
- [ ] Check our CRM for history
- [ ] Prepare demo/materials
- [ ] Test Zoom link

**Tools:** LinkedIn API, web search, CRM integration`,
    tools: ["LinkedIn", "Web search", "CRM"]
  },
  {
    id: 18,
    title: "PR Review Army",
    category: "Development",
    description: "Spawn one Claude Code agent per pull request in parallel git worktrees. Automatically review all open PRs with AI assistance.",
    prompt: `Review all open pull requests in parallel using multi-agent workflow.

**Setup:**

1. Fetch all open PRs from GitHub
2. For each PR, create a git worktree:
   \`git worktree add ../pr-[NUMBER] [BRANCH]\`
3. Spawn a Claude Code subagent for each PR

**Each agent's review task:**

**PR #[X]: [Title]**
Author: [Name]
Files changed: [Count]

**Review checklist:**

1. **Code quality:**
   - Are functions well-named and focused?
   - Is there duplicated code?
   - Are there any code smells?
   - Is error handling adequate?

2. **Testing:**
   - Are there tests for new functionality?
   - Do existing tests still pass?
   - Edge cases covered?

3. **Security:**
   - Any exposed secrets or credentials?
   - Input validation present?
   - SQL injection or XSS vulnerabilities?

4. **Performance:**
   - Any obvious performance issues?
   - Database queries optimized?
   - Unnecessary loops or operations?

5. **Style & conventions:**
   - Follows project style guide?
   - Consistent with existing code?
   - Comments where needed?

**Review format:**

\`\`\`
**Summary:** [One sentence - approve, request changes, or comment]

**Strengths:**
- [Positive note 1]
- [Positive note 2]

**Issues found:**
🔴 **Critical:**
- [Issue that must be fixed]

🟡 **Suggestions:**
- [Nice to have improvements]

**Specific feedback:**
[File: path/to/file.ts, Line 42]
- [Comment about specific code]

**Verdict:** ✅ APPROVE | ⚠️ REQUEST CHANGES | 💬 COMMENT
\`\`\`

**Orchestrator:** Collect all reviews and post them to their respective PRs as comments.

**Tools:** GitHub API, git worktrees, subagents, Claude Code`,
    tools: ["GitHub API", "Git worktrees", "Subagents"]
  },
  {
    id: 19,
    title: "Custom Heartbeat Configuration",
    category: "Automation",
    description: "Design your own check cadence, priorities, alert routing rules. Create a custom heartbeat system tailored to your workflow.",
    prompt: `I want to set up a custom heartbeat system. Here's what I want it to check:

**Heartbeat schedule:** Every [X] minutes

**Checks to perform (rotate through these):**

1. **Email check** (every 30min)
   - Flag urgent emails
   - Draft replies for important messages
   - Archive newsletters

2. **Calendar check** (every 2 hours)
   - Upcoming meetings in next 4 hours
   - Prep briefs for tomorrow's meetings
   - Flag conflicts

3. **Project status** (every 4 hours)
   - Check GitHub for new issues/PRs
   - Monitor deployment status
   - Review analytics dashboards

4. **Business metrics** (daily at 9am)
   - Stripe revenue
   - User signups
   - Key metric dashboards

5. **News monitoring** (daily at 8am)
   - Industry news on [topics]
   - Competitor updates
   - Market trends

**Alert routing:**

🔴 **Immediate (Telegram):**
- Critical emails (from VIPs, clients)
- Deployment failures
- Revenue anomalies
- Security alerts

🟡 **Digest (every 4 hours):**
- Normal priority emails
- Upcoming meetings
- PR reviews needed
- Non-critical issues

🟢 **Daily summary (8am):**
- Overnight activity
- Metrics dashboard
- News roundup
- Today's schedule

**State tracking:**

Create \`heartbeat-state.json\`:
\`\`\`json
{
  "lastChecks": {
    "email": [timestamp],
    "calendar": [timestamp],
    "projects": [timestamp],
    "metrics": [timestamp],
    "news": [timestamp]
  },
  "nextScheduled": {
    "email": [timestamp],
    "calendar": [timestamp]
  }
}
\`\`\`

**Heartbeat response:**

If nothing urgent: \`HEARTBEAT_OK\`

If action needed: Send notification with summary and next steps.

**Proactive work (if nothing urgent):**
- Update MEMORY.md from recent activity
- Organize project files
- Clean up old logs
- Commit and push documentation updates

**Configuration:** Store in \`HEARTBEAT.md\` so I can edit the checklist easily.

**Tools:** File system, APIs, Telegram, state management`,
    tools: ["State management", "Telegram", "File system"]
  },
  {
    id: 20,
    title: "Voice-to-Action Pipeline",
    category: "Productivity",
    description: "Voice message → Whisper transcription → structured task → executed immediately. Send a voice message and have it transcribed and executed.",
    prompt: `Process voice messages and execute tasks immediately.

**Input:** Voice message (audio file or voice note)

**Pipeline:**

1. **Transcription (Whisper API):**
   - Convert audio to text
   - Detect language
   - Clean up transcription (remove filler words like "um", "uh")

2. **Intent detection:**
   Classify the request:
   - ✉️ Email: "Send an email to..."
   - 📅 Calendar: "Schedule a meeting..."
   - 📝 Note: "Remember that..."
   - 🔍 Search: "Look up..."
   - ⚙️ Task: "Create a task to..."
   - ❓ Question: "What's the status of..."

3. **Entity extraction:**
   Pull out key information:
   - Who: Names, email addresses
   - What: Task description, subject line
   - When: Dates, times, deadlines
   - Where: Locations, URLs

4. **Confirmation (if needed):**
   For high-stakes actions (sending emails, scheduling), confirm:
   \`\`\`
   I heard: "[Transcription]"
   
   I'll [ACTION]:
   - To: [person@email.com]
   - Subject: [Subject]
   - Message: [Draft]
   
   Reply YES to confirm, or provide corrections.
   \`\`\`

5. **Execution:**
   Perform the action:
   - Send email via Gmail API
   - Create calendar event
   - Add task to todo list
   - Save note to memory
   - Execute search and reply with results

6. **Confirmation:**
   \`\`\`
   ✅ Done!
   Email sent to [person]
   Subject: [Subject]
   \`\`\`

**Example workflows:**

Voice: "Email John and ask if he's free for lunch on Thursday"
→ Draft email, confirm, send

Voice: "Remind me to call the dentist tomorrow at 2pm"
→ Create calendar reminder

Voice: "What's the status of the OpenClaw Playbook project?"
→ Check project files, recent commits, respond with summary

**Tools:** Whisper API, NLP, Gmail API, Calendar API, task management`,
    tools: ["Whisper", "NLP", "Gmail", "Calendar"]
  },
  {
    id: 21,
    title: "REST API Integration Builder",
    category: "Development",
    description: "Authenticate any REST API, build automated workflow, handle errors. Integrate with any REST API and automate workflows.",
    prompt: `I want to integrate with [API NAME]. Help me build a complete integration.

**Step 1: API discovery**

Provide:
- API documentation URL
- Base URL
- Authentication method (API key, OAuth, Bearer token)

I'll analyze the docs and identify:
- Available endpoints
- Rate limits
- Required headers
- Common parameters

**Step 2: Authentication setup**

Based on auth method:
- **API Key:** Store in .env as [API_NAME]_API_KEY
- **OAuth:** Set up OAuth flow, store refresh token
- **Bearer:** Generate and store token

Test authentication:
\`\`\`bash
curl -H "Authorization: Bearer $TOKEN" https://api.example.com/test
\`\`\`

**Step 3: Core operations**

Build wrapper functions for common operations:

\`\`\`typescript
// GET request
async function getData(endpoint: string, params?: object) {
  const url = new URL(\`\${BASE_URL}\${endpoint}\`);
  if (params) {
    url.search = new URLSearchParams(params).toString();
  }
  
  const response = await fetch(url, {
    headers: {
      'Authorization': \`Bearer \${API_KEY}\`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error(\`API error: \${response.statusText}\`);
  }
  
  return response.json();
}

// POST request
async function createResource(endpoint: string, data: object) {
  const response = await fetch(\`\${BASE_URL}\${endpoint}\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${API_KEY}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  return response.json();
}
\`\`\`

**Step 4: Error handling**

Handle common errors:
- 401 Unauthorized → Refresh auth token
- 429 Rate limit → Wait and retry with exponential backoff
- 500 Server error → Log and alert
- Network errors → Retry with timeout

**Step 5: Build automation workflow**

Example: "Every day at 9am, fetch data from [endpoint] and send me a summary"

\`\`\`typescript
// Cron job
async function dailySync() {
  try {
    const data = await getData('/endpoint', { since: 'yesterday' });
    const summary = analyzData(data);
    await sendNotification(summary);
  } catch (error) {
    console.error('Sync failed:', error);
    await alertFailure(error);
  }
}
\`\`\`

**Step 6: Testing**

- Test each endpoint
- Verify error handling
- Check rate limit compliance
- Validate data format

**Deliverable:**
- Integration module (TypeScript/JavaScript)
- .env.example with required keys
- Usage examples
- Error handling guide

**Tools:** HTTP client, error handling, rate limiting`,
    tools: ["HTTP client", "Error handling", "TypeScript"]
  },
  {
    id: 22,
    title: "Security Token Audit",
    category: "Security",
    description: "Check for exposed credentials, verify .gitignore, scan git history, rotate keys. Audit your projects for security issues.",
    prompt: `Perform a comprehensive security audit of this repository.

**1. Exposed credentials check:**

Scan all files for:
- API keys (patterns: \`api_key=\`, \`apiKey:\`, etc.)
- Passwords (patterns: \`password=\`, \`pwd:\`, etc.)
- Tokens (JWT, Bearer, OAuth)
- Database connection strings
- Private keys (SSH, SSL)

**Tools:**
\`\`\`bash
# Search for common secret patterns
rg -i "api[_-]?key|password|secret|token|private[_-]?key" --type-not gitignore

# Check for hardcoded credentials
rg "(http|https)://[^:]+:[^@]+@" 

# AWS keys
rg "AKIA[0-9A-Z]{16}"
\`\`\`

**2. .gitignore verification:**

Check if .gitignore includes:
- \`.env\` and \`.env.*\`
- Node modules, vendor directories
- Build artifacts
- IDE config files
- Credentials directories
- Database files

**3. Git history scan:**

Search commit history for accidentally committed secrets:
\`\`\`bash
git log -p | rg "api[_-]?key|password|secret" 
\`\`\`

If secrets found in history:
- Document the commit hash
- Recommend using \`git-filter-repo\` or BFG to remove
- Flag for key rotation

**4. Environment variable check:**

- Are all secrets in .env (not .env.example)?
- Is .env in .gitignore?
- Are example values clearly fake in .env.example?

**5. Dependency audit:**

Check for vulnerable dependencies:
\`\`\`bash
npm audit
# or
yarn audit
\`\`\`

**6. File permissions:**

Check for overly permissive files:
\`\`\`bash
find . -type f -perm 0777
\`\`\`

**Report format:**

**🔒 Security Audit Report**

**🚨 Critical issues:**
- [Issue 1: e.g., "API key found in config.ts line 42"]
- [Issue 2]

**⚠️ Warnings:**
- [Warning 1: e.g., ".env not in .gitignore"]
- [Warning 2]

**✅ Passed:**
- No secrets in git history
- .gitignore properly configured
- Dependencies up to date

**🔧 Remediation steps:**

1. **Rotate exposed credentials:**
   - [ ] Regenerate API key at [service]
   - [ ] Update .env with new key
   - [ ] Verify old key is revoked

2. **Clean git history:**
   \`\`\`bash
   git filter-repo --path [file] --invert-paths
   \`\`\`

3. **Update .gitignore:**
   Add: [items to add]

4. **Fix file permissions:**
   \`\`\`bash
   chmod 600 [sensitive files]
   \`\`\`

**Next steps:**
- Schedule regular security audits (monthly)
- Set up pre-commit hooks to prevent secret commits
- Enable secret scanning on GitHub

**Tools:** grep/ripgrep, git, dependency auditors`,
    tools: ["Grep/ripgrep", "Git", "Dependency auditors"]
  },
  {
    id: 23,
    title: "Smart Notification Filtering",
    category: "Productivity",
    description: "Priority scoring for all incoming alerts, suppress noise, route by urgency level. Intelligently filter and route all your notifications.",
    prompt: `Build a smart notification filtering system that reduces noise and surfaces what matters.

**Input sources:**
- Email
- Slack/Discord
- GitHub
- Monitoring alerts
- Social media mentions
- Calendar reminders
- App notifications

**Scoring algorithm:**

For each notification, assign a priority score (0-100):

**Sender/source (30 points):**
- Known VIP: 30
- Client/customer: 25
- Teammate: 20
- Automated system: 15
- Marketing/newsletter: 5
- Unknown: 10

**Urgency signals (30 points):**
- Words like "urgent", "ASAP", "critical": +30
- Question marks: +15
- Deadline mentioned: +20
- Request for meeting: +10
- FYI/informational: +5

**Context relevance (25 points):**
- Related to active project: +25
- Related to area of responsibility: +20
- Mentioned my name: +15
- Generic broadcast: +5

**Timing (15 points):**
- During work hours: +15
- Outside work hours: +5
- Weekend: -10

**Final score → routing:**

**90-100 (Critical):** 
- Immediate notification (Telegram, SMS)
- Sound alert
- Mark as urgent

**70-89 (High):**
- Push notification
- Appear in digest within 1 hour
- Flag for review

**50-69 (Medium):**
- Add to digest (every 4 hours)
- No immediate alert

**30-49 (Low):**
- Daily summary only
- Batch with similar items

**0-29 (Noise):**
- Auto-archive or filter
- Weekly review of filtered items

**Learning system:**

Track my responses:
- If I respond quickly → increase sender priority
- If I ignore/delete → decrease priority
- If I mark as important → boost similar patterns
- If I unsubscribe/block → auto-filter similar

**Digest format:**

\`\`\`
📬 Notification Digest (4:00 PM)

🔴 Critical (respond now):
- [Item 1 with link]

🟡 High priority:
- [Item 2]
- [Item 3]

🟢 Medium priority (7 items):
- [Summary of topics]

📊 Filtered today: 45 notifications
Top sources: Email newsletters (23), GitHub (12), Slack bots (10)
\`\`\`

**Override rules:**

Allow manual rules:
- "Always notify me if [person] emails"
- "Never notify me about [keyword]"
- "Quiet hours: 8pm-8am (critical only)"

**Tools:** Email/Slack APIs, NLP for urgency detection, learning system`,
    tools: ["Email API", "Slack API", "NLP", "Machine learning"]
  },
  {
    id: 24,
    title: "GitHub Issues Auto-Fix",
    category: "Development",
    description: "Watch for new issues, spawn fix agent, test, open PR automatically. Automatically attempt to fix GitHub issues with AI.",
    prompt: `Monitor GitHub issues and automatically attempt fixes.

**Setup:**

1. **Watch for new issues** (GitHub webhook or polling)
2. **Filter for auto-fixable issues:**
   - Labeled as "bug", "good first issue", or "auto-fix"
   - Not labeled as "needs discussion"
   - Clear repro steps provided

**Auto-fix workflow:**

**Step 1: Issue analysis**

When new issue detected:
\`\`\`
Issue #[X]: [Title]
Reporter: [Username]
Labels: [bug, priority:medium]

Description:
[Issue description]

Steps to reproduce:
1. [Step 1]
2. [Step 2]

Expected: [Expected behavior]
Actual: [Actual behavior]
\`\`\`

Determine:
- Can this be auto-fixed? (simple bugs, typos, formatting issues → yes; complex logic → no)
- What files are likely involved?
- What's the probable cause?

**Step 2: Create fix branch**

\`\`\`bash
git checkout -b auto-fix/issue-[NUMBER]
\`\`\`

**Step 3: Spawn fix agent**

Create a subagent with this task:
\`\`\`
Fix GitHub issue #[X]: [Title]

**Problem:** [Summary of issue]

**Probable cause:** [Hypothesis]

**Steps:**
1. Reproduce the issue locally
2. Identify the root cause
3. Implement a fix
4. Add/update tests to prevent regression
5. Verify fix works
6. Commit with message: "Fix #[X]: [Short description]"

**Constraints:**
- Minimal changes (don't refactor unrelated code)
- Must include test
- Follow project style guide
- If stuck for >10min, report back instead of guessing
\`\`\`

**Step 4: Testing**

Run test suite:
\`\`\`bash
npm test
# or
pytest
\`\`\`

If tests fail, attempt debug or flag for human review.

**Step 5: Create PR**

If fix successful:
\`\`\`bash
git push origin auto-fix/issue-[NUMBER]
\`\`\`

Open PR with:
\`\`\`
## Auto-fix for #[NUMBER]

**Issue:** [Link to issue]

**Root cause:** [Explanation]

**Fix:** [What was changed and why]

**Testing:**
- [Test 1 passed]
- [Test 2 passed]

**Verification:**
Reproduced the issue, confirmed this fix resolves it.

Closes #[NUMBER]
\`\`\`

**Step 6: Notification**

Comment on issue:
\`\`\`
🤖 I've attempted an automatic fix for this issue.

PR: #[PR_NUMBER]

Please review and let me know if this resolves the problem!
\`\`\`

**Failure handling:**

If auto-fix fails:
- Comment on issue: "Attempted auto-fix but encountered [problem]. This may require human review."
- Label issue as "needs-manual-review"
- Document what was attempted

**Success metrics:**
- % of issues auto-fixed
- % of auto-fix PRs merged
- Time from issue to fix

**Tools:** GitHub API, git, testing frameworks, subagents`,
    tools: ["GitHub API", "Git", "Testing", "Subagents"]
  },
  {
    id: 25,
    title: "Newsletter Automation Engine",
    category: "Marketing",
    description: "Event-triggered Beehiiv/Mailchimp sequences, engagement tracking, A/B variants. Automate your entire newsletter workflow.",
    prompt: `Build an automated newsletter system with event-triggered sequences.

**Platform:** [Beehiiv / Mailchimp / ConvertKit]

**Setup:**

1. **Subscriber segments:**
   - New subscribers (joined <7 days)
   - Active readers (open rate >40%)
   - Inactive (no opens in 30 days)
   - Power users (clicked 3+ links)
   - Product buyers

2. **Email sequences:**

**Welcome sequence (trigger: new subscriber):**
- Day 0: Welcome email + what to expect
- Day 2: Best content roundup (top 5 articles)
- Day 5: Founder story + ask for reply
- Day 7: Special offer or free resource

**Re-engagement (trigger: inactive 30 days):**
- Email 1: "We miss you" + best recent content
- Email 2 (+3 days): Survey: "What content do you want?"
- Email 3 (+7 days): Last chance offer
- Action: If still no open, move to "inactive" segment

**Product launch (trigger: new product release):**
- T-7 days: Teaser announcement
- T-3 days: Early bird discount (active readers only)
- T-0: Launch day email
- T+2 days: Social proof (testimonials, sales count)
- T+7 days: Last chance (discount expires)

3. **Content automation:**

**Weekly newsletter (every Monday 9am):**
- Fetch: Top 3 blog posts from past week
- Fetch: Curated links (from reading list)
- Generate: Commentary/intro
- Add: Call-to-action
- Personalize: Subject line A/B test

**Example:**
\`\`\`
Subject A: "This week: [Topic]"
Subject B: "3 things about [Topic] you should know"

Hi [Name],

[Personalized intro based on subscriber behavior]

This week's highlights:

1. **[Article 1 title]**
   [Summary + link]

2. **[Article 2 title]**
   [Summary + link]

3. **[Article 3 title]**
   [Summary + link]

💡 Curated links:
- [Link 1]
- [Link 2]

[CTA button: Visit blog / Check out product / Reply to this]

[Signature]

P.S. [Personal note or question to encourage replies]
\`\`\`

4. **A/B testing:**

Test variables:
- Subject lines (emoji vs. plain)
- Send time (9am vs. 2pm)
- Content length (short vs. detailed)
- CTA placement (top vs. bottom)

Track winner, auto-apply to future emails.

5. **Engagement tracking:**

Monitor per email:
- Open rate
- Click rate
- Reply rate
- Unsubscribe rate

Alert if:
- Open rate <20% (subject line problem?)
- Unsubscribe spike (content issue?)
- High click rate (winning formula!)

6. **Smart sending:**

Optimize send time per subscriber:
- Track when each subscriber typically opens
- Send at their optimal time (if in reasonable window)

**Dashboard:**

Weekly report:
\`\`\`
📊 Newsletter Stats (Week of [Date])

Total subscribers: [X] (+Y% growth)
Open rate: 42% (↑ 3% vs last week)
Click rate: 8.5%
New subscribers: [X]
Unsubscribes: [X] (0.5% rate)

Top performing email:
"[Subject]" - 58% open rate

Best link:
[Article title] - 120 clicks

Action items:
- Re-engage [X] inactive subscribers
- Send follow-up to product launch non-openers
\`\`\`

**Tools:** Email platform API, content management, analytics, A/B testing`,
    tools: ["Beehiiv/Mailchimp API", "Analytics", "A/B testing"]
  },
  {
    id: 26,
    title: "Browser Automation via Relay",
    category: "Web Automation",
    description: "Chrome relay reads dashboards, fills forms, extracts structured data from any site. Use OpenClaw's browser control to automate any web task.",
    prompt: `Automate web tasks using the browser relay (Chrome extension).

**Setup:**
1. Install OpenClaw Browser Relay Chrome extension
2. Click the toolbar icon on the tab you want to control (badge shows ON)
3. Use browser() tool with profile="chrome"

**Common automation patterns:**

**1. Dashboard monitoring:**
\`\`\`
Task: Check analytics dashboard every 4 hours

Steps:
1. Navigate to dashboard URL
2. Wait for data to load
3. Take snapshot to identify elements
4. Extract metrics (visitors, revenue, conversions)
5. Store in log file
6. Send summary if metrics crossed threshold
\`\`\`

**2. Form filling:**
\`\`\`
Task: Submit weekly report form

Steps:
1. Navigate to form URL
2. Snapshot to get field references
3. Fill fields:
   - act: type, ref: "name-field", text: "[Name]"
   - act: type, ref: "report-field", text: "[Report text]"
4. Click submit button
5. Verify success message
\`\`\`

**3. Data extraction:**
\`\`\`
Task: Scrape product prices from competitor site

Steps:
1. Navigate to product listing page
2. Snapshot with refs="aria" for stable selectors
3. Extract data from each product card:
   - Product name
   - Price
   - Availability
4. Store in structured format (JSON/CSV)
5. Compare to our prices, flag discrepancies
\`\`\`

**4. Login automation:**
\`\`\`
Task: Login to admin panel

Steps:
1. Navigate to login page
2. Snapshot to identify login form
3. act: type, ref: "email-input", text: "[email]"
4. act: type, ref: "password-input", text: "[password]"
5. act: click, ref: "login-button"
6. Wait for dashboard to load
7. Verify login success
\`\`\`

**5. Monitoring for changes:**
\`\`\`
Task: Watch for new listings on a site

Steps:
1. Navigate to listings page
2. Extract current listings (IDs or titles)
3. Store in state file
4. Every hour:
   - Fetch current listings
   - Compare to stored state
   - If new listings found:
     - Extract details
     - Send notification
     - Update state
\`\`\`

**Best practices:**

- **Use snapshots first:** Always take a snapshot to identify element refs before interacting
- **Stable refs:** Use refs="aria" for more stable selectors across sessions
- **Wait for elements:** Add small delays after navigation to let pages load
- **Error handling:** Check for error messages or unexpected states
- **Keep state:** Track what you've seen before to detect changes

**Example workflow:**

\`\`\`typescript
// Navigate and wait
browser({ action: "navigate", profile: "chrome", targetUrl: "[URL]" })

// Get page structure
const snapshot = browser({ 
  action: "snapshot", 
  profile: "chrome",
  refs: "aria" 
})

// Interact based on snapshot refs
browser({
  action: "act",
  profile: "chrome",
  request: {
    kind: "click",
    ref: "e12" // from snapshot
  }
})

// Extract data
const data = extractFromSnapshot(snapshot)
\`\`\`

**Tools:** OpenClaw browser control, Chrome relay, DOM inspection`,
    tools: ["Browser control", "Chrome relay", "Web scraping"]
  },
  {
    id: 27,
    title: "Multi-Channel Broadcast",
    category: "Communication",
    description: "One command → Telegram + email + Slack simultaneously with format adaptation. Send one message to multiple channels with intelligent formatting.",
    prompt: `Send a message to multiple channels simultaneously, adapting format for each platform.

**Command:**
\`\`\`
broadcast "Your message here" --channels telegram,email,slack
\`\`\`

**Format adaptation:**

**Telegram:**
- Markdown formatting
- Add relevant emoji
- Keep it concise
- Include inline buttons for CTAs

**Email:**
- HTML formatting with proper structure
- Subject line (extract from first sentence or use --subject flag)
- Professional greeting/signature
- Embedded images if included
- Tracking pixels (optional)

**Slack:**
- Slack markdown (different from standard markdown)
- Use blocks for rich formatting
- Add reaction emojis
- Thread replies if it's a follow-up

**Example:**

Input:
\`\`\`
broadcast "New blog post: How to Automate Email with AI. Check it out at [link]" --channels telegram,email,slack,twitter
\`\`\`

**Output:**

**Telegram:**
\`\`\`
📝 New blog post!

**How to Automate Email with AI**

Check it out → [link]
\`\`\`

**Email:**
\`\`\`
Subject: New post: How to Automate Email with AI

Hi,

I just published a new blog post you might find interesting:

**How to Automate Email with AI**

[Brief excerpt or summary]

[Read more button: link]

Cheers,
[Signature]
\`\`\`

**Slack:**
\`\`\`
:memo: New blog post just dropped!

*How to Automate Email with AI*

<[link]|Read it here>
\`\`\`

**Twitter:**
\`\`\`
📝 New post: How to Automate Email with AI

[Summary in tweet-length]

[link]

#AI #automation #productivity
\`\`\`

**Advanced features:**

1. **Scheduling:**
   \`--schedule "2024-03-15 09:00"\`
   Queues message for future delivery

2. **Audience targeting:**
   \`--segment "newsletter-subscribers"\` for email
   \`--channel "#engineering"\` for Slack

3. **Media handling:**
   - Images: Upload to each platform appropriately
   - Videos: Links for email, native upload for social
   - Files: Attachment for email, shared link for others

4. **Tracking:**
   - Log message ID for each channel
   - Track engagement per channel
   - Report: "Sent to X channels, Y opens, Z clicks"

5. **Response aggregation:**
   - Collect replies from all channels
   - Aggregate into single thread
   - Notify of responses: "You have 3 replies (2 Telegram, 1 Email)"

**Implementation:**

\`\`\`typescript
async function broadcast(message: string, options: {
  channels: string[],
  subject?: string,
  schedule?: Date,
  media?: string[]
}) {
  const results = [];
  
  for (const channel of options.channels) {
    const formatted = formatForChannel(message, channel);
    const sent = await sendToChannel(channel, formatted, options);
    results.push({ channel, success: sent, id: sent.messageId });
  }
  
  return results;
}
\`\`\`

**Use cases:**
- Product announcements
- Emergency notifications
- Weekly updates
- Content promotion
- Status updates

**Tools:** Telegram API, Email, Slack API, Twitter API, message formatting`,
    tools: ["Telegram", "Email", "Slack", "Twitter", "Message API"]
  },
  {
    id: 28,
    title: "Obsidian Vault → AI Memory",
    category: "Knowledge Management",
    description: "Import your Obsidian vault, build searchable index, make it queryable by AI. Turn your Obsidian notes into AI-queryable knowledge.",
    prompt: `Import my Obsidian vault and make it searchable by AI.

**Step 1: Vault import**

Location: [Path to Obsidian vault]

\`\`\`bash
# Copy vault to AI workspace
cp -r ~/ObsidianVault ~/.openclaw/workspace/knowledge/
\`\`\`

**Step 2: Index creation**

Parse all markdown files:
- Extract titles (# headings)
- Extract tags (#tag)
- Extract links ([[wikilinks]])
- Extract metadata (YAML frontmatter)
- Create full-text index

**Structure:**
\`\`\`json
{
  "notes": [
    {
      "id": "note-001",
      "title": "Meeting with Client X",
      "path": "meetings/2024-03-15-client-x.md",
      "tags": ["meetings", "clients", "sales"],
      "links": ["[[Client X]]", "[[Q1 Goals]]"],
      "metadata": {
        "date": "2024-03-15",
        "type": "meeting-notes"
      },
      "content": "[Full text of note]",
      "summary": "[AI-generated summary]"
    }
  ],
  "tags": {
    "meetings": ["note-001", "note-015", ...],
    "clients": ["note-001", "note-023", ...]
  },
  "backlinks": {
    "Client X": ["note-001", "note-032", ...]
  }
}
\`\`\`

**Step 3: AI integration**

Make notes queryable:

**Query examples:**

"What are my notes about AI automation?"
→ Search index for "AI automation"
→ Return top 5 matches with summaries

"Summarize all meeting notes from March"
→ Filter by tag:meetings AND date:March
→ Generate combined summary

"What did I learn about [topic]?"
→ Semantic search across all notes
→ Extract key insights

**Step 4: Smart retrieval**

When AI needs context:
\`\`\`
User: "What was discussed in the last client meeting?"

AI thought process:
1. Search notes for tag:meetings, sort by date desc
2. Find most recent client meeting note
3. Read content
4. Summarize and respond
\`\`\`

**Step 5: Update workflow**

Keep index fresh:
- Watch Obsidian vault for changes (file watcher)
- When note modified, re-index that note
- Update backlinks and tag indices

**Step 6: Bi-directional sync**

AI can also CREATE notes:

\`\`\`
User: "Remember that we decided to use Next.js for the new project"

AI action:
1. Create note: decisions/2024-03-15-tech-stack.md
2. Content:
   # Tech Stack Decision
   Date: 2024-03-15
   Tags: #decisions #tech
   
   Decided to use **Next.js** for the new project.
   
   Reasons:
   - [AI infers or asks for reasons]
   
   Related: [[New Project]], [[Tech Decisions]]

3. Index the new note
\`\`\`

**Advanced features:**

1. **Daily notes integration:**
   - Auto-create daily note with summary of AI conversations
   - Link to relevant permanent notes

2. **Graph analysis:**
   - Identify highly connected notes (hub notes)
   - Find orphaned notes (no backlinks)
   - Suggest new connections

3. **Semantic search:**
   - Embed notes using vector embeddings
   - Find similar notes even without keyword matches
   - "Notes similar to [note title]"

4. **Auto-tagging:**
   - AI suggests tags for new notes
   - Standardize tag naming

5. **Template automation:**
   - "Create meeting note for [person]"
   - Auto-fill template with context from calendar

**Query interface:**

\`\`\`
# In any conversation:

"Search notes: [query]"
"Create note: [title] in [folder]"
"Link notes: [note 1] and [note 2]"
"What notes reference [topic]?"
"Summarize my notes on [topic]"
\`\`\`

**Benefits:**
- AI remembers everything in your vault
- Natural language note retrieval
- Automatic organization and linking
- AI can create and update notes
- Your brain + AI brain working together

**Tools:** File watcher, markdown parser, full-text search, vector embeddings`,
    tools: ["File watcher", "Markdown", "Search", "Embeddings"]
  },
  {
    id: 29,
    title: "AI Dental Practice Suite",
    category: "Healthcare Automation",
    description: "Combine receptionist bot + schedule optimizer + HR chatbot into one deployment. A complete AI system for dental practices.",
    prompt: `Deploy a complete AI system for a dental practice.

**Components:**

## 1. AI Receptionist (24/7)

**Handles:**
- Appointment booking
- Appointment changes/cancellations
- Insurance questions
- New patient intake
- General inquiries

**Conversation flow:**

**New appointment:**
\`\`\`
Patient: "I need a cleaning"

Bot: "I'd be happy to help! Is this your first visit with us?"

Patient: "Yes"

Bot: "Great! I'll need a few details:
- Preferred date/time?
- Dental insurance provider?
- Any specific concerns?"

[Collect info]

Bot: "I have availability:
- Tuesday 3/19 at 2:00pm
- Wednesday 3/20 at 10:00am
- Friday 3/22 at 3:30pm

Which works best?"

[Book appointment]

Bot: "You're all set for [date/time] with Dr. [Name]. 

I've sent a confirmation text to [phone]. Please arrive 15min early to complete new patient forms.

See you soon!"
\`\`\`

**Escalation:**
Complex cases → "Let me connect you with our front desk" (during business hours) or "I'll have someone call you tomorrow morning"

## 2. Schedule Optimizer

**Background tasks:**

**Fill open slots:**
- Scan schedule for gaps
- Identify overdue patients (last visit >6mo)
- Match patient needs to available slots
- Send proactive outreach: "Due for cleaning? We have [date] available"

**Utilization tracking:**
- Monitor provider productivity
- Flag inefficiencies (providers sitting idle)
- Suggest schedule adjustments
- Report: "Dr. Smith 68% booked this week (target 85%)"

**Predictive scheduling:**
- Historical patterns: "Mondays 9am are slow, Thursday afternoons fill fast"
- Suggest: "Move hygienist hours from Monday to Thursday"

## 3. HR Chatbot (for staff)

**Handles:**
- PTO requests
- Payroll questions
- Benefits info
- Policy lookup
- Schedule swaps

**Examples:**

"How much PTO do I have left?"
→ Query HR system: "You have 7.5 days remaining"

"What's the protocol for calling in sick?"
→ Pull from employee handbook: "Notify [manager] at least 2h before shift if possible. Here's the policy: [link]"

"Can I swap shifts with Sarah?"
→ "I'll notify Sarah and [manager]. Pending approval."

## 4. Admin Dashboard

**Metrics shown:**
- Appointments booked (by AI vs. manual)
- Open slots filled
- Patient satisfaction (survey after visit)
- Staff inquiries handled by bot
- Revenue impact (filled slots = $X)

**Weekly report:**
\`\`\`
📊 AI Practice Suite Report

**Receptionist:**
- Calls handled: 142
- Appointments booked: 87
- Escalations: 8 (5.6%)

**Schedule Optimizer:**
- Open slots filled: 23 ($3,450 revenue)
- Utilization: Dr. A 89%, Dr. B 82%, Hygienist 91%

**HR Chatbot:**
- Staff inquiries: 34
- PTO requests: 5
- Policy lookups: 18

**Patient Satisfaction:**
- AI interaction rating: 4.6/5
- Appointment no-show rate: 3% (down from 8%)

**ROI:** $12,000 additional revenue this month from filled slots
\`\`\`

## 5. Integration Points

**Connects to:**
- Practice management system (Dentrix, Eaglesoft, etc.)
- Phone system (for receptionist)
- Calendar system (for scheduling)
- SMS/email (for patient communication)
- HR software (for staff queries)

## 6. Deployment

**Requirements:**
- Server/cloud instance (docker container)
- API access to practice management system
- Phone number integration (Twilio or similar)
- Staff training (1-hour session)

**Setup steps:**
1. Configure integrations
2. Load practice data (providers, services, policies)
3. Train on practice-specific FAQs
4. Test with staff before going live
5. Soft launch (AI + human monitoring)
6. Full launch after 2-week trial

**Maintenance:**
- Monitor conversations for accuracy
- Update FAQ based on common questions
- Monthly performance review
- Quarterly feature additions

**Use cases:**
- Small practice (1-2 providers) → Reduce admin overhead
- Growing practice → Scale without hiring more staff
- Multi-location → Centralized AI, practice-specific knowledge

**Tools:** NLP, practice management API, phone integration, scheduling optimization`,
    tools: ["NLP", "Practice management API", "Phone system", "Scheduling"]
  },
  {
    id: 30,
    title: "The Complete 'Build While You Sleep' Playbook",
    category: "Meta-Automation",
    description: "Step-by-step guide to running an autonomous overnight AI business workflow. The ultimate automation: AI runs your business while you sleep.",
    prompt: `Set up a complete "Build While You Sleep" autonomous system.

**Philosophy:**
Give AI the tools, permissions, and autonomy to run parts of your business without human intervention. Wake up to completed work, new sales, and progress reports.

**Step 1: Define overnight scope**

What CAN the AI do autonomously?
✅ **Safe autonomous tasks:**
- Build and deploy code
- Create content (blog posts, social media)
- Process orders and send confirmations
- Monitor systems and alert on issues
- Research and compile reports
- Schedule appointments
- Respond to common customer questions
- Fill open calendar slots
- Update dashboards and metrics

❌ **Requires human approval:**
- Spending money (>$X threshold)
- Legal/compliance decisions
- Major product changes
- Personnel decisions
- Public statements (beyond templated responses)

**Step 2: Grant permissions**

AI needs access to:

**Development:**
- GitHub (create repos, push code, open PRs)
- Deployment (Netlify, Vercel, etc.)
- Domain management (for new projects)

**Business:**
- Stripe (create products, read sales data)
- Email (send via your domain)
- Calendar (schedule events)
- CRM (update customer records)

**Communication:**
- Telegram (send you updates)
- SMS (for critical alerts)
- Social media (post updates)

**Storage:**
- File system (read/write)
- Database (for projects)
- Cloud storage (for backups)

**Tools:**
- Web search (research)
- Browser control (for sites without APIs)

**Step 3: Set up nightly cron**

**10:00 PM - Evening prep:**
- Review today's activity
- Identify incomplete tasks
- Generate overnight plan
- Confirm no blockers

**11:00 PM - Start autonomous work:**

**Possible overnight projects:**

A. **Build a new product:**
\`\`\`
Tonight's mission: Build "Simple Invoice Generator"

Steps:
1. Create GitHub repo
2. Build Next.js app:
   - Invoice form (client info, line items)
   - PDF generation
   - Email delivery
   - Simple payment option (Buy Me a Coffee link)
3. Deploy to Netlify
4. Test end-to-end
5. Create landing page
6. Post to Twitter/ProductHunt

Goal: Live and accepting users by 6am
\`\`\`

B. **Content creation sprint:**
\`\`\`
Create 5 blog posts on [topic]:
1. Research each topic
2. Write drafts (1500-2000 words each)
3. Generate meta descriptions
4. Create social media teasers
5. Schedule for next week (Mon-Fri)
6. Update content calendar
\`\`\`

C. **Business operations:**
\`\`\`
Overnight operations checklist:
- Process any new orders
- Send welcome emails to new customers
- Update revenue dashboard
- Backup all databases
- Check for and fill open appointment slots
- Respond to common customer questions
- Monitor competitor activity
- Update pricing if triggered
\`\`\`

**2:00 AM - Memory consolidation:**
- Review all conversations from past 24h
- Update MEMORY.md
- Update project status files
- Commit and push documentation

**6:00 AM - Morning report:**

Send summary:
\`\`\`
☀️ Good morning! Here's what happened overnight:

**Projects completed:**
✅ Built and deployed "Simple Invoice Generator"
   - Live at: https://[url]
   - Features: Invoice creation, PDF export, email delivery
   - Status: Ready for users
   
✅ Created 5 blog posts (drafted, scheduled for next week)

**Business updates:**
- 3 new sales ($117 total)
- 12 new email subscribers
- Filled 2 open appointment slots

**Issues found:**
⚠️ Deployment of [project] failed (needs manual review)
⚠️ Stripe webhook not receiving events (investigating)

**Metrics:**
- Revenue (24h): $892
- New users: 47
- Support tickets: 2 (both resolved)

**Next steps:**
- Review invoice generator and share if you like it
- Check failed deployment logs
- Approve draft blog posts

Full activity log: memory/2024-03-15.md
\`\`\`

**Step 4: Safety rails**

**Spending limits:**
- Max $X per transaction without approval
- Max $Y total per day
- Alert before any charge

**Deployment safety:**
- Always deploy to staging first
- Run automated tests
- Require passing health checks
- Auto-rollback on errors

**Communication safety:**
- Templates for common messages
- Require approval for non-templated public posts
- Flag sensitive communications for review

**Error handling:**
- If stuck for >30min, pause and report
- Never retry failed payment operations automatically
- Escalate security issues immediately

**Step 5: Morning review**

**Your job when you wake up:**
1. Read overnight summary (5min)
2. Review completed work
3. Approve/reject what needs decision
4. Provide feedback for improvement

**Iterative improvement:**
- AI learns what you approve/reject
- Adjusts autonomy based on success rate
- Expands scope as trust builds

**Step 6: Expand gradually**

**Week 1:** Simple automation (content, monitoring)
**Week 2:** Add deployment automation
**Week 3:** Add customer communication
**Week 4:** Add product creation
**Month 2:** Full autonomous overnight operation

**Results after 30 days:**

Typical outcomes:
- 10-20 products built and deployed
- 50-100 blog posts created
- 100% of routine operations handled
- $X,000 in revenue from products built by AI
- 90%+ of customer questions answered without you
- Your role: Strategy and decision-making only

**The ultimate goal:**
You provide vision and strategy.
AI handles execution.
You wake up to progress, every day.

**Tools needed:**
All of the above use cases combined into one cohesive system.

This is the meta-automation: AI automating AI automation.

**Ready to sleep soundly while your business grows? Let's build it.**
`,
    tools: ["All tools", "Meta-automation", "Autonomous systems"]
  }
];

function SuccessContent() {
  const searchParams = useSearchParams();
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [emailSaved, setEmailSaved] = useState(false);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) {
      window.location.href = '/';
      return;
    }

    // Verify payment
    fetch(`/api/verify?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        if (data.paid) {
          setIsPaid(true);
          if (data.customerEmail) {
            setEmail(data.customerEmail);
          }
        } else {
          window.location.href = '/';
        }
        setLoading(false);
      })
      .catch(() => {
        window.location.href = '/';
      });
  }, [sessionId]);

  const handleEmailCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !sessionId) return;

    try {
      await fetch('/api/capture-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, session_id: sessionId })
      });
      setEmailSaved(true);
    } catch (error) {
      console.error('Failed to save email:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f10] text-white flex items-center justify-center">
        <div className="text-xl">Verifying payment...</div>
      </div>
    );
  }

  if (!isPaid) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-4xl font-bold mb-4 text-purple-400">
            Welcome to The OpenClaw Playbook!
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your payment was successful. Here are all 30 AI automation use cases.
          </p>

          {/* Email Capture */}
          {!emailSaved && (
            <form onSubmit={handleEmailCapture} className="max-w-md mx-auto mb-8">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for updates"
                  className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded font-semibold"
                >
                  Save
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                We'll send you updates and bonus content (no spam, ever)
              </p>
            </form>
          )}

          {emailSaved && (
            <div className="max-w-md mx-auto mb-8 p-4 bg-green-900/20 border border-green-700 rounded">
              <p className="text-green-400">✓ Email saved! Check your inbox for bonus content.</p>
            </div>
          )}
        </div>

        {/* All 30 Use Cases */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold mb-6 text-purple-400">All 30 Use Cases</h2>
          
          {allUseCases.map((useCase) => (
            <div 
              key={useCase.id}
              id={`use-case-${useCase.id}`}
              className="bg-gray-900 border border-gray-800 rounded-lg p-8"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs text-purple-400 font-semibold mb-2 uppercase tracking-wide">
                    {useCase.category}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {useCase.id}. {useCase.title}
                  </h3>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {useCase.description}
              </p>

              {useCase.tools && useCase.tools.length > 0 && (
                <div className="mb-6">
                  <div className="text-sm font-semibold text-gray-400 mb-2">Tools & Skills:</div>
                  <div className="flex flex-wrap gap-2">
                    {useCase.tools.map((tool, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-xs text-gray-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-950 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold text-purple-400">
                    📋 Copy-Paste Prompt
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(useCase.prompt);
                      alert('Prompt copied to clipboard!');
                    }}
                    className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-xs font-semibold"
                  >
                    Copy
                  </button>
                </div>
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                  {useCase.prompt}
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center border-t border-gray-800 pt-12">
          <h2 className="text-2xl font-bold mb-4">Ready to Automate?</h2>
          <p className="text-gray-400 mb-6">
            Start with any use case above. Copy the prompt, adapt it to your needs, and watch AI handle the work.
          </p>
          <p className="text-sm text-gray-500">
            Questions? Reply to your confirmation email and we'll help you get started.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f0f10] flex items-center justify-center text-white">Verifying payment...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
