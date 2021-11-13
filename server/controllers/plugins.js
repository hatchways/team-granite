const pluginList = require('../plugin')
const asyncHandler = require('express-async-handler')
const card = require('../models/card')
const { BasePlugin } = require('../models/plugins/basePlugin')
const { PluginList } = require('../models/plugins/pluginList')

exports.verifyPlugin = asyncHandler(async (req, res, next) => {
  const plugin = await BasePlugin.findById(req.params.pluginId)
  // verify if the resource id belong to the user
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
      ...req.body,
      resoruceId: req.params.resoruceId,
    })
    newPluginInstance.attach()
    next()
  } else {
    throw new Error('plugin not founds')
  }
})

exports.detach = asyncHandler(async (req, res, next) => {
  let pluginSchemaInfo = await PluginList.findOne({
    pluginKey: req.params.pluginKey,
  })
  if (pluginSchemaInfo) {
    let pluginInfo = await BasePlugin.findOne({ _id: req.params.pluginId })
    await pluginInfo.detach()
    next()
  } else {
    throw new Error('plugin not founds')
  }
})

exports.get = asyncHandler(async (req, res, next) => {
  if (req.plugin) {
    return await req.plugin.get()
  }
  throw new Error('Plugin not found')
})

exports.create = async(async (req, res, next) => {})
