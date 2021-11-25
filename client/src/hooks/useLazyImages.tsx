import { useEffect, useRef } from 'react'

const calculateRanderGenerator = (imagesRefs: React.MutableRefObject<HTMLImageElement[]>) => {
    let lazyImagesPositions: number[] = []

    if (imagesRefs.current.length > 0) {
        imagesRefs.current.forEach(img => {
            if (!img) return
            lazyImagesPositions.push(img.getBoundingClientRect().top)
            lazyImagesCheck()
        })
    }

    function findIndex(initalIdx: number, imagesYPositions: number[], currentScrollY: number): number {
        return imagesYPositions[initalIdx] <= currentScrollY && initalIdx < imagesYPositions.length - 1 
            ? findIndex(initalIdx + 1, imagesYPositions, currentScrollY) 
            : initalIdx
    }
    
    function lazyImagesCheck() {
        const idx = findIndex(0, lazyImagesPositions, window.scrollY)
        if (idx >= 0) {
            if (imagesRefs.current[idx] && imagesRefs.current[idx].dataset.src) {
                imagesRefs.current[idx].src = imagesRefs.current[idx].dataset.src as string
                imagesRefs.current[idx].removeAttribute('data-src')
            }
        }
    }

    return () => lazyImagesCheck()
}

type AppendImage = (el: HTMLImageElement) => void

export const useLazyLoad = (): AppendImage => {
    const imagesRefs = useRef<HTMLImageElement[]>([])
    useEffect(() => {
        const calculateRender = calculateRanderGenerator(imagesRefs)
        window.addEventListener('scroll', calculateRender)
        return () => window.removeEventListener('scroll', calculateRender)
    })

    return (el: HTMLImageElement) => { imagesRefs.current.push(el) }
}