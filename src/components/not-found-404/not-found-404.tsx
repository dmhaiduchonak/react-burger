import React from 'react';
import styles from './styles.module.css';

const NotFound404: React.FC = () => {
    return (
        <div className={`${styles.container} text text_type_main-medium text_color_primary`}>404 Page Not Found</div>
    );
}

export default NotFound404;