import './Modal.scss'

type ModalProps = {
    isShow?: boolean
}

export const Modal = ({ isShow }: ModalProps) => {
    return isShow ? (
        <div className="modal-window">
            <div className="wrapper"></div>
        </div>
    ) : null
}
