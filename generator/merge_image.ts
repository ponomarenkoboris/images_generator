import path from 'path'
import fs from 'fs'
import { createCanvas, loadImage } from 'canvas'
import type { TContentItem, TConfig }  from './types'

const IMAGE_ROOT = path.join(__dirname, '../images')
const findContent = (place: string, name: string) => {
    const dirPath = path.join(IMAGE_ROOT, place)
    let contentPath = ''

    for (let imageName of fs.readdirSync(dirPath)) {
        if (imageName.indexOf(name) !== -1) {
            contentPath = path.join(IMAGE_ROOT, place, imageName)
            break
        }
    }

    return contentPath
}

const defaultConfig: Omit<TConfig, 'images_count'> = {
    size: {
        width: 1416,
        height: 672
    },
    backGroundColor: [255, 255, 255, 1]
}

export default async  function mergeImages(
    filename: string, 
    contentItem: TContentItem, 
    output: string, 
    config: Omit<TConfig, 'images_count'> = defaultConfig
): Promise<void> {
    
    const { width, height } = config.size
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = `rgba(${config.backGroundColor.join(', ')})`
    ctx.fillRect(0, 0, width, height)
    
    for (let [place, content] of Object.entries(contentItem)) {
        const particlePath = findContent(place, content)

        try {
            const loadedImage = await loadImage(particlePath)
            ctx.drawImage(loadedImage, 0, 0)
            
        } catch (error) {
            throw new Error('Something went wrong while trying to draw image.')   
        }
    }

    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync(path.join(output, `${filename}.png`), buffer)
}