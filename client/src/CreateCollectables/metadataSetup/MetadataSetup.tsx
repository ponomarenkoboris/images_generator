import { useDispatch, useSelector } from 'react-redux'
import { 
    changeName,
    changeDescription,
    changeSymbol,
    changeSeller,
    changeCollectionName,
    changeCollectionFamily,
    changePropertyCategory,
    changePropertyCreators,
    removeCreator,
    addCreator,
} from '../../store/metadataStore/metaActionCreators'
import { Category } from '../../store/metadataStore/types'
import { TokenMetadata } from '../../store/metadataStore/types'
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, IconButton } from "@material-ui/core"
import BackspaceIcon from '@material-ui/icons/Backspace';
import request, { endpoints } from '../../http-conf/request'
import { toNumberValue, validateConf } from '../helpers/utils'
import './MetadataSetup.scss'

export const MetadataSetup = () => {
    
    const tokenMetadata = useSelector((state: { metadata: TokenMetadata }) => state.metadata)
    const dispatch = useDispatch()

    const saveMetadata = async () => {
        const metadata = tokenMetadata
        metadata.properties.creators = metadata.properties.creators.map(({ address, share }) => ({ address, share }))
        try {
            await request.post(endpoints.metadata, metadata)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='collectables__setup-metadata'>
            <h2>Настройка token_metadata</h2>
            <form>
                <div className="metadata">
                    <TextField
                        label='Имя арта (name)'
                        value={tokenMetadata.name}
                        onChange={e => dispatch(changeName(e.target.value))}
                    />
                    <TextField
                        label='Символ арта (symbol)'
                        value={tokenMetadata.symbol}
                        onChange={e => dispatch(changeSymbol(e.target.value))}
                    />
                    <TextField
                        label='Описание арта (description)'
                        value={tokenMetadata.description}
                        onChange={e => dispatch(changeDescription(e.target.value))}
                    />
                    <TextField
                        label='Процнет с прожади создателям (seller_fee_basis_points)'
                        type='number'
                        value={tokenMetadata.seller_fee_basis_points || ''}
                        onChange={e => dispatch(changeSeller(toNumberValue(e.target.value || '0')))}
                    />
                    <TextField
                        label='Имя коллекции (collection.name)'
                        value={tokenMetadata.collection.name}
                        onChange={e => dispatch(changeCollectionName(e.target.value))}
                    />
                    <TextField
                        label='Семейство коллекции (collection.family)'
                        value={tokenMetadata.collection.family}
                        onChange={e => dispatch(changeCollectionFamily(e.target.value))}
                    />
                    <FormControl>
                        <InputLabel id='proreties-category'>Выбирите категорию арта (properties.category)</InputLabel>
                        <Select 
                            labelId='proreties-category'
                            value={tokenMetadata.properties.category}
                            onChange={(e) => dispatch(changePropertyCategory(e.target.value as Category))}
                        >
                            <MenuItem value={'image'}>image</MenuItem>
                            <MenuItem value={'audio'}>audio</MenuItem>
                            <MenuItem value={'vr'}>vr</MenuItem>
                            <MenuItem value={'html'}>html</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="creators__wrapper">
                    {tokenMetadata.properties.creators.map(({ id, address, share }, idx) => (
                        <div className='creator' key={id || new Date().getTime() + idx}>
                            <div className='creator__info'>
                                <TextField 
                                    label="Адресс кошелька создателя (creator.address)"
                                    value={address}
                                    onChange={(e) => id && dispatch(changePropertyCreators(id, true, e.target.value))}
                                />
                                <TextField 
                                    label='Процент создателя (creator.share)'
                                    type='number'
                                    value={share || ''}
                                    onChange={(e) => id && dispatch(changePropertyCreators(id, false, toNumberValue(e.target.value || '0')))}
                                />
                            </div>
                            <div className='creator__action'>
                                <IconButton
                                    onClick={() => id && dispatch(removeCreator(id))}
                                >
                                    <BackspaceIcon />
                                </IconButton>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="form__actions">
                    <Button
                        onClick={() => dispatch(addCreator({ address: '', share: 0, id: new Date().getTime() }))}
                        variant='outlined'
                        color='primary'
                    >
                        Добавить создателя (properties.creators)
                    </Button>
                    <Button
                        variant='contained'
                        color='primary'
                        disabled={!!validateConf(tokenMetadata)}
                        onClick={saveMetadata}
                    >
                        Сохранить настройки метадаты
                    </Button>
                </div>
            </form>
        </div>
    )
}