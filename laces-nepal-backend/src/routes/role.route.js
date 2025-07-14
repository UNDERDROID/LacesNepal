import express from 'express';
import {
    createRole,
    getAllRoles,
    addPermissionToRole
} from '../controllers/role.controller.js';
import { hasPermission } from '../middleware/permission.middleware.js';

const roleRouter = express.Router();

roleRouter.post('/', hasPermission("Create Roles"), createRole);
roleRouter.get('/', getAllRoles);
roleRouter.post('/add-permission', addPermissionToRole);

export default roleRouter;