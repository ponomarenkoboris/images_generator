import path from 'path'
import fs from 'fs'
import RandomImagesGenerator from './generator/generator'
import { TConfig, TMetadata } from './generator/types'

type RootConfParsed = {
    token_metadata: TMetadata
    output_image_configuration: TConfig
}

function main(): void {        
    const imageDir = fs.readdirSync(path.join('./images'))
    const { token_metadata: metadata, output_image_configuration: conf }: RootConfParsed
        = JSON.parse(fs.readFileSync(path.join('root_configuration.json'), 'utf-8'))

    if (!imageDir.length) throw new Error('Images folder is empty')

    const generator = new RandomImagesGenerator(imageDir, metadata, conf)
    generator.generate(conf.images_count, conf.sequences_is_unique)
    generator.drawImages()
}

main()