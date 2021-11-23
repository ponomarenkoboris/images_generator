import { useRef, useEffect } from 'react'
import { CandyMachineDocs } from './candyMachineDocs/CandyMachineDocs'
import { ApplicationOperationDocs } from './applicationOperationDocs/ApplicationOperation'
import { CodeBlock } from './codeBlock/CodeBlock'
import metaplexInstallImage from '../../assets/metaplex-install.png'
import { calculateRanderGenerator, scrollToElement } from './helpers/utils'
import './Documentation.scss'

export type AppendRefCb = (el: HTMLImageElement) => void

const Documentation = () => {
    const imagesRefs = useRef<HTMLImageElement[]>([])

    const appendRefCb: AppendRefCb = (el: HTMLImageElement) => {
        imagesRefs.current.push(el)
    }

    useEffect(() => {
        const calculateRender = calculateRanderGenerator(imagesRefs)
        window.addEventListener('scroll', calculateRender)
        return () => window.removeEventListener('scroll', calculateRender)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='docs'>
            <h1>Документация по созданию NFT коллекции</h1>
            <div className='docs__intro'>
                <p>
                    Чтобы иметь пердставление о том, как все работает, лучше всего будет посмотреть {" "}
                    <a target="_blanc" rel="noreferrer" href="https://www.youtube.com/watch?v=35RO0lAEIxE">видео урок</a>. {" "}
                    После просмтора сформируется пониамание этапов добычи NFT артов, что, в свою очередь, упростит работу в этом приложении.
                    Или можно прочитать <a href="https://hackmd.io/@levicook/HJcDneEWF">эту</a> статью.
                </p>
                <ol>
                    <li 
                        onClick={() => scrollToElement('#NFT-necessary-programs')}
                    >
                        Установка необходимых программ для создания NFT коллекции
                    </li>
                    <li 
                        onClick={() => scrollToElement('#application-operation')}
                    >
                        Руководство по эсплуатации приложения
                    </li>
                    <li 
                        onClick={() => scrollToElement('#candy-machine')}
                    >
                        Candy Machine для генерации NFT
                    </li>
                </ol>
            </div>
            <div className='docs__NFT-necessary-programs'>
                <h2 id='NFT-necessary-programs'>Установка необходимых программ для создания NFT коллекции</h2>
                <p className='necessary-programs__p'>Для использования программы необходимо установить:</p>
                <ul>
                    <li>
                        <p>
                            <a target="_blanc" rel="noreferrer" href='https://nodejs.org/en/download/'>Node.js</a> {" "}
                            - Как установить смотреть {" "}
                            <a target="_blanc" rel="noreferrer" href="https://htmlacademy.ru/blog/boost/tools/installing-nodejs">здесь</a>.
                        </p>
                        
                    </li>
                    <li>
                        <a target="_blanc" rel="noreferrer" href='https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable'>yarn</a>
                    </li>
                    <li>
                        <a target="_blanc" rel="noreferrer" href='https://www.npmjs.com/package/ts-node'>ts-node</a>
                    </li>
                    <li>
                        <a target="_blanc" rel="noreferrer" href='https://docs.metaplex.com/'>Metaplex</a>
                        <div>
                            <p>Клонировать репозиторий проекта</p>
                            <CodeBlock>
                                git clone https://github.com/metaplex-foundation/metaplex.git
                            </CodeBlock>
                        </div>
                        <div className="necessary-programs__metaplex-install">
                            <span>ИЛИ</span>
                            <a target="_blanc" rel="noreferrer" href="https://github.com/metaplex-foundation/metaplex">Скачать архив</a>
                            <div className='image__wrapper'>
                                <img 
                                    data-src={metaplexInstallImage} 
                                    src='img/1x1.png' 
                                    alt="Download metaplex" 
                                    loading='lazy' 
                                    ref={el => el && imagesRefs.current.push(el)} 
                                />
                            </div>
                        </div>
                    </li>
                    <li>
                        <p>
                            solana-cli - Как установить смотреть {" "}
                            <a target="_blanc" rel="noreferrer" href='https://docs.solana.com/cli/install-solana-cli-tools'>здесь</a>.
                        </p>
                    </li>
                </ul>
            </div>
            <ApplicationOperationDocs appendRefCb={appendRefCb}/>
            <CandyMachineDocs appendRefCb={appendRefCb} />
        </div>
    )
}

export default Documentation