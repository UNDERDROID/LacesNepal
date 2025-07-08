import prisma from "../prisma/prismaClient.js";

export const createPermissionService = async (permissionName) => {
    const existingPermission = await prisma.permission.findUnique({
        where: { name: permissionName },
    });

    if (existingPermission) {
        throw new Error("Permission already exists");
    }

    const newPermission = await prisma.permission.create({
        data: { name: permissionName },
    });

    return newPermission;
}

export const getAllPermissionsService = async () => {
    const permissions = await prisma.permission.findMany();
    return permissions;
}

export const userHasPermission = async (userId, permissionName) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            role: {
                include: {
                    permissions: true,
                },
            },
        },
    });

    if (!user) return false;

    const hasPermission = user.role.some(role =>
        role.permissions.some(permission => permission.name === permissionName)
    );

    return hasPermission;
};
