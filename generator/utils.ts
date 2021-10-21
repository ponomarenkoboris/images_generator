const fs = require('fs/promises')

export async function readFiles(path: string): Promise<string[]> {
    try {
        const files = await fs.readdir(path) as string[]
        return files
    } catch (error) {
        console.error(error)
        return []
    }
}