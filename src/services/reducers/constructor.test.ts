import {constructorReducer, initialState} from './constructor';
import {
    SET_CONSTRUCTOR_BUN,
    ADD_CONSTRUCTOR_ITEM,
    REMOVE_CONSTRUCTOR_ITEM,
    MOVE_CONSTRUCTOR_ITEM,
    RESET_CONSTRUCTOR
} from '../constants/constructor';

const testItem = {
    calories: 643,
    carbohydrates: 85,
    fat: 26,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    key: "CLTz1daaVtFbofewWawdh",
    name: "Флюоресцентная булка R2-D3",
    price: 988,
    proteins: 44,
    type: "bun",
    __v: 0,
    _id: "60d3b41abdacab0026a733c7",
    id: "60d3b41abdacab0026a733c7",
    counter: 0
};

const testItem2 = {
    calories: 99,
    carbohydrates: 42,
    fat: 24,
    image: "https://code.s3.yandex.net/react/code/sauce-03.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
    key: "sdfgs9eijesffadf",
    name: "Соус традиционный галактический",
    price: 15,
    proteins: 42,
    type: "sauce",
    __v: 0,
    _id: "60d3b41abdacab0026a733ce",
    id: "60d3b41abdacab0026a733ce",
    counter: 0,
}

describe('Constructor reducer', () => {
    it('should return the initial state', () => {
        expect(constructorReducer(undefined, {type: '', item: testItem, dragIndex: 0, hoverIndex: 0})).toEqual(
            initialState
        )
    })

    it('should handle SET_CONSTRUCTOR_BUN', () => {
        expect(
            constructorReducer(initialState, {
                type: SET_CONSTRUCTOR_BUN,
                item: testItem,
                dragIndex: 0,
                hoverIndex: 0
            })
        ).toEqual(
            {
                bun: testItem,
                items: []
            }
        )
    })
    it('should handle ADD_CONSTRUCTOR_ITEM', () => {
        expect(
            constructorReducer(initialState, {
                type: ADD_CONSTRUCTOR_ITEM,
                item: testItem,
                dragIndex: 0,
                hoverIndex: 0
            })
        ).toEqual(
            {
                bun: null,
                items: [
                    testItem
                ]
            }
        )
    })
    it('should handle REMOVE_CONSTRUCTOR_ITEM', () => {
        expect(
            constructorReducer({
                bun: null,
                items: [
                    testItem,
                    testItem2
                ]
            }, {
                type: REMOVE_CONSTRUCTOR_ITEM,
                item: testItem,
                dragIndex: 0,
                hoverIndex: 0
            })
        ).toEqual(
            {
                bun: null,
                items: [
                    testItem2
                ]
            }
        )
    })
    it('should handle MOVE_CONSTRUCTOR_ITEM', () => {
        expect(
            constructorReducer({
                bun: null,
                items: [
                    testItem,
                    testItem2
                ]
            }, {
                type: MOVE_CONSTRUCTOR_ITEM,
                item: testItem,
                dragIndex: 1,
                hoverIndex: 0
            })
        ).toEqual(
            {
                bun: null,
                items: [
                    testItem2,
                    testItem
                ]
            }
        )
    })
    it('should handle RESET_CONSTRUCTOR', () => {
        expect(
            constructorReducer({
                bun: null,
                items: [
                    testItem,
                    testItem2
                ]
            }, {
                type: RESET_CONSTRUCTOR,
                item: testItem,
                dragIndex: 0,
                hoverIndex: 0
            })
        ).toEqual(
            {
                bun: null,
                items: []
            }
        )
    })

})