const path = require('path')

type TContentItem = { [key: string]: string }

interface TGenerator {
    imagesDirList: string[]
    content: TContentItem[]
    generate: (count: number) => TContentItem[]
    drawImages: () => string
}

export class RandomImagesGenerator implements TGenerator {
    private _content: TContentItem[] = []
    private _sequences: string[] = []

    private _choices(images: string[], weights: number[]): [string, string] {
        const randomNumber = Math.floor(Math.random() * 100)
        let result: string = ''
        let index: string = ''

        for (let i = 0; i < weights.length; i++) {
            if (randomNumber <= weights[i]) {
                result = images[i]
                index = String(i)
            }
        }

        return [ result, index ]
    }

    constructor(public imagesDirList: string[] = []) {}

    get content(): TContentItem[] {
        return this._content
    }

    generate(count: number = 1): TContentItem[] {
        const content: TContentItem[] = []

        while (count > 0) {
            const image: TContentItem = {}
            let sequence: string = ''

            for (let dirName in this.imagesDirList) {
                const contentList: string[] = [] // file paths to images in folder
                const names: string[] = []
                const percents: number[] = []

                for (let filename in contentList) {
                    let [ name, percent ] = filename.split('.')[0].split('#')
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
                count -= 1
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