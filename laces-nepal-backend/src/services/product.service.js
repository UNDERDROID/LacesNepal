import prisma from "../prisma/prismaClient.js";

export const getPaginatedProductsService = async (page, limit) => {
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

export const createNewProductService = async (productData) => {
    const newProduct = await prisma.product.create({
        data: {
            ...productData,
        },
    });
    return newProduct;
}

export const deleteProductByIdService = async (productId) => {
    const deletedProduct = await prisma.product.delete({
        where: {
            id: productId,
        },
    });
    return deletedProduct;
}

export const updateProductService = async (productId, productData) => {
    const updatedProduct = await prisma.product.update({
        where: {
            id: productId,
        },
        data: {
            ...productData,
        },
    });
    return updatedProduct;
}