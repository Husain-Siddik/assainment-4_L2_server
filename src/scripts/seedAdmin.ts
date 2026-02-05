
import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/authorizeRoles";



async function seedAdmin() {

    try {

        const adminData = {
            name: process.env.ADMIN_NAME as string,
            email: process.env.ADMIN_EMAIL as string,
            role: UserRole.ADMIN,
            password: process.env.ADMIN_PASS
        }


        const existsAdmin = await prisma.user.findUnique({
            where: {
                email: adminData.email
            }
        })


        if (existsAdmin) {
            throw new Error("Admin already exists")

        }
        const res = await fetch("http://localhost:3000/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Origin": "http://localhost:4000"
            },
            body: JSON.stringify(adminData),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error(" Failed to seed admin:", data);
            return;
        }

        console.log(" Admin seeded successfully");



    } catch (error) {

        console.log(error);


    }

}

seedAdmin() 