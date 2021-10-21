const path = require('path')
const { RandomImagesGenerator } = require('./generator/generator.ts')
const { readFiles } = require('./generator/utils')

async function main(): Promise<void> {
    try {
        const imageDir = await readFiles(path.join('./images'))
        const generator = new RandomImagesGenerator(imageDir)
        await generator.generate(10)
        console.log(generator.content)
    } catch (error) {
        console.error(error)
    }
}

main()