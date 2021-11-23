import candyMachineDirImage from '../../../assets/candy-cli.png'
import candyDataImages from '../../../assets/candy_data.jpg'
import candyStartImage from '../../../assets/starting_candy_machine.jpg'
import { AppendRefCb } from '../Documentation'
import { CodeBlock } from "../codeBlock/CodeBlock"
import { scrollToElement } from '../helpers/utils'
import './CandyMachineDocs.scss'

type CandyMachineDocsProps = {
    appendRefCb: AppendRefCb
}

export const CandyMachineDocs = ({ appendRefCb }: CandyMachineDocsProps) => {
    return (
        <div className='docs__candy-machine'>
            <h2 id='candy-machine'>Candy Machine для генерации NFT</h2>
            <div className="information-block">
                <p>
                    Прежде чем перейти к созданию Candy Machine, убедитесь, что вы установили 
                    <span onClick={() => scrollToElement('#NFT-necessary-programs')}>{" "}этот список программ</span>.
                </p>
            </div>
            <div className='candy__machine-item'>
                <p>Из папки metaplex переместиться в папку ./cli:</p>
                <CodeBlock>cd ./js/packages/cli</CodeBlock>
            </div>
            <div className='candy__machine-item'>
                <p>Установить зависимости:</p>
                <CodeBlock>yarn</CodeBlock>
            </div>
            <div className='candy__machine-item'>
                <p>Собрать проект:</p>
                <CodeBlock>yarn build</CodeBlock>
            </div>
            <div className='candy__machine-item illustration'>
                <p>Необходимо переместить сгенерированные файлы в директорию проекта:</p>
                <div className='image__wrapper'>
                    <img 
                        data-src={candyMachineDirImage} 
                        src='img/1x1.png' 
                        alt="Workdir candy machine" 
                        loading='lazy' 
                        ref={(el: HTMLImageElement) => appendRefCb(el)} 
                    />
                </div>
                <blockquote className="candy__machine-item note">
                    <p>Если в директории существует папка .cache - её нужно удалить!</p>
                </blockquote>
            </div>
            <div className='candy__machine-item'>
                <p>Загрузка коллекции (Стоимость: ~~0.00666304 SOL):</p>
                <CodeBlock>ts-node ./src/candy-machine-cli.ts upload ./assets -e devnet -k путь_до_keypair</CodeBlock>
            </div>
            <div className='candy__machine-item'>
                <p>Верификация выгруженной коллекции:</p>
                <CodeBlock>ts-node ./src/candy-machine-cli.ts verify -k путь_до_keypair</CodeBlock>
            </div>
            <div className='candy__machine-item'>
                <p>Создание Candy Machine:</p>
                <p>CLUSTER - заменить на devnet для тестирования или mainnet для создания реальных артов</p>
                <CodeBlock>ts-node ./src/candy-machine-cli.ts create_candy_machine -k path_to_keypair -e CLUSTER -p price_in_SOL</CodeBlock>
            </div>
            <div className='candy__machine-item'>
                <p>Установка даты запуска Candy Machine</p>
                <CodeBlock>ts-node ./src/candy-machine-cli.ts update_candy_machine -d (needed timestamp or "now") -k path_to_keypair</CodeBlock>
            </div>
            <div className='information-block'>
                <p>
                    После выполнения всех вышеописанных действий в дерриктории появится 
                    папка с названием "./cache". В этой папке находится конфигурационный файл.
                </p>
            </div>
            <div 
                className='image__wrapper'
                style={{ marginBottom: '10px' }}
            >
                <img
                    data-src={candyDataImages}
                    src='img/1x1.png'
                    alt='After creating candy machine'
                    loading='lazy'
                    ref={(el: HTMLImageElement) => appendRefCb(el)}
                />
            </div>
            <div className="information-block">
                <p>Теперь остается только перенести некоторые данные в приложение. Следующим образом:</p>
            </div>
            <div 
                className="image__wrapper"
                style={{ marginBottom: '10px' }}
            >
                <img 
                    data-src={candyStartImage}
                    src="img/1x1.png" 
                    alt="How to start minting"
                    loading='lazy'
                    ref={(el: HTMLImageElement) => appendRefCb(el)}
                />
            </div>
            <div className="information-block">
                <p>
                    Далее, необходимо подключить крипто кошелек. После чего можно будет чеканить NFT арты.
                </p>
            </div>
        </div>
    )
}