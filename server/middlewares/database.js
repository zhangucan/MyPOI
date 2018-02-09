import mongoose from 'mongoose'// 引入数据库插件
import config from '../config'// 引入db的配置文件
import fs from 'fs'
import { resolve } from 'path'
const models = resolve(__dirname, '../database/schema')

fs.readdirSync(models) // 拿到所有的schema
  .filter(file => ~file.search(/^.*js$/))
  .forEach(file => require(resolve(models, file)))

export const database = app => { // 拿到传入的app
  mongoose.set('debug', true)
  mongoose.connect(config.db)
  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.db)
  })
  mongoose.connection.on('error', err => {
    console.error(err)
  })
  mongoose.connection.on('open', async => {
    console.log('done ', config.db)
  })
}
