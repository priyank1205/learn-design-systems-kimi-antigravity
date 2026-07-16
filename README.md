# Design System Quest

*A gamified, AI-tutored learning app that takes you from "never touched a design system" to "built, governed, and made one agent-readable."*

## Who This Project Is For

This project is tailored for **senior product designers**, frontend engineers, and design system advocates who want to master the end-to-end process of building and maintaining a modern design system. If you are looking to understand the "why" and "how" of design tokens, component architecture, documentation, and governance, this quest is for you.

## Why It Is Needed

The transition from creating UI components in isolation to architecting a scalable design system can be daunting. Many resources focus on the theory but lack hands-on, verifiable practice. This app bridges that gap by providing a structured, verifiable path to mastery. Instead of just reading about design systems, you will build a real one that terminates in a portfolio-ready artifact.

## How It Works and How It Could Help

Design System Quest operates as a gamified learning platform:
- **Quest Map:** Follow a linear path of levels (Prologue to Final Boss) with optional side-quests.
- **Learn & Practice:** Each level breaks down theory from first principles, followed by interactive drills and quizzes.
- **Boss Fights:** Test your knowledge by producing real artifacts (e.g., tokens in JSON, React components, Figma structures).
- **AI Tutor (Powered by Gemini):** An AI tutor guides you through concepts using a Socratic approach—explaining the "why" before the "how"—and acts as your pair-programming partner.
- **Real Verification:** Your work is programmatically verified (schema validation, builds, AST audits) instead of relying on an honor system.

By completing this quest, you will gain practical, verifiable skills in design system architecture, making you highly effective at scaling design and engineering efforts in any organization.

## Getting Started

### Prerequisites

Make sure you have Node.js (v20 or newer) installed.

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   # or yarn install, pnpm install, bun install
   ```

2. **Set up environment variables:**

   Copy the `.env.example` file to `.env.local` (or create one if it doesn't exist):

   ```bash
   cp .env.example .env.local
   ```

3. **Configure the Gemini API Key:**

   This project uses Google's Gemini API to power the AI tutor. You will need an API key to enable these features.
   
   Get your Gemini API key from Google AI Studio:  
   **[Get Gemini API Key Here](https://aistudio.google.com/app/apikey)**

   Once you have your key, add it to your `.env.local` file:

   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

### Running the Development Server

Start the app locally:

```bash
npm run dev
# or yarn dev, pnpm dev, bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

- Check out the **Design System Quest - Curriculum and Level Map.md** file for a detailed breakdown of the curriculum and level progression.
- Built with [Next.js](https://nextjs.org/) and powered by [Google Gemini](https://ai.google.dev/).
