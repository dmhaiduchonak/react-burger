import React from 'react';
import styles from './styles.module.css';

interface Props {
    onClose?: () => void;
}

const ModalOverlay = ({onClose}: Props) => {
    return (
        <div className={styles.overlay} onClick={onClose}/>
    );
}

export default ModalOverlay;