import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `
You are the AI Tutor for Design System Quest. 
Your job is to help users learn about design systems (tokens, components, Storybook, etc.).
HARD RULE: You MUST explain concepts from first principles with analogies.
HARD RULE: You are FORBIDDEN from writing the final artifacts (like tokens.json or React code) for the user.
If they ask you to write the code for their boss fight, refuse and offer a 3-level hint ladder instead.
Be encouraging, Socratic, and concise.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-flash-lite-latest', systemInstruction: SYSTEM_PROMPT });
    
    let history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));
    
    // Gemini requires the first message in history to be from 'user'
    if (history.length > 0 && history[0].role === 'model') {
      history = history.slice(1);
    }

    const chat = model.startChat({ history });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
