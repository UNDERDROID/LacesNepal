import prisma from "../prisma/prismaClient.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

export const updateUserService = async (userId, userData) => {
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: userData,
    });
    return updatedUser;
}

export const loginUserService = async (email, password) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const accessToken = jwt.sign(
        {
            userId: user.id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    const refreshToken = jwt.sign(
        {
            userId: user.id,
        },
        process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    return { user, accessToken, refreshToken };

}

export const refreshTokenService = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
        });

        if (!user) {
            throw new Error('User not found');
        }

        const newAccessToken = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        return { accessToken: newAccessToken };
    } catch (error) {
        throw new Error('Invalid refresh token' + error.message);
    }
}