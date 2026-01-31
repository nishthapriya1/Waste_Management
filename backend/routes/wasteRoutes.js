import express from 'express';
import {
  createWaste,
  getAllWastes,
  assignDriver,
  updateStatus,
  upload
} from '../controllers/wasteController.js';

import { protect } from '../middleware/auth.js';
import { authRole } from '../middleware/role.js';

const router = express.Router();

router.post(
  '/create',
  protect,
  authRole(['user']),      // ✅ check role first
  upload.single('image'),  // ✅ upload only if authorized
  createWaste
);

router.get(
  '/all',
  protect,
  authRole(['admin', 'driver','user']),
  getAllWastes
);

router.put(
  '/assign',
  protect,
  authRole(['admin']),
  assignDriver
);

// router.put(
//   '/status',
//   protect,
//   authRole(['driver']),
//   updateStatus
// );
router.patch(
  '/:id/status',
  protect,
  authRole(['driver']),
  updateStatus
);
export default router;
