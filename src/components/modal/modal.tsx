import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';

import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../modal-overlay/modal-overlay";

interface Props {
    title?: string;
    onClose?: () => void;
    children?: React.ReactNode;
}

const Modal = ({title = '', onClose, children} : Props) => {

    React.useEffect(() => {
        const close = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                if (typeof onClose === 'function') {
                    onClose()
                }
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, [onClose])


    return ReactDOM.createPortal(
        <React.Fragment>
            <ModalOverlay onClose={onClose}/>
            <div className={styles.modal} data-testid={'modal'}>
                <div className={`${styles.container} mt-10 ml-10 mr-10`}>
                    <h1 className={`${styles.title} text text_type_main-large`}>{title}</h1>
                    <button className={styles.close} onClick={onClose} data-testid={'modal-close'}>
                        <CloseIcon type="primary"/>
                    </button>
                </div>
                {children}
            </div>
        </React.Fragment>,
        document.getElementById('modals') as HTMLElement);
}

export default Modal;