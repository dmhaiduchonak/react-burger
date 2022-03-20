import React, {useMemo} from "react";
import {STATUS_DONE, STATUS_PENDING} from "../../utils/constants";

interface Props {
  status: string;
}

const OrderStatus = ({status}: Props) => {

    const addClass = useMemo(() => {
        switch (status) {
            case STATUS_DONE:
                return 'text_color_success';
            case STATUS_PENDING:
                return 'text_color_default';
        }
    }, [status]);

    const textStatus = useMemo(() => {
        switch (status) {
            case STATUS_DONE:
                return 'Выполнен';
            case STATUS_PENDING:
                return 'Готовится';
            default:
                return status;
        }
    }, [status]);

    return (
        <p className={`text text_type_main-default ${addClass}`}>{textStatus}</p>
    )
}

export default OrderStatus;