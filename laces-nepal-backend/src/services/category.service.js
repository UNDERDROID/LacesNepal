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

export const getAllCategoriesService = async () => {
    const categories = await prisma.category.findMany({
        orderBy: {
            name: 'desc',
        },
        include: {
            products: true,
        },
    });
    return categories;
}

export const addProductToCategoryService = async (categoryId, productId) => {
    const category = await prisma.category.update({
        where: { id: categoryId },
        data: {
            products: {
                connect: { id: productId },
            },
        },
    });
    return category;
};

export const deleteCategoryService = async (categoryId) => {
    const deletedCategory = await prisma.category.delete({
        where: { id: categoryId },
    });
    return deletedCategory;
};