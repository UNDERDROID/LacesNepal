import prisma from "../prisma/prismaClient.js";
import bcrypt from 'bcrypt';

export const getAllUsersService = async (page, limit) => {
    const skip = (page - 1) * limit;
    const users = await prisma.user.findMany({
        skip: skip,
        take: limit,
        orderBy: {
            createdAt: 'desc',
        },
    });
    return users;
}

export const createNewUserService = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await prisma.user.create({
        data: {
            ...userData,
            password: hashedPassword,
        },
    });

    return newUser;
}