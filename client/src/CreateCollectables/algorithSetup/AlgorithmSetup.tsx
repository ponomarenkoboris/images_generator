import { useSelector, useDispatch } from 'react-redux'
import { OutputImageConf } from '../../store/algorithmSetupStore/types'
import { updateImagesCount, updateSize, updateTimeout, updateSequencesUnique, updateBackgroundColor } from '../../store/algorithmSetupStore/algorithmActionCreators'
import { toNumberValue, validateConf } from '../helpers/utils'
import { TextField, Button,FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import request, { endpoints } from '../../http-conf/request'
import './AlgorithmSetup.scss'

export const AlgorithmSetup = () => {
    const algConf = useSelector((state: { outputConf: OutputImageConf }) => state.outputConf)
    const dispatch = useDispatch()

    const saveOutputConf = async () => {
        try {
            await request.post(endpoints.algorithmConfig, algConf)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='collecrables__setup-output__conf'>
            <h2>Настройка output_image_configuration</h2>
            <div className='output__conf'>
                <form>
                    <TextField 
                        variant='outlined'
                        label='Колличество изображений'
                        type='number'
                        value={algConf.images_count || ''}
                        onChange={(e) => dispatch(updateImagesCount(toNumberValue(e.target.value || '0')))}
                    />
                    <TextField
                        variant='outlined'
                        label='Ширина'
                        type='number'
                        value={algConf.size.width || ''}
                        onChange={(e) => dispatch(updateSize(false, toNumberValue(e.target.value || '0')))}
                    />
                    <TextField 
                        variant='outlined'
                        label='Высота'
                        type='number'
                        value={algConf.size.height}
                        onChange={(e) => dispatch(updateSize(true, toNumberValue(e.target.value)))}
                    />
                    <TextField 
                        variant='outlined'
                        label='Время генерации в сек. (false - неогранич.)'
                        value={algConf.time_limit}
                        onChange={e => dispatch(updateTimeout(toNumberValue(e.target.value) || false))}
                    />
                    <FormControl className="form__select">
                        <InputLabel id='sequences_inuque'>Арты уникальны</InputLabel>
                        <Select 
                            labelId='sequences_inuque'
                            value={algConf.sequences_is_unique}
                            variant='outlined'
                            onChange={(e) => dispatch(updateSequencesUnique(e.target.value as string))}
                        >
                            <MenuItem value={'true'}>true</MenuItem>
                            <MenuItem value={'false'}>false</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField 
                        variant='outlined'
                        label='Фоновый цвет картинки (rgba)'
                        onChange={(e) => dispatch(updateBackgroundColor(e.target.value))}
                        value={algConf.backgroud_color_rgba}
                    />
                </form>
                <div className="output__conf-actions">
                    <Button
                        variant='contained'
                        color='primary'
                        disabled={!!validateConf(algConf)}
                        onClick={saveOutputConf}
                    >
                        Сохранить настройки алгоритма
                    </Button>
                </div>
            </div>
        </div>
    )
}