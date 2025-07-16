import { serverOnly } from "@tanstack/react-start";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { reactStartCookies } from "better-auth/react-start";
import { db } from "~/lib/db";
import { user } from "../db/schema";

const getAuthConfig = serverOnly(() =>
  betterAuth({
    baseURL: process.env.VITE_BASE_URL,
    database: drizzleAdapter(db, {
      provider: "pg",
    }),

    // https://www.better-auth.com/docs/integrations/tanstack#usage-tips
    plugins: [reactStartCookies(), inferAdditionalFields<typeof user>()],

    // https://www.better-auth.com/docs/concepts/session-management#session-caching
    // session: {
    //   cookieCache: {
    //     enabled: true,
    //     maxAge: 5 * 60, // 5 minutes
    //   },
    // },

    // https://www.better-auth.com/docs/concepts/oauth
    socialProviders: {
      // github: {
      //   clientId: process.env.GITHUB_CLIENT_ID!,
      //   clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      // },
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
    },

    // https://www.better-auth.com/docs/authentication/email-password
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
    },
    user: {
      additionalFields: {
        role: {
          type: "string",
          default: "user",
          enum: ["user", "artist"],
        },
      },
    },
  }),
);

export const auth = getAuthConfig();
