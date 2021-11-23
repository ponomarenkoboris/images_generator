import React, { useState, useRef } from 'react'
import PhotoOutlinedIcon from '@material-ui/icons/PhotoOutlined'
import './UploadAsset.scss'

type UploadAssetsProps = {
    folderId: number
    imagesDropped: (folderId: number, files: FileList) => void
}

export const UploadAsset = ({ folderId, imagesDropped }: UploadAssetsProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isDrag, setIsDrag] = useState(false)

    const dragStopStartOverHandler = (e: React.DragEvent<HTMLDivElement>, status: boolean) => {
        e.preventDefault()
        setIsDrag(status)
    }

    const filesDropped = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        imagesDropped(folderId, e.dataTransfer.files)
        setIsDrag(false)
    }

    const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        imagesDropped(folderId, e.target.files as FileList)
    }

    return (
        <>
            <input 
                className='file__input'
                type="file" 
                ref={fileInputRef}
                accept="image/png"
                onChange={fileUpload}
                multiple
            />
            <div
                className='drag__upload-area'
                onDragStart={e => dragStopStartOverHandler(e, true)}
                onDragLeave={e => dragStopStartOverHandler(e, false)}
                onDragOver={e => dragStopStartOverHandler(e, true)}
                onDrop={e => filesDropped(e)}
                onClick={() => fileInputRef.current?.click()}
            >
                <div className='upload-area__inner'>
                    <PhotoOutlinedIcon />
                    <p>{isDrag ? 'Опустите изображения' : 'Переместите изображения или нажмите на поле'}</p>
                </div>
            </div>
        </>
    )
}