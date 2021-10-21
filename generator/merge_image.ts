const { createCanvas, loadImage } = require('canvas')

async function mergeImages(width: number, height: number, imagePath: string = ''): Promise<File | undefined> {
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')
    try {
        const loadedImage = await loadImage(imagePath)
        ctx.drawImage(loadedImage)
    } catch (error) {
        console.error(error)
    }
    return 
}