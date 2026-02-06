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



});