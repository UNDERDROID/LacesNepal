import express from 'express';
import {
    createRole,
    getAllRoles,
    addPermissionToRole
} from '../controllers/role.controller.js';

const roleRouter = express.Router();

roleRouter.post('/', createRole);
roleRouter.get('/', getAllRoles);
roleRouter.post('/add-permission', addPermissionToRole);

export default roleRouter;