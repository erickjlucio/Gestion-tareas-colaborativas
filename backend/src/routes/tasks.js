import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authRequired, requireRole } from '../middlewares/auth.js';
import { listMyTasks, getTask, createTaskCtl, updateTaskCtl, deleteTaskCtl } from '../controllers/taskController.js';
import { listComments, addComment } from '../controllers/commentController.js';

const router = Router();

// File upload setup
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, uploadDir); },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\W+/g, '_');
    cb(null, `${Date.now()}_${name}${ext}`);
  }
});
const upload = multer({ storage });

// All routes require auth
router.use(authRequired);

// list (own or all if admin with ?all=1)
router.get('/', listMyTasks);

// admin view of all tasks (explicit route)
router.get('/admin/all', requireRole('admin'), (req, res, next) => {
  req.query.all = '1';
  next();
}, listMyTasks);

// create
router.post('/', upload.single('attachment'), createTaskCtl);

// read one
router.get('/:id', getTask);

// update
router.put('/:id', upload.single('attachment'), updateTaskCtl);

// delete
router.delete('/:id', deleteTaskCtl);

// comments
router.get('/:id/comments', listComments);
router.post('/:id/comments', addComment);

// download attachment
router.get('/:id/attachment', async (req, res, next) => {
  try {
    const { Task } = await import('../models/index.js');
    const task = await Task.findByPk(req.params.id);
    if (!task || !task.attachmentPath) return res.status(404).json({ error: 'Archivo no encontrado' });
    res.sendFile(path.resolve(task.attachmentPath));
  } catch (e) { next(e); }
});

export default router;
