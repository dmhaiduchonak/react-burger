import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../modal-overlay/modal-overlay";

const Modal = ({title = '', onClose, children}) => {

    React.useEffect(() => {
        const close = (e) => {
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
            <div className={styles.modal}>
                <div className={`${styles.container} mt-10 ml-10 mr-10`}>
                    <h1 className={`${styles.title} text text_type_main-large`}>{title}</h1>
                    <button className={styles.close} onClick={onClose}>
                        <CloseIcon type="primary"/>
                    </button>
                </div>
                {children}
            </div>
        </React.Fragment>,
        document.getElementById('modals'));
}

Modal.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
};

export default Modal;