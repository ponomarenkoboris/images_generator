export const scrollToElement = (href: string) => document.querySelector(href)?.scrollIntoView()

export type AppendRefCb = (el: HTMLImageElement, refs: React.MutableRefObject<HTMLImageElement[]>) => void

export const appendRefCb: AppendRefCb = (el, refs) => { refs.current.push(el) }

export const calculateRanderGenerator = (imagesRefs: React.MutableRefObject<HTMLImageElement[]>) => {
    let lazyImagesPositions: number[] = []

    if (imagesRefs.current.length > 0) {
        imagesRefs.current.forEach(img => {
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
            if (imagesRefs.current[idx].dataset.src) {
                imagesRefs.current[idx].src = imagesRefs.current[idx].dataset.src as string
                imagesRefs.current[idx].removeAttribute('data-src')
            }
        }
    }

    return () => lazyImagesCheck()
}