import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const existingAdmin = await prisma.user.findUnique({
        where: { email: 'admin@lacesnepal.com' },
    });

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await prisma.user.create({
            data: {
                name: 'Admin',
                email: 'admin@lacesnepal.com',
                password: hashedPassword,
                role: 'ADMIN',
            },
        });
        console.log('Admin user created');
    } else {
        console.log('Admin already exists');
    }
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
    });