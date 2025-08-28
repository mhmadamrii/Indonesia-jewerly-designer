import fs from "fs/promises";
import path from "path";
import * as z from "zod";

import { createServerFn } from "@tanstack/react-start";
import { Groq } from "groq-sdk";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Load system prompt at module level for better performance
let systemPrompt: string;

async function loadSystemPrompt() {
  if (!systemPrompt) {
    try {
      const promptPath = path.join(process.cwd(), "src/actions/AI_SYSTEM_PROMPT.md");
      systemPrompt = await fs.readFile(promptPath, "utf8");
    } catch (error) {
      console.error("Failed to load system prompt:", error);
      systemPrompt =
        "You are a helpful AI assistant for Indonesian Jewelry Designer marketplace.";
    }
  }
  return systemPrompt;
}

export const sendMessageToVAI = createServerFn({ method: "POST" })
  .validator(
    z.object({
      message: z.string(),
    }),
  )
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const prompt = await loadSystemPrompt();
    console.log("cyrrent", prompt);

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: data.message,
        },
      ],
      model: "openai/gpt-oss-20b",
      temperature: 1,
      max_completion_tokens: 8192,
      top_p: 1,
      stream: false,
      reasoning_effort: "medium",
      stop: null,
    });

    console.log(
      "chatCompletion.choices[0].message.content",
      chatCompletion.choices[0].message.content,
    );

    return {
      success: true,
      response: {
        id: Date.now().toString(),
        text: chatCompletion.choices[0].message.content as string,
        sender: "bot",
        timestamp: new Date(),
        senderName: "Mark - AI Assistant",
      },
    };
  });
