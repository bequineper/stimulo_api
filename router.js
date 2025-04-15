import Router from 'express';
import {
  loginUser,
  registerUser, 
  getUserProfile,
  adminGetUser,
  adminGetAllUsers,
  


} from './controllers/userController.js';
import {
    createFile,
    deleteFile,
    getFile,
    listFiles,
    updateFileContent,
    updateFileName
  } from "./controllers/fileController.js";
import {
  createPackage,
  listPackages,
  getPackageFiles,
  updatePackageName,
  deletePackage,
  addFilesToPackage,
  removeFileFromPackage
} from './controllers/packageController.js';



import {
  authenticateToken,
  isAdmin
} from "./middleware/auth.js";

const router = Router();


// Admin Routes
router.get (`/admin/users`,authenticateToken, isAdmin, adminGetAllUsers);
router.get  ('/admin/:id', authenticateToken, adminGetUser);
// router.delete (`/admin/:id`, authenticateToken, isAdmin, adminDeleteUser);


// User routes
router.post ('/register', registerUser);
router.post ('/login', loginUser);
router.get(`/me`, authenticateToken, getUserProfile)

// File Routes
router.get('/me/files', authenticateToken, listFiles);
router.post('/file', authenticateToken, createFile);
router.get('/file/:id', authenticateToken, getFile);
router.delete('/file/:id', authenticateToken, deleteFile);
router.put('/file/:id', authenticateToken, updateFileContent);
router.patch('/file/:id', authenticateToken, updateFileName);

// Package Routes
router.post('/package', authenticateToken, createPackage);
router.get('/package', authenticateToken, listPackages);
router.get('/package/:id', authenticateToken, getPackageFiles);
router.patch('/package/:id', authenticateToken, updatePackageName);
router.delete('/package/:id', authenticateToken, deletePackage);
router.post('/package/:id/files', authenticateToken, addFilesToPackage);
router.delete('/package/:id/files/:fileId', authenticateToken, removeFileFromPackage);




export default router;



// Rotas desativadas ----------------------------------------------------------

// Rota para listar todos os arquivos de um usuário especifico;
// router.get('/file/:name', authenticateToken, listFiles);



// -------------------------------------------------------------------------------