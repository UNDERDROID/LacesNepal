import prisma from "../prisma/prismaClient.js";

export const createCategoryService = async (name) => {
    const existing = await prisma.category.findUnique({ where: { name } });
    if (existing) {
        throw new Error("Category already exists");
    }

    const category = await prisma.category.create({
        data: { name },
    });
    return category;
};
