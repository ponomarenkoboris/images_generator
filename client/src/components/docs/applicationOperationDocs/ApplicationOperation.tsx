import { AppendRefCb } from '../Documentation'
import { tokenMetadataTable, tokenMetadataCollectTable, tokenMetadatProperTable, algoConfTable } from './helpers/tableData'
import outputImageConfImage from '../../../assets/output_image_config.jpg'
import assetsSlicesImage from '../../../assets/slices.jpg'
import tokenMetadataImage from '../../../assets/token_metadata.png'
import downloadBtnImage from '../../../assets/download_from_server.jpg'
import './ApplicationOperation.scss'

type ApplicationOperationDocsProps = {
    appendRefCb: AppendRefCb
}

export const ApplicationOperationDocs = ({ appendRefCb }: ApplicationOperationDocsProps) => {
    return (
        <div className='docs__application-operation'>
            <h2 id='application-operation'>Руководство по эсплуатации приложения</h2>
            <div className='application-operation__download'>
                <h3>Загрузка сохраненных данных</h3>
                <div className='information-block'>
                    <p>Перейдя во вкладку GENERATE COLLECTION, сразу под шабкой приложения, можно увидеть кнопку загрузки настроек с сервера. Нажав на эту кнопку, мы получим все данные, которые были сохранены на сервере, кроме конфигурации Candy Machine.</p>
                </div>
                <div className='image__wrapper'>
                    <img
                        data-src={downloadBtnImage} 
                        src="img/1x1.png" 
                        alt="Download from server" 
                        loading='lazy'
                        ref={(el: HTMLImageElement) => appendRefCb(el)}
                    />
                </div>
                <div className='information-block'>
                    <p>Если на сервере существуют какие-либо записи, то, после нажатия на кнопку, полученные данные автоматически заполнят поля форм полностью изменив содержимое, если на сервере нет никаких записей, то, ничего не произойдет.</p>
                </div>
            </div>
            <div className='application-operation__metadata'>
                <h3>Настройка метадаты для создания токена</h3>
                <div className='information-block'>
                    <p>Форма настройки метадаты определяет информацию, которая будет записанна в смарт контракт созданного арта. Посмотреть полную документацию <span className='mark-as-bold'>Token Metadata Standard</span> можно {" "}<a target='_blank' rel="noreferrer" href="https://docs.metaplex.com/nft-standard">здесь</a></p>
                </div>
                <div className='image__wrapper'>
                    <img 
                        data-src={tokenMetadataImage} 
                        src='img/1x1.png' 
                        alt="Token metadata example"
                        loading='lazy' 
                        ref={(el: HTMLImageElement) => appendRefCb(el)} 
                    />
                </div>
                <blockquote className='note'>
                    <p>Сохранить можно только <strong>полностью</strong> заполненную форму!</p>
                </blockquote>
                <table>
                    <caption>
                        <p>
                            <span className='config__section-name'>token_metadata</span> - информация, чтобы сгенерировть NFT токен
                        </p>
                    </caption>
                    <thead>
                        <tr>
                            <th>Название поля</th>
                            <th>Тип данных</th>
                            <th>Описание</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tokenMetadataTable.map(({ name, type, description }, idx) => (
                            <tr key={idx}>
                                <td 
                                    className={name === 'collection' ? 'mark1' : name === 'properties' ? 'mark2' : ''}
                                >
                                    {name}
                                </td>
                                <td>{type}</td>
                                <td>{description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table>
                    <caption className='mark1'>collection</caption>
                    <thead>
                        <tr>
                            <th>Название поля</th>
                            <th>Тип данных</th>
                            <th>Описание</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tokenMetadataCollectTable.map(({ name, type, description }, idx) => (
                            <tr key={idx}>
                                <td>{name}</td>
                                <td>{type}</td>
                                <td>{description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table>
                    <caption className='mark2'>properties</caption>
                    <thead>
                        <tr>
                            <th>Название поля</th>
                            <th>Тип данных</th>
                            <th>Описание</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tokenMetadatProperTable.map(({ name, type, description }, idx) => (
                            <tr key={idx}>
                                <td>{name}</td>
                                <td>{type}</td>
                                <td>{description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='application-operation__outputImageConf'>
                <h3>Настройка алгоритма генерации коллекции</h3>
                <div className='information-block'>
                    <p>Чтобы сгенерировать коллекцию необходимо натроить алгоритм генерации. Можно настраивать такие параметры как: </p>
                    <ul>
                        <li>Колличество изображений</li>
                        <li>Ширина - ширина изображений, которые будут сгенерированны (по умолчанию - 1416px)</li>
                        <li>Высота - высота изображений, которые будут сгенерированны (по умолчанию - 672px)</li>
                        <li>
                            Время генерации коллекции - время генерации изображений
                            <ul>
                                <li>в секундах</li>
                                <li>false - время неограниченно (по умолчанию)</li>
                            </ul>
                        </li>
                        <li>Арты уникальные
                            <ul>
                                <li>false - генерируется необходимое колличество изображений</li>
                                <li>true - генерируется максимальное возможное колличество полностью уникальных изображений</li>
                            </ul>
                        </li>
                        <li>Фоновый цвет картинок - в формате rgba (значение по умолчанию "0, 0, 0, 255" alpha 1 = 255)</li>
                    </ul>
                </div>
                <div className='image__wrapper'>
                    <img 
                        data-src={outputImageConfImage}
                        src='img/1x1.png' 
                        alt="Algorithm setup" 
                        loading='lazy'
                        ref={(el: HTMLImageElement) => appendRefCb(el)} 
                    />
                </div>
                <blockquote className='note'>
					<p>Сохранить можно только <strong>полностью</strong> заполненную форму!</p>
                </blockquote>
                <table>
                    <caption>
                        <span className='config__section-name'>output_image_configuration</span> - информация, для управления роботой алгоритма генерации
                    </caption>
                    <thead>
                        <tr>
                            <th>Название поля</th>
                            <th>Тип данных</th>
                            <th>Описание</th>
                        </tr>
                    </thead>
                    <tbody>
                        {algoConfTable.map(({ name, type, description }, idx) => (
                            <tr key={idx}>
                                <td>{name}</td>
                                <td>{type}</td>
                                <td>{description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
			<div className='application-operation__assetsSlices'>
				<h3>Папки с исходными изображениями</h3>
				<div className="information-block">
					<p>В этом разделе необходимо создать папки с исходными изображениями. Названия изображений и папок записываются в смарт контракт, поэтому важно здесь - недопустить ошибок. В названии файла, через решетку записывается процент выпадания изображения. Процент выпадания должен быть такой, чтобы сумма процентов выпадания изображений в папке должена равнятся 100%.</p>
				</div>
				<blockquote className='note'>
					<p>Названия файла: <strong>example_name#25.png</strong> (25 - вероянть выпадания изображения в %)</p>
				</blockquote>
				<div className='image__wrapper'>
					<img
						data-src={assetsSlicesImage} 
						src='img/1x1.png' 
						alt="Assets slices setup" 
						loading='lazy' 
						ref={(el: HTMLImageElement) => appendRefCb(el)} 
					/>
				</div>
			</div>
        </div>
    )
}