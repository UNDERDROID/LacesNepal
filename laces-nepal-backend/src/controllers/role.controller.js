import {
    createRoleService,
    getAllRolesService,
    addPermissionToRoleService
} from "../services/role.service.js";

export const createRole = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || typeof name !== "string") {
            return res.status(400).json({ message: "Invalid role name" });
        }

        const role = await createRoleService(name);
        return res.status(201).json({ message: "Role created successfully", role });

    } catch (error) {
        const message = error.message === "Role already exists"
            ? error.message
            : "Internal server error";
        const status = error.message === "Role already exists" ? 409 : 500;

        res.status(status).json({ message });
    }
}

export const getAllRoles = async (req, res) => {
    try {
        const roles = await getAllRolesService();
        return res.status(200).json(roles);
    } catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const addPermissionToRole = async (req, res) => {
    try {
        const { roleId, permissionId } = req.body;

        if (!roleId || !permissionId) {
            return res.status(400).json({ message: "Role ID and Permission ID are required" });
        }

        const updatedRole = await addPermissionToRoleService(roleId, permissionId);
        return res.status(200).json({ message: "Permission added to role successfully", updatedRole });

    } catch (error) {
        console.error("Error adding permission to role:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}