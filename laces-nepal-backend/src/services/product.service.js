import prisma from "../prisma/prismaClient.js";

export const getPaginatedProducts = async (page, limit) => {
    const skip = (page - 1) * limit;
    const products = await prisma.product.findMany({
        skip: skip,
        take: limit,
        orderBy: {
            createdAt: 'desc',
        },
    });

    return products;
};

export const createNewProduct = async (productData) => {
    const newProduct = await prisma.product.create({
        data: {
            ...productData,
        },
    });
    return newProduct;
}