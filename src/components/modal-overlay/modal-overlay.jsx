import React from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({onClose}) => {
    return (
        <div className={styles.overlay} onClick={onClose}/>
    );
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;