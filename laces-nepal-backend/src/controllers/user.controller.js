import {
    getAllUsersService,
    createNewUserService
} from "../services/user.service.js";

export const getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const users = await getAllUsersService(page, limit);
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const createUser = async (req, res) => {
    try {
        const userData = req.body;
        if (!userData.name || !userData.email || !userData.password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newUser = await createNewUserService(userData);
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}