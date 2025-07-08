import {
    createPermissionService,
    getAllPermissionsService
} from "../services/permission.service.js";

export const createPermission = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || typeof name !== "string") {
            return res.status(400).json({ message: "Invalid permission name" });
        }

        const permission = await createPermissionService(name);
        return res.status(201).json({ message: "Permission created successfully", permission });

    } catch (error) {
        const message = error.message === "Permission already exists"
            ? error.message
            : "Internal server error";
        const status = error.message === "Permission already exists" ? 409 : 500;

        res.status(status).json({ message });
    }
}

export const getAllPermissions = async (req, res) => {
    try {
        const permissions = await getAllPermissionsService();
        return res.status(200).json(permissions);
    } catch (error) {
        console.error("Error fetching permissions:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}