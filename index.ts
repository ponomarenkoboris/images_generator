const path = require('path')
const fs = require('fs')
const { RandomImagesGenerator } = require('./generator/generator.ts')

console.log(fs.realpath())

const m = new RandomImagesGenerator([''])

m.drawImages()