import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import React from "react";
import {useRef} from 'react';
import {DragObjectFactory, DragSourceMonitor, DropTargetMonitor, useDrag, useDrop} from "react-dnd";
import {CONSTRUCTOR} from "../../utils/constants";
import {TItem} from "../../types";

interface Props {
    item: TItem;
    index: number;
    handleClose : () => void;
    moveCard : (dragIndex: any, hoverIndex: any) => void
}

const DraggableElement = ({item, index, handleClose, moveCard}: Props) => {
    const ref = useRef<HTMLLIElement>(null);

    const id:string = item._id;

    const [, drop] = useDrop({
        accept: CONSTRUCTOR,
        hover(item: DragObjectFactory<TItem> & {index: number}, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY:number = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset:any = monitor.getClientOffset();
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
        item: (): {id: string, index: number} => {
            return { id, index };
        },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity:number = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
        <li
            className={`${styles.item} mr-2`}
            ref={ref}
            style={{ opacity }}
        >
            <DragIcon type="primary"/>
            <ConstructorElement
                handleClose={handleClose}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
            />
        </li>
    )
}

export default DraggableElement;