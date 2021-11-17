const pluginList = require('../plugin')
const asyncHandler = require('express-async-handler')
const Card = require('../models/card')
const { BasePlugin } = require('../models/plugins/basePlugin')
const { PluginList } = require('../models/plugins/pluginList')

exports.verifyPlugin = asyncHandler(async (req, res, next) => {
  const plugin = await BasePlugin.findById(req.params.pluginId)
  if (plugin) {
    req.plugin = plugin
  } else {
    throw new Error('plugin does not exist')
  }
  next()
})

exports.attach = asyncHandler(async (req, res, next) => {
  let pluginSchemaInfo = await PluginList.findOne({
    pluginKey: req.params.pluginKey,
  })
  if (pluginSchemaInfo) {
    let newPluginInstance = new pluginSchemaInfo.model({
      cardId: req.params.cardId,
    })
    newPluginInstance.attach()
    res.status(200).json({ success: 200, messag: 'plugin attached' })
  } else {
    throw new Error('plugin not founds')
  }
})

exports.detach = asyncHandler(async (req, res, next) => {
  await req.plugin.detach()
  res.status(200).json({ success: true, message: 'successfully detached' })
})

exports.getPlugin = asyncHandler(async (req, res, next) => {
  let data = await req.plugin.get()
  return res.status(200).json({ success: true, data, message: 'successful' })
})

exports.createPlugin = asyncHandler(async (req, res, next) => {
  await req.plugin.create()
  return res.status(200).json({ success: true, message: 'successful created' })
})

exports.updatePlugin = asyncHandler(async (req, res, next) => {
  await req.plugin.update()
  return res.status(200).json({ success: true, message: 'successful updated' })
})

exports.patchPlugin = asyncHandler(async (req, res, next) => {
  await req.plugin.patch()
  return res.status(200).json({ success: true, message: 'successful patched' })
})

exports.deletePlugin = asyncHandler(async (req, res, next) => {
  await req.plugin.delete()
  return res.status(200).json({ success: true, message: 'successful deleted' })
})

exports.userAuthorized = asyncHandler(async (req, res, next) => {
  let cardInfo = Card.findOne({ _id: req.params.cardId }).populate({
    path: 'columnId',
    populate: { path: 'boardId' },
  })
  if (cardInfo.columnId.boardId.userId == req.user.id) {
    return next()
  }
  return res.status(401).json({ success: true, message: 'You not authorized' })
})
