import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";


export async function isTutor(req: Request, res: Response, next: NextFunction) {
  try {

    const session = await auth.api.getSession({
      headers: new Headers(Object.entries(req.headers as Record<string, string>)),
    });

    if (!session?.user) return next();


    if (session.user.role === "TUTOR") {

      const exists = await prisma.tutorProfile.findUnique({
        where: { userId: session.user.id },
      });

      if (!exists) {
        await prisma.tutorProfile.create({
          data: {
            userId: session.user.id,
            bio: "New Tutor",
            pricePerHr: 0,
          },
        });
        console.log("TutorProfile created for", session.user.id);
      }
    }

    next();
  } catch (err) {
    console.error("Error creating tutor profile:", err);
    next(err);
  }
}
