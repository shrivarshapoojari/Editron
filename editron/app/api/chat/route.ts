import { db } from "@/lib/db";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { Groq } from 'groq-sdk';

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  message: string;
  history: ChatMessage[];
}

async function generateAIResponse(messages: ChatMessage[]): Promise<string> {
  const systemPrompt = `You are a helpful AI coding assistant. You help developers with:
- Code explanations and debugging
- Best practices and architecture advice  
- Writing clean, efficient code
- Troubleshooting errors
- Code reviews and optimizations

Always provide clear, practical answers. Use proper code formatting when showing examples.`;

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || "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"
  });

  const fullMessages = [
    { role: "system", content: systemPrompt },
    ...messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }))
  ];

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: fullMessages as any,
      model: "openai/gpt-oss-20b",
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 0.9,
      stream: false,
    });

    const response = chatCompletion.choices[0]?.message?.content;

    if (!response) {
      throw new Error("No response from AI model");
    }

    return response.trim();
  } catch (error) {
    console.error("AI generation error:", error);
    throw new Error("Failed to generate AI response");
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();
    const { message, history = [] } = body;

    // Validate input
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 }
      );
    }

    // Validate history format
    const validHistory = Array.isArray(history)
      ? history.filter(
          (msg) =>
            msg &&
            typeof msg === "object" &&
            typeof msg.role === "string" &&
            typeof msg.content === "string" &&
            ["user", "assistant"].includes(msg.role)
        )
      : [];

    const recentHistory = validHistory.slice(-10);

    const messages: ChatMessage[] = [
      ...recentHistory,
      { role: "user", content: message },
    ];

    //   Generate ai response

    const aiResponse = await generateAIResponse(messages);



    return NextResponse.json({
      response: aiResponse,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chat API Error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        error: "Failed to generate AI response",
        details: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
