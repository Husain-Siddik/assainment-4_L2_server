var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express7 from "express";
import { toNodeHandler } from "better-auth/node";

// src/modules/availability/availability.router.ts
import express from "express";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nenum Role {\n  STUDENT\n  TUTOR\n  ADMIN\n}\n\nenum UserStatus {\n  ACTIVE\n  BANNED\n}\n\nenum BookingStatus {\n  CONFIRMED\n  COMPLETED\n  CANCELLED\n}\n\nmodel User {\n  id    String @id\n  name  String\n  email String @unique\n\n  role   Role       @default(STUDENT)\n  status UserStatus @default(ACTIVE)\n\n  tutorProfile TutorProfile?\n\n  emailVerified Boolean  @default(false)\n  image         String?\n  createdAt     DateTime @default(now())\n  updatedAt     DateTime @updatedAt\n\n  sessions Session[]\n  accounts Account[]\n\n  bookings Booking[]\n  reviews  Review[]\n\n  @@index([email])\n  @@map("user")\n}\n\nmodel TutorProfile {\n  id         Int    @id @default(autoincrement())\n  userId     String @unique\n  bio        String\n  pricePerHr Float\n  rating     Float  @default(0)\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  categories   Category[]\n  availability Availability[]\n\n  createdAt DateTime  @default(now())\n  bookings  Booking[]\n  reviews   Review[]\n}\n\nmodel Category {\n  id   Int    @id @default(autoincrement())\n  name String @unique\n\n  tutors TutorProfile[]\n}\n\nmodel Availability {\n  id        Int      @id @default(autoincrement())\n  tutorId   Int\n  date      DateTime\n  startTime String\n  endTime   String\n  isBooked  Boolean  @default(false)\n\n  tutor TutorProfile @relation(fields: [tutorId], references: [id], onDelete: Cascade)\n}\n\nmodel Booking {\n  id     Int           @id @default(autoincrement())\n  status BookingStatus @default(CONFIRMED)\n\n  studentId String\n  tutorId   Int\n\n  student User         @relation(fields: [studentId], references: [id], onDelete: Cascade)\n  tutor   TutorProfile @relation(fields: [tutorId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now())\n}\n\nmodel Review {\n  id      Int    @id @default(autoincrement())\n  rating  Int\n  comment String\n\n  studentId String\n  tutorId   Int\n\n  student User         @relation(fields: [studentId], references: [id], onDelete: Cascade)\n  tutor   TutorProfile @relation(fields: [tutorId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now())\n\n  @@unique([studentId, tutorId])\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"tutorProfile","kind":"object","type":"TutorProfile","relationName":"TutorProfileToUser"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"}],"dbName":"user"},"TutorProfile":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"userId","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"pricePerHr","kind":"scalar","type":"Float"},{"name":"rating","kind":"scalar","type":"Float"},{"name":"user","kind":"object","type":"User","relationName":"TutorProfileToUser"},{"name":"categories","kind":"object","type":"Category","relationName":"CategoryToTutorProfile"},{"name":"availability","kind":"object","type":"Availability","relationName":"AvailabilityToTutorProfile"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToTutorProfile"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToTutorProfile"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"name","kind":"scalar","type":"String"},{"name":"tutors","kind":"object","type":"TutorProfile","relationName":"CategoryToTutorProfile"}],"dbName":null},"Availability":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"tutorId","kind":"scalar","type":"Int"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"startTime","kind":"scalar","type":"String"},{"name":"endTime","kind":"scalar","type":"String"},{"name":"isBooked","kind":"scalar","type":"Boolean"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"AvailabilityToTutorProfile"}],"dbName":null},"Booking":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"status","kind":"enum","type":"BookingStatus"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"Int"},{"name":"student","kind":"object","type":"User","relationName":"BookingToUser"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"BookingToTutorProfile"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"Int"},{"name":"student","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"ReviewToTutorProfile"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  AvailabilityScalarFieldEnum: () => AvailabilityScalarFieldEnum,
  BookingScalarFieldEnum: () => BookingScalarFieldEnum,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  TutorProfileScalarFieldEnum: () => TutorProfileScalarFieldEnum,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.3.0",
  engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  TutorProfile: "TutorProfile",
  Category: "Category",
  Availability: "Availability",
  Booking: "Booking",
  Review: "Review",
  Session: "Session",
  Account: "Account",
  Verification: "Verification"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  role: "role",
  status: "status",
  emailVerified: "emailVerified",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var TutorProfileScalarFieldEnum = {
  id: "id",
  userId: "userId",
  bio: "bio",
  pricePerHr: "pricePerHr",
  rating: "rating",
  createdAt: "createdAt"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name"
};
var AvailabilityScalarFieldEnum = {
  id: "id",
  tutorId: "tutorId",
  date: "date",
  startTime: "startTime",
  endTime: "endTime",
  isBooked: "isBooked"
};
var BookingScalarFieldEnum = {
  id: "id",
  status: "status",
  studentId: "studentId",
  tutorId: "tutorId",
  createdAt: "createdAt"
};
var ReviewScalarFieldEnum = {
  id: "id",
  rating: "rating",
  comment: "comment",
  studentId: "studentId",
  tutorId: "tutorId",
  createdAt: "createdAt"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/enums.ts
var UserStatus = {
  ACTIVE: "ACTIVE",
  BANNED: "BANNED"
};
var BookingStatus = {
  CONFIRMED: "CONFIRMED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED"
};

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/availability/availability.service.ts
var getAllAvailability = async () => {
  return await prisma.availability.findMany({
    include: {
      tutor: {
        select: {
          userId: true,
          bio: true,
          pricePerHr: true
        }
      }
    },
    orderBy: { date: "asc" }
  });
};
var createAvailability = async (tutorId, date, startTime, endTime) => {
  const availability = await prisma.availability.create({
    data: {
      tutorId,
      date: new Date(date),
      startTime,
      endTime
    }
  });
  return availability;
};
var isSlotAvailable = async (tutorId, date, startTime, endTime) => {
  const existingAvailability = await prisma.availability.findFirst({
    where: {
      tutorId,
      date: new Date(date),
      startTime,
      endTime
    }
  });
  return !existingAvailability;
};
var getAvailibilityById = async (availabilityId) => {
  return await prisma.availability.findUnique({
    where: {
      id: availabilityId
    }
  });
};
var updateAvailability = async (availabilityId, data) => {
  return await prisma.availability.update({
    where: {
      id: availabilityId
    },
    data
  });
};
var deleteAvailability = async (availabilityId) => {
  return await prisma.availability.delete({
    where: {
      id: availabilityId
    }
  });
};
var availabilityService = {
  getAllAvailability,
  createAvailability,
  isSlotAvailable,
  updateAvailability,
  getAvailibilityById,
  deleteAvailability
};

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
    // or "mysql", "postgresql", ...etc
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
      maxAge: 5 * 60
      // 5 minutes
    }
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false
    },
    disableCSRFCheck: true
    // Allow requests without Origin header (Postman, mobile apps, etc.)
  }
});

// src/middlewares/authorizeRoles.ts
var authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You  are  not authorized!!"
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role
      };
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: " Forbidden !! You don't have permission to access this resources!"
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
var authorizeRoles_default = authorizeRoles;

// src/modules/tutor/tutor.service.ts
var createTutor = async (data, userId, role) => {
  if (role !== "TUTOR" /* TUTOR */) {
    return null;
  }
  const tutor = await prisma.tutorProfile.create({
    data: {
      ...data,
      userId
    }
  });
  return tutor;
};
var getTutorById = async (id) => {
  const tutor = await prisma.tutorProfile.findUnique({
    omit: {
      createdAt: true
    },
    where: {
      id
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      },
      categories: true,
      availability: true,
      reviews: {
        include: {
          student: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  });
  return tutor;
};
var getAllTutor = async (options) => {
  const { categoryNames, minRating } = options;
  const tutors = await prisma.tutorProfile.findMany({
    where: {
      AND: [
        categoryNames && categoryNames.length > 0 ? {
          categories: {
            some: {
              name: { in: categoryNames }
            }
          }
        } : {},
        minRating !== void 0 ? {
          rating: {
            gte: minRating
          }
        } : {}
      ]
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      },
      categories: true,
      availability: true,
      reviews: {
        include: {
          student: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  });
  return tutors;
};
var getTutorByUserId = async (userId) => {
  return await prisma.tutorProfile.findUnique({
    where: { userId }
  });
};
var deleteTutorWithUser = async (userId) => {
  return await prisma.$transaction([
    prisma.tutorProfile.delete({
      where: { userId }
    }),
    //usr delete
    prisma.user.delete({
      where: { id: userId }
    })
  ]);
};
var updateTutorProfile = async (userId, data) => {
  return await prisma.tutorProfile.update({
    where: { userId },
    data
  });
};
var categorysetForTutorService = async (tutorId, categoryIds) => {
  return await prisma.tutorProfile.update({
    where: {
      id: tutorId
    },
    data: {
      categories: {
        set: categoryIds.map((id) => ({ id }))
      }
    },
    include: {
      categories: true
    }
  });
};
var removeCategoryService = async (tutorId, categoryIds) => {
  return prisma.tutorProfile.update({
    where: { id: tutorId },
    data: {
      categories: {
        disconnect: categoryIds.map((id) => ({ id }))
      }
    },
    include: {
      categories: true
    }
  });
};
var addSingelCategoryService = async (tutorId, categoryIds) => {
  return await prisma.tutorProfile.update({
    where: {
      id: tutorId
    },
    data: {
      categories: {
        connect: categoryIds.map((id) => ({ id }))
      }
    },
    include: {
      categories: true
    }
  });
};
var deleteAllCategoryService = async (tutorId) => {
  return await prisma.tutorProfile.update({
    where: { id: tutorId },
    data: {
      categories: {
        set: []
      }
    },
    include: {
      categories: true
    }
  });
};
var TutorService = {
  createTutor,
  getTutorById,
  getAllTutor,
  getTutorByUserId,
  deleteTutorWithUser,
  updateTutorProfile,
  // ------
  categorysetForTutorService,
  removeCategoryService,
  addSingelCategoryService,
  deleteAllCategoryService
};

// src/modules/availability/availability.controller.ts
var getALLAvailability = async (req, res) => {
  try {
    const result = await availabilityService.getAllAvailability();
    res.status(200).json(
      {
        success: true,
        data: result
      }
    );
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch availability" });
  }
};
var createAvailability2 = async (req, res) => {
  const { date, startTime, endTime } = req.body;
  try {
    if (!date || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "date, startTime, endTime fields are required"
      });
    }
    if (startTime >= endTime) {
      return res.status(400).json({
        success: false,
        message: "startTime must be before endTime"
      });
    }
    const userId = req.user.id;
    const tutor = await TutorService.getTutorByUserId(userId);
    const tutorId = tutor?.id;
    if (!tutor) {
      return res.status(400).json({
        success: false,
        message: "Tutor not found  !!!"
      });
    }
    const isAvailable = await availabilityService.isSlotAvailable(tutorId, date, startTime, endTime);
    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: "This time slot is already have  Please choose a different time."
      });
    }
    const availability = await availabilityService.createAvailability(tutorId, date, startTime, endTime);
    res.status(201).json({
      success: true,
      message: "Availability created successfully",
      data: availability
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "faild  to cretae avilability " });
  }
};
var updateAvailability2 = async (req, res) => {
  try {
    const availabilityId = Number(req.params.id);
    const { date, startTime, endTime, isBooked } = req.body;
    if (!availabilityId) {
      return res.status(400).json({
        success: false,
        message: "Availability id is required"
      });
    }
    const isExist = await availabilityService.getAvailibilityById(availabilityId);
    if (!isExist) {
      return res.status(404).json({
        success: false,
        message: "Availability not found  !!!"
      });
    }
    const userid = req.user.id;
    const tutor = await TutorService.getTutorByUserId(userid);
    if (tutor?.id !== isExist.tutorId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this availability"
      });
    }
    const updateddata = await availabilityService.updateAvailability(availabilityId, {
      date: date ? new Date(date) : isExist.date,
      startTime: startTime || isExist.startTime,
      endTime: endTime || isExist.endTime,
      isBooked: isBooked !== void 0 ? isBooked : isExist.isBooked
    });
    res.status(200).json({
      success: true,
      massage: "availability updated !!",
      data: updateddata
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update availability"
    });
  }
};
var deleteAvailability2 = async (req, res) => {
  try {
    const availabilityId = Number(req.params.id);
    if (!availabilityId) {
      return res.status(400).json({
        success: false,
        message: "Availability id is required"
      });
    }
    const isExist = await availabilityService.getAvailibilityById(availabilityId);
    if (!isExist) {
      return res.status(404).json({
        success: false,
        message: "Availability not found"
      });
    }
    const userid = req.user?.id;
    const tutor = await TutorService.getTutorByUserId(userid);
    if (!tutor || tutor.id !== isExist.tutorId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete "
      });
    }
    const deletedData = await availabilityService.deleteAvailability(availabilityId);
    res.status(200).json({
      success: true,
      message: "Availability deleted successfully",
      data: deletedData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete availability",
      error
    });
  }
};
var availabilityController = {
  getALLAvailability,
  createAvailability: createAvailability2,
  updateAvailability: updateAvailability2,
  deleteAvailability: deleteAvailability2
};

// src/modules/availability/availability.router.ts
var router = express.Router();
router.get("/", availabilityController.getALLAvailability);
router.post("/create", authorizeRoles_default("TUTOR" /* TUTOR */), availabilityController.createAvailability);
router.patch("/update/:id", authorizeRoles_default("TUTOR" /* TUTOR */), availabilityController.updateAvailability);
router.delete("/delete/:id", authorizeRoles_default("TUTOR" /* TUTOR */), availabilityController.deleteAvailability);
var availabilityRouter = router;

// src/app.ts
import cors from "cors";

// src/modules/tutor/tutor.router.ts
import express2 from "express";

// src/modules/category/category.service.ts
var getAllCategory = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "desc"
    },
    include: {
      tutors: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      }
    }
  });
  return categories;
};
var getCetegoryByIdService = async (id) => {
  return await prisma.category.findUnique({
    where: {
      id
    }
  });
};
var createCategoryService = async (name) => {
  return await prisma.category.create({
    data: {
      name
    }
  });
};
var updateCategoryService = async (id, name) => {
  return await prisma.category.update({
    where: {
      id
    },
    data: {
      name
    }
  });
};
var deleteCategoryService = async (id) => {
  return await prisma.category.delete({
    where: {
      id
    }
  });
};
var validCategoryesService = async (categoryIds) => {
  return await prisma.category.findMany({
    where: {
      id: { in: categoryIds }
    },
    select: {
      id: true
    }
  });
};
var categoryService = {
  createCategoryService,
  getAllCategory,
  getCetegoryByIdService,
  updateCategoryService,
  deleteCategoryService,
  validCategoryesService
};

// src/modules/tutor/tutor.controller.ts
var createTutor2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        error: "Unauthorized!"
      });
    }
    if (user.role !== "TUTOR" /* TUTOR */) {
      return res.status(400).json({
        error: "Unauthorized!"
      });
    }
    const result = await TutorService.createTutor(
      req.body,
      user.id,
      user.role
    );
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Tutor Profile creation failed",
      details: e
    });
  }
};
var getTutorById2 = async (req, res) => {
  try {
    const tutorId = req.params.id;
    if (!tutorId) {
      throw new Error("Tutor id  is required!");
    }
    const result = await TutorService.getTutorById(Number(tutorId));
    if (!result) {
      throw new Error("Tutor not found!");
    }
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Could not find any tutor",
      details: e.message || e
    });
  }
};
var getAllTutor2 = async (req, res) => {
  try {
    const { categories, minRating } = req.query;
    const categoryNames = categories ? categories.split(",").map((c) => c.trim()) : [];
    const result = await TutorService.getAllTutor({
      categoryNames,
      minRating: minRating ? Number(minRating) : void 0
    });
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Could not get all tutors",
      details: e.message || e
    });
  }
};
var getTutorByUser = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized: user not logged in"
      });
    }
    const tutor = await TutorService.getTutorByUserId(userId);
    if (!tutor) {
      return res.status(404).json({
        error: "Tutor profile not found for this user"
      });
    }
    res.status(200).json(tutor);
  } catch (error) {
    res.status(500).json({
      error: "Failed to get tutor",
      details: error.message
    });
  }
};
var deleteTutorbyUserid = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error("User not found");
    }
    const tutor = await TutorService.getTutorByUserId(userId);
    if (!tutor) {
      throw new Error("Tutor profile not found for this user");
    }
    if (tutor?.userId === userId) {
      const result = await TutorService.deleteTutorWithUser(userId);
      return res.status(200).json({
        message: "Tutor profile deleted successfully",
        result
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "you are not authorized"
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete tutor",
      details: error
    });
  }
};
var updateTutor = async (req, res) => {
  try {
    const user = req?.user;
    const userId = user?.id;
    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized not logged in"
      });
    }
    const tutor = await TutorService.getTutorByUserId(userId);
    if (!tutor) {
      return res.status(404).json({
        error: "There is no tutor profile for  this user "
      });
    }
    if (tutor.userId !== userId) {
      return res.status(403).json({
        error: "You are not authorized to update this tutor profile"
      });
    }
    const updatedTutor = await TutorService.updateTutorProfile(userId, req.body);
    res.status(200).json({
      success: true,
      message: "Tutor profile updated successfully",
      data: updatedTutor
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update profile  ",
      details: error.message
    });
  }
};
var setCategoryForTutor = async (req, res) => {
  try {
    let { categoryIds } = req.body;
    const user = req.user;
    if (user?.role !== "TUTOR" /* TUTOR */) {
      return res.status(403).json({
        success: false,
        message: " Only tutor can set Cetegory For Himslef/Herself"
      });
    }
    if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "categoryIds must be an array"
      });
    }
    const tutor = await TutorService.getTutorByUserId(user.id);
    if (!tutor) {
      return res.status(404).json({
        success: false,
        message: "No tutor profile  Found !!! "
      });
    }
    const validCategorys = await categoryService.validCategoryesService(categoryIds);
    const validIds = validCategorys.map((c) => c.id);
    const invalidIds = categoryIds.filter(
      (id) => !validIds.includes(id)
    );
    if (invalidIds.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid category IDs provided ",
        invalidCategoryIds: invalidIds
      });
    }
    const result = await TutorService.categorysetForTutorService(tutor.id, categoryIds);
    res.status(201).json({
      success: true,
      message: "Cetegory Added Succesfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Faild to set Cetegory for Tutor profile",
      error
    });
  }
};
var removeCategoryForTutor = async (req, res) => {
  try {
    const { categoryIds } = req.body;
    const user = req.user;
    if (user?.role !== "TUTOR" /* TUTOR */) {
      return res.status(403).json({
        success: false,
        message: "Only tutor can remove categories"
      });
    }
    if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "categoryIds must be a non-empty array"
      });
    }
    const tutor = await TutorService.getTutorByUserId(user.id);
    if (!tutor) {
      return res.status(404).json({
        success: false,
        message: "Tutor profile not found"
      });
    }
    const result = await TutorService.removeCategoryService(
      tutor.id,
      categoryIds
    );
    return res.status(200).json({
      success: true,
      message: "Categories removed successfully",
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to remove categories",
      error
    });
  }
};
var addSingelTutorCategory = async (req, res) => {
  try {
    const { categoryIds } = req.body;
    const user = req.user;
    if (user?.role !== "TUTOR" /* TUTOR */) {
      return res.status(403).json({
        success: false,
        message: " Only tutor can set Cetegory For Himslef/Herself"
      });
    }
    if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "categoryIds must be an array"
      });
    }
    const tutor = await TutorService.getTutorByUserId(user.id);
    if (!tutor) {
      return res.status(404).json({
        success: false,
        message: "No tutor profile  Found !!! "
      });
    }
    const validCategorys = await categoryService.validCategoryesService(categoryIds);
    const validIds = validCategorys.map((c) => c.id);
    const invalidIds = categoryIds.filter(
      (id) => !validIds.includes(id)
    );
    if (invalidIds.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid category IDs provided ",
        invalidCategoryIds: invalidIds
      });
    }
    const result = await TutorService.addSingelCategoryService(tutor.id, categoryIds);
    res.status(201).json({
      success: true,
      message: "Added singel Category",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Adding category Faild ",
      error
    });
  }
};
var deleteAllCategoryForTutor = async (req, res) => {
  try {
    const user = req.user;
    if (user?.role !== "TUTOR" /* TUTOR */) {
      return res.status(403).json({
        success: false,
        message: "Only tutor can remove categories"
      });
    }
    const tutor = await TutorService.getTutorByUserId(user.id);
    if (!tutor) {
      return res.status(404).json({
        success: false,
        message: "Tutor profile not found"
      });
    }
    const result = await TutorService.deleteAllCategoryService(tutor.id);
    res.status(200).json({
      success: true,
      message: "all Category Deleted Succesfully ",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Faild to delete All Category "
    });
  }
};
var TutorController = {
  createTutor: createTutor2,
  getAllTutor: getAllTutor2,
  getTutorById: getTutorById2,
  getTutorByUser,
  deleteTutorbyUserid,
  updateTutor,
  //------Category ----
  setCategoryForTutor,
  removeCategoryForTutor,
  addSingelTutorCategory,
  deleteAllCategoryForTutor
};

// src/modules/tutor/tutor.router.ts
var router2 = express2.Router();
router2.post(
  "/",
  authorizeRoles_default("TUTOR" /* TUTOR */),
  TutorController.createTutor
);
router2.get("/byuser", authorizeRoles_default("TUTOR" /* TUTOR */), TutorController.getTutorByUser);
router2.patch(
  "/byuser",
  authorizeRoles_default("TUTOR" /* TUTOR */),
  TutorController.updateTutor
);
router2.delete(
  "/byUserid",
  authorizeRoles_default("TUTOR" /* TUTOR */, "ADMIN" /* ADMIN */),
  TutorController.deleteTutorbyUserid
);
router2.post("/add-category", authorizeRoles_default("TUTOR" /* TUTOR */), TutorController.setCategoryForTutor);
router2.delete("/delete-category", authorizeRoles_default("TUTOR" /* TUTOR */), TutorController.removeCategoryForTutor);
router2.post("/add-singelCategory", authorizeRoles_default("TUTOR" /* TUTOR */), TutorController.addSingelTutorCategory);
router2.delete("/delete-all_category", authorizeRoles_default("TUTOR" /* TUTOR */), TutorController.deleteAllCategoryForTutor);
router2.get("/", TutorController.getAllTutor);
router2.get(
  "/:id",
  TutorController.getTutorById
);
var tutorRouter = router2;

// src/modules/category/category.router.ts
import express3 from "express";

// src/modules/category/category.controller.ts
var getAllCetogories = async (req, res) => {
  try {
    const data = await categoryService.getAllCategory();
    res.status(200).json({
      success: true,
      message: "All categories retrieved successfully",
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fatch  categories",
      error
    });
  }
};
var getCategoryById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: " Invalid  id"
      });
    }
    const result = await categoryService.getCetegoryByIdService(id);
    res.status(200).json({
      success: true,
      message: "Cetegory data Fatched Successfully ",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fatch ",
      error
    });
  }
};
var createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "name field is requeard"
      });
    }
    if (typeof name !== "string") {
      return res.status(400).json({
        message: " name must be a string"
      });
    }
    const result = await categoryService.createCategoryService(name);
    res.status(200).json({
      success: true,
      message: "cetegory created succesfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create  categories",
      error
    });
  }
};
var updateCategory = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: " Invalid  id"
      });
    }
    if (typeof name !== "string") {
      return res.status(400).json({
        message: " name must be a string"
      });
    }
    const result = await categoryService.updateCategoryService(id, name);
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "faild to update ",
      error
    });
  }
};
var deleteCategory = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        message: "id must be an number "
      });
    }
    const result = await categoryService.deleteCategoryService(id);
    res.status(200).json({
      success: true,
      message: " Deleted successfully ",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to delete Cetegory",
      error
    });
  }
};
var categoryController = {
  getAllCetogories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};

// src/modules/category/category.router.ts
var router3 = express3.Router();
router3.get(
  "/",
  categoryController.getAllCetogories
);
router3.post("/", categoryController.createCategory);
router3.get("/:id", categoryController.getCategoryById);
router3.put("/:id", categoryController.updateCategory);
router3.delete("/:id", categoryController.deleteCategory);
var categoryRouter = router3;

// src/modules/user/user.router.ts
import express4 from "express";

// src/modules/user/user.service.ts
var getCurentUserservice = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    }
  });
  return user;
};
var getuserbyIdService = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true
    }
  });
  return user;
};
var updateUserProfileService = async (userId, payload) => {
  return prisma.user.update({
    where: {
      id: userId
    },
    data: payload
  });
};
var deleteProfileService = async (userId) => {
  return prisma.user.delete({
    where: {
      id: userId
    }
  });
};
var getAllUsersService = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    }
  });
  return users;
};
var userStatusUpdateService = async (id, status) => {
  try {
    return await prisma.user.update({
      where: { id },
      data: { status }
    });
  } catch (error) {
    if (error instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new Error("User not found");
      }
    }
    throw error;
  }
};
var userSesionDeleteAfterbanned = async (userId) => {
  await prisma.session.deleteMany({
    where: {
      userId
    }
  });
};
var userService = {
  getCurentUserservice,
  getuserbyIdService,
  updateUserProfileService,
  deleteProfileService,
  getAllUsersService,
  userStatusUpdateService,
  userSesionDeleteAfterbanned
  ///
};

// src/modules/user/user.controller.ts
var getAllUser = async (req, res) => {
  try {
    const user = req?.user;
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized  Login required"
      });
    }
    if (user?.role !== "ADMIN" /* ADMIN */) {
      return res.status(403).json({
        message: "Forbidden: Admin only"
      });
    }
    const result = await userService.getAllUsersService();
    res.status(200).json({
      success: true,
      message: "All user fatched succesfully ",
      data: result
    });
  } catch (err) {
    res.status(500).json({
      succes: false,
      message: "Faild to fatched all User ",
      error: err
    });
  }
};
var updateStatusByAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;
    const user = req?.user;
    if (user?.role !== "ADMIN" /* ADMIN */) {
      return res.status(403).json({
        message: "unAuthorige to updete User Status"
      });
    }
    if (status !== UserStatus.ACTIVE && status !== UserStatus.BANNED) {
      return res.status(400).json({
        success: false,
        message: "Status must be ACTIVE or BANNED"
      });
    }
    const result = await userService.userStatusUpdateService(id, status);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    if (status === UserStatus.BANNED) {
      await userService.userSesionDeleteAfterbanned(result.id);
    }
    return res.status(200).json({
      success: true,
      message: status === UserStatus.BANNED ? "User banned and all sessions invalidated" : "User activated successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User status update faild ",
      error
    });
  }
};
var getCurentUser = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({
        error: " Unauthorized!!!"
      });
    }
    const user = await userService.getCurentUserservice(userId);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch user",
      details: error.message
    });
  }
};
var getuserbyid = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        error: " wrong  user id !!!"
      });
    }
    const user = await userService.getuserbyIdService(userId);
    res.status(200).json({
      success: true,
      messege: "user fetched successfully ",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch user",
      details: error.message
    });
  }
};
var updateUser = async (req, res) => {
  try {
    const user = req?.user;
    const userId = user?.id;
    const { name, image, status } = req.body;
    if (!userId) {
      return res.status(400).json({
        error: " Unauthorized !!!"
      });
    }
    if (user?.role !== "ADMIN" /* ADMIN */) {
      const updatedUser = await userService.updateUserProfileService(
        userId,
        {
          name,
          image
        }
      );
      return res.status(200).json({
        success: true,
        messege: "user profile updated successfully ",
        data: updatedUser
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update user profile",
      details: error.message
    });
  }
};
var deleteProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({
        error: "you are not authorized !!!"
      });
    }
    await userService.deleteProfileService(userId);
    res.status(200).json({
      success: true,
      messege: "user deleted successfully "
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete ",
      details: error.message
    });
  }
};
var userController = {
  getCurentUser,
  getuserbyid,
  updateUser,
  deleteProfile,
  getAllUser,
  updateStatusByAdmin
};

// src/modules/user/user.router.ts
var router4 = express4.Router();
router4.get("/me", authorizeRoles_default("ADMIN" /* ADMIN */, "STUDENT" /* STUDENT */), userController.getCurentUser);
router4.patch("/me", authorizeRoles_default("ADMIN" /* ADMIN */, "STUDENT" /* STUDENT */, "TUTOR" /* TUTOR */), userController.updateUser);
router4.delete("/me", authorizeRoles_default("ADMIN" /* ADMIN */, "STUDENT" /* STUDENT */, "TUTOR" /* TUTOR */), userController.deleteProfile);
router4.get("/all", userController.getAllUser);
router4.get("/:id", userController.getuserbyid);
var userRouter = router4;

// src/modules/booking/booking.router.ts
import express5 from "express";

// src/modules/booking/booking.service.ts
var getAllBookingservice = async () => {
  return await prisma.booking.findMany({
    include: {
      student: true,
      tutor: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
var createBookingService = async (data) => {
  return await prisma.booking.create({
    data: {
      studentId: data.studentId,
      tutorId: data.tutorId,
      status: data.status || BookingStatus.CONFIRMED
    }
  });
};
var updateBookingService = async (bookingId, status) => {
  return await prisma.booking.update({
    where: {
      id: bookingId
    },
    data: {
      status
    }
  });
};
var getBookingByUserIdService = async (userId) => {
  return await prisma.booking.findMany({
    where: {
      studentId: userId
    },
    include: {
      tutor: true
    }
  });
};
var getBookingByBookingidService = async (id) => {
  return await prisma.booking.findUniqueOrThrow({
    where: {
      id
    }
  });
};
var getBookingForTutorService = async (userId) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: { userId }
  });
  if (!tutor) {
    throw new Error("Tutor profile not found");
  }
  const bookings = await prisma.booking.findMany({
    where: {
      tutorId: tutor.id
    },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return bookings;
};
var bookingService = {
  createBookingService,
  updateBookingService,
  getBookingByUserIdService,
  getAllBookingservice,
  getBookingByBookingidService,
  getBookingForTutorService
};

// src/modules/booking/booking.controller.ts
var createBooking = async (req, res) => {
  try {
    const user = req?.user;
    if (!user) {
      return res.status(400).json({
        error: "Unauthorized  login required  !! "
      });
    }
    if (user.role !== "STUDENT" /* STUDENT */) {
      return res.status(400).json({
        error: "Unauthorized  Only student can book  a tutor  !!"
      });
    }
    const { tutorId, status } = req.body;
    const result = await bookingService.createBookingService({
      studentId: user.id,
      tutorId: Number(tutorId),
      status
    });
    res.status(201).json({
      success: true,
      message: " Booking created successfully ",
      data: result
    });
  } catch (e) {
    res.status(500).json({
      message: false,
      error: "Booking creation failed !!",
      details: e
    });
  }
};
var updateBooking = async (req, res) => {
  try {
    const { bookingId, status } = req.body;
    const user = req.user;
    if (!bookingId || !status) {
      return res.status(400).json({
        success: false,
        message: "Booking ID and status are required"
      });
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const booking = await bookingService.getBookingByBookingidService(Number(bookingId));
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }
    if (user.role === "STUDENT" /* STUDENT */) {
      if (booking.studentId !== user.id) {
        return res.status(403).json({
          success: false,
          message: "You can update only your own bookings "
        });
      }
      if (status !== BookingStatus.CANCELLED) {
        return res.status(403).json({
          success: false,
          message: " Student can only cancel their bookings "
        });
      }
    } else if (user.role === "TUTOR" /* TUTOR */) {
      const tutorProfile = await TutorService.getTutorByUserId(user.id);
      if (!tutorProfile || booking.tutorId !== tutorProfile.id) {
        return res.status(403).json({
          success: false,
          message: "You can update only yours"
        });
      }
      if (status !== BookingStatus.COMPLETED && status !== BookingStatus.CANCELLED) {
        return res.status(403).json({
          success: false,
          message: "Tutor can only mark completed or cancel"
        });
      }
    } else if (user.role === "ADMIN" /* ADMIN */) {
    } else {
      return res.status(403).json({
        success: false,
        message: "Role not allowed to update booking"
      });
    }
    const updatedBooking = await bookingService.updateBookingService(Number(bookingId), status);
    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update booking",
      details: error.message
    });
  }
};
var getBookingByUserId = async (req, res) => {
  try {
    const user = req?.user;
    if (!user) {
      return res.status(400).json({
        error: " Unauthorized  login required  !! "
      });
    }
    const bookings = await bookingService.getBookingByUserIdService(user.id);
    res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch bookings",
      details: error.message
    });
  }
};
var getAllBooking = async (req, res) => {
  try {
    const user = req?.user;
    if (user?.role !== "ADMIN" /* ADMIN */) {
      return res.status(400).json({
        success: false,
        error: " Unauthorized  you are not an admin   !! "
      });
    }
    const result = await bookingService.getAllBookingservice;
    res.status(200).json({
      success: true,
      message: "data fatched succesfull",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fatch  all  bookings",
      details: error.message
    });
  }
};
var getBookingById = async (req, res) => {
  try {
    const user = req?.user;
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).json({
        success: false,
        error: "id is requered "
      });
    }
    const booking = await bookingService.getBookingByBookingidService(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    if (booking.studentId !== user?.id) {
      return res.status(403).json({
        error: "You are not allowed to view this booking"
      });
    }
    res.status(200).json({
      success: true,
      message: "booking succesfully fatched",
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch  booking",
      details: error.message
    });
  }
};
var getBookingForTutor = async (req, res) => {
  try {
    const user = req.user;
    const userid = user?.id;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const result = await bookingService.getBookingForTutorService(userid);
    res.status(200).json({
      success: true,
      message: " all booking fetched succesfully ",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch bookings"
    });
  }
};
var bookingController = {
  createBooking,
  updateBooking,
  getBookingByUserId,
  getAllBooking,
  getBookingById,
  getBookingForTutor
};

// src/modules/booking/booking.router.ts
var router5 = express5.Router();
router5.post("/", authorizeRoles_default("STUDENT" /* STUDENT */), bookingController.createBooking);
router5.patch("/update", authorizeRoles_default("STUDENT" /* STUDENT */, "ADMIN" /* ADMIN */, "TUTOR" /* TUTOR */), bookingController.updateBooking);
router5.get("/me", authorizeRoles_default("STUDENT" /* STUDENT */, "TUTOR" /* TUTOR */), bookingController.getBookingByUserId);
router5.get("/:id", authorizeRoles_default("STUDENT" /* STUDENT */), bookingController.getBookingById);
router5.get("/tutor/my-bookings", authorizeRoles_default("TUTOR" /* TUTOR */), bookingController.getBookingForTutor);
router5.get("/all", authorizeRoles_default("ADMIN" /* ADMIN */), bookingController.getAllBooking);
var bookingRouter = router5;

// src/modules/review/review.router.ts
import express6 from "express";

// src/modules/review/review.service.ts
var createReviewService = async (studentId, tutorId, rating, comment) => {
  return await prisma.review.create({
    data: {
      studentId,
      tutorId,
      rating,
      comment
    }
  });
};
var getReviewsByTutorIdService = async (tutorId) => {
  return await prisma.review.findMany({
    where: { tutorId },
    include: {
      student: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
};
var getReviewByReviewIdService = async (id) => {
  return await prisma.review.findUnique({
    where: {
      id
    },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      tutor: {
        select: {
          id: true,
          bio: true,
          pricePerHr: true,
          userId: true
        }
      }
    }
  });
};
var getAllReviewsService = async () => {
  return await prisma.review.findMany({
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      tutor: {
        select: {
          id: true,
          bio: true,
          pricePerHr: true,
          userId: true
        }
      }
    }
  });
};
var updateReviewService = async (studentId, tutorId, rating, comment) => {
  return await prisma.review.update({
    where: {
      studentId_tutorId: { studentId, tutorId }
    },
    data: { rating, comment }
  });
};
var deleteReviewService = async (studentId, tutorId) => {
  return await prisma.review.delete({
    where: {
      studentId_tutorId: { studentId, tutorId }
    }
  });
};
var reviewService = {
  createReviewService,
  getReviewsByTutorIdService,
  getReviewByReviewIdService,
  getAllReviewsService,
  updateReviewService,
  deleteReviewService
};

// src/modules/review/review.controller.ts
var createReview = async (req, res) => {
  try {
    const { tutorId, rating, comment } = req.body;
    const user = req?.user;
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized !!"
      });
    }
    if (user.role !== "STUDENT" /* STUDENT */) {
      return res.status(403).json({
        message: " Only Student Can give  review "
      });
    }
    if (typeof tutorId !== "number" || typeof rating !== "number") {
      return res.status(400).json({
        messsage: "Tutorid or rating  must be a Number"
      });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5"
      });
    }
    if (typeof comment !== "string" || comment.trim() === "") {
      return res.status(400).json({
        message: "Comment is required and must be a non-empty string"
      });
    }
    const result = await reviewService.createReviewService(user.id, tutorId, rating, comment);
    res.status(201).json({
      success: true,
      message: "Review created successfully !",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Create Review ",
      error
    });
  }
};
var getReviewsByTutorId = async (req, res) => {
  try {
    const tutorId = Number(req.params.tutorId);
    if (!tutorId) {
      return res.status(400).json({
        message: "Tutor id is requard "
      });
    }
    const reviews = await reviewService.getReviewsByTutorIdService(tutorId);
    res.status(200).json({
      success: true,
      message: " Reviews fached succesfully",
      data: reviews
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message || e
    });
  }
};
var getReviewByReviewid = async (req, res) => {
  try {
    const reviewId = Number(req.params.id);
    if (!reviewId) {
      return res.status(400).json({
        message: "reviewId is is requard "
      });
    }
    const result = await reviewService.getReviewByReviewIdService(reviewId);
    res.status(200).json({
      success: true,
      message: "review fatched successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Review fached faild ",
      error
    });
  }
};
var getAllReviews = async (req, res) => {
  try {
    const user = req?.user;
    if (user?.role !== "ADMIN" /* ADMIN */) {
      return res.status(403).json({
        success: false,
        message: "Only admin can see All reviews "
      });
    }
    const result = await reviewService.getAllReviewsService();
    res.status(200).json({
      success: true,
      message: "All reviews Fatched successfully ",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Reviews fatched Failed !",
      error
    });
  }
};
var updateReview = async (req, res) => {
  try {
    const { tutorId, rating, comment } = req.body;
    const studentId = req.user?.id;
    if (typeof tutorId !== "number" || typeof rating !== "number") {
      return res.status(400).json({
        message: "tutor id and rating must be an nubmber "
      });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5"
      });
    }
    if (typeof comment !== "string" || comment.trim() === "") {
      return res.status(400).json({
        message: "Comment is required and must be a non-empty string"
      });
    }
    if (!studentId || req.user?.role !== "STUDENT" /* STUDENT */) {
      return res.status(403).json({
        message: "Unauthorized "
      });
    }
    const review = await reviewService.updateReviewService(studentId, tutorId, rating, comment);
    res.status(200).json({
      success: true,
      data: review
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message || e
    });
  }
};
var deleteReview = async (req, res) => {
  try {
    const tutorId = Number(req.params.tutorId);
    const studentId = req.user?.id;
    const result = await reviewService.deleteReviewService(studentId, tutorId);
    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: result
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message || e
    });
  }
};
var reviewController = {
  createReview,
  getReviewsByTutorId,
  getReviewByReviewid,
  getAllReviews,
  updateReview,
  deleteReview
};

// src/modules/review/review.router.ts
var router6 = express6.Router();
router6.get("/bytutor/:tutorId", reviewController.getReviewsByTutorId);
router6.get("/:id", reviewController.getReviewByReviewid);
router6.post("/", authorizeRoles_default("STUDENT" /* STUDENT */), reviewController.createReview);
router6.put("/update", authorizeRoles_default("STUDENT" /* STUDENT */), reviewController.updateReview);
router6.get("/all", authorizeRoles_default("ADMIN" /* ADMIN */), reviewController.getAllReviews);
var reviewRouter = router6;

// src/app.ts
var app = express7();
var allowedOrigins = [
  process.env.APP_URL || "http://localhost:4000",
  process.env.PROD_APP_URL
  // Production frontend URL
].filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.includes(origin) || /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin);
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"]
  })
);
app.use(express7.json());
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/user", userRouter);
app.use("/api/tutors", tutorRouter);
app.use("/api/tutors-availability", availabilityRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/review", reviewRouter);
app.use("/api/category", categoryRouter);
app.get(
  "/",
  (req, res) => {
    res.send("welcome  to server");
  }
);
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
