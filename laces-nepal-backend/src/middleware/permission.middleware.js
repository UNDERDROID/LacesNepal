import jwt from 'jsonwebtoken';
import prisma from '../prisma/prismaClient.js';

export const hasPermission = (permissionName) => {
    return async (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access token is required' });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }

            const userId = decoded.userId;

            try {
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

                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                const permissionExists = user.role.some(role =>
                    role.permissions.some(permission => permission.name === permissionName)
                );

                if (!permissionExists) {
                    return res.status(403).json({ message: 'You do not have permission to perform this action' });
                }

                next();
            } catch (error) {
                console.error("Error checking permissions:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    };
};