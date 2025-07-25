import express from 'express';
import {
    getUsers,
    createUser,
    loginUser,
    updateUser,
    refreshAccessToken,
    updateUserRole
} from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.post('/', createUser);
userRouter.post('/login', loginUser);
userRouter.post('/refresh-token', refreshAccessToken);
userRouter.put('/:id', updateUser);
userRouter.put('/role/:id', updateUserRole);

export default userRouter;