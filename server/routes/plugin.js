const express = require('express')
const {
  verifyPlugin,
  attach,
  detach,
  update,
  getPlugin,
  createPlugin,
  updatePlugin,
  patchPlugin,
  deletePlugin,
  userAuthorized,
} = require('../controllers/plugins')
const router = express.Router()
const protect = require('../middleware/auth')
const { userCanEditBoard } = require('../middleware/userCanEditBoard')

router.route('/plugins/:cardId/:pluginKey').get(protect, attach)
router
  .route('/plugins/:pluginId/destroy/:cardId')
  .get(protect, userAuthorized, verifyPlugin, detach)

router
  .route('/plugins/:pluginId/get')
  .get(protect, userAuthorized, verifyPlugin, getPlugin)
router
  .route('/plugins/:pluginId/create')
  .post(protect, userAuthorized, verifyPlugin, createPlugin)
router
  .route('/plugins/:pluginId/update')
  .put(protect, userAuthorized, verifyPlugin, updatePlugin)
router
  .route('/plugins/:pluginId/patch')
  .patch(protect, userAuthorized, verifyPlugin, patchPlugin)
router
  .route('/plugins/:pluginId/delete')
  .delete(protect, userAuthorized, verifyPlugin, deletePlugin)

module.exports = router
