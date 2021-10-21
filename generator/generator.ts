const path = require('path')
const { readFiles } = require('./utils')

type TContentItem = { [key: string]: string }

interface TGenerator {
    imagesDirList: string[]
    content: TContentItem[]
    generate: (count: number) => Promise<TContentItem[]>
    drawImages: () => string
}

export class RandomImagesGenerator implements TGenerator {
    private _content: TContentItem[] = []
    private _sequences: string[] = []

    private _choices(names: string[], weights: number[]): [string, string] {
        const sum = weights.reduce((prev, curr) => prev + curr, 0);
        let acc = 0;
        weights = weights.map(percent => (acc = percent + acc));        
        let randomNumber = Math.random() * sum;
        const element = names[weights.filter(percent => percent <= randomNumber).length]

        return [element, `${names.indexOf(element)}`]
    }

    constructor(public imagesDirList: string[] = []) {}

    get content(): TContentItem[] {
        return this._content
    }

    async generate(count: number = 1): Promise<TContentItem[]> {
        const content: TContentItem[] = []
        
        while (count > 0) {
            const image: TContentItem = {}
            let sequence: string = ''

            for (let dirName of this.imagesDirList) {
                const contentList: string[] = await readFiles(path.join('./', 'images', dirName))                
                const names: string[] = []
                const percents: number[] = []

                for (const filename of contentList) {
                    let [ name, percent ]: string[] = filename.split('.')[0].split('#')
                    names.push(name)
                    percents.push(Number(percent))
                }

                let [ result, index ] = this._choices(names, percents)
                image[dirName] = result
                sequence += index
            }

            if (!(sequence in this._sequences)) {
                this._sequences.push(sequence)
                content.push(image)
                count--
            }
        }

        this._content = content
        return content
    }

    drawImages(): string {
        if (this._content.length == 0) {
            throw new Error(`You have not generate images: content = ${this._content.length}'`)
        }
        return 'Success!'
    }
}