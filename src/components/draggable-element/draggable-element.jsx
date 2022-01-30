import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import React from "react";
import {useRef} from 'react';
import {useDrag, useDrop} from "react-dnd";
import IngredientShape from "../../utils/shapes";
import PropTypes from 'prop-types';
import {CONSTRUCTOR} from "../../utils/constants";

const DraggableElement = ({item, index, handleClose, moveCard}) => {
    const ref = useRef(null);

    const id = item._id;

    const [, drop] = useDrop({
        accept: CONSTRUCTOR,
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: CONSTRUCTOR,
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
        <li
            className={`${styles.item} mr-2`}
            ref={ref}
            style={{ opacity }}
        >
            <DragIcon/>
            <ConstructorElement
                handleClose={handleClose}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
            />
        </li>
    )
}

DraggableElement.propTypes = {
    item: IngredientShape.isRequired,
    index: PropTypes.number.isRequired,
    handleClose: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
};

export default DraggableElement;