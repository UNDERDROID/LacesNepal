import express from 'express';
import {
    createPermission,
    getAllPermissions,
} from '../controllers/permission.controller.js';

const permissionRouter = express.Router();

permissionRouter.post('/', createPermission);
permissionRouter.get('/', getAllPermissions);

export default permissionRouter;