import * as z from "zod";

import { createServerFn } from "@tanstack/react-start";
import { Groq } from "groq-sdk";
import { authMiddleware } from "~/lib/auth/middleware/auth-guard";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const sendMessageToVAI = createServerFn({ method: "POST" })
  .validator(
    z.object({
      message: z.string(),
    }),
  )
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
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

    return {
      success: true,
      aiResponse: chatCompletion.choices[0].message.content,
    };
  });
