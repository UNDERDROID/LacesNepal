import prisma from "../prisma/prismaClient.js";

export const createRoleService = async (roleName) => {
    const existingRole = await prisma.role.findUnique({
        where: { name: roleName },
    });

    if (existingRole) {
        throw new Error("Role already exists");
    }

    const newRole = await prisma.role.create({
        data: { name: roleName },
    });

    return newRole;
}

export const getAllRolesService = async () => {
    const roles = await prisma.role.findMany({
        include: {
            permissions: true,
        }
    });
    return roles;
}

export const addPermissionToRoleService = async (roleId, permissionId) => {
    const role = await prisma.role.findUnique({
        where: { id: roleId },
    });

    if (!role) {
        throw new Error("Role not found");
    }

    const permission = await prisma.permission.findUnique({
        where: { id: permissionId },
    });

    if (!permission) {
        throw new Error("Permission not found");
    }

    const updatedRole = await prisma.role.update({
        where: { id: roleId },
        data: {
            permissions: {
                connect: { id: permissionId },
            },
        },
    });

    return updatedRole;
}