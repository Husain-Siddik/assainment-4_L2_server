import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";





export const auth = betterAuth({

  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),

  trustedOrigins: [process.env.APP_URL || "http://localhost:3000"],

  user: {
    additionalFields: {

      role: {
        type: "string",
        defaultValue: "STUDENT",
        required: true
      }
    }
  },


  emailAndPassword: {
    enabled: true,
    autoSignIn: true
  },

  //last added

  session: {

    cookieCache: {

      enabled: true,

      maxAge: 5 * 60, // 5 minutes

    },

  },

  advanced: {

    cookiePrefix: "better-auth",

    useSecureCookies: process.env.NODE_ENV === "production",

    crossSubDomainCookies: {

      enabled: false,

    },

    disableCSRFCheck: true, // Allow requests without Origin header (Postman, mobile apps, etc.)

  },


});