import Router from 'express';
import {
  loginUser,
  registerUser, 
  getUserProfile,
  adminGetUser
} from './controllers/userController.js';
import {
    createFile,
    deleteFile,
    getFile,
    listFiles
  } from "./controllers/fileController.js";
import {authenticateToken} from "./middleware/auth.js";

const router = Router();

router.post ('/register', registerUser);
router.post ('/login', loginUser);
router.get  ('/admin/:id', adminGetUser);

router.get(`/me`, authenticateToken, getUserProfile)

router.post('/file', authenticateToken, createFile);
router.get('/file/:name', authenticateToken, listFiles);
router.get('/file/:id', authenticateToken, getFile);
router.delete('/file/:id', authenticateToken, deleteFile);

export default router;

