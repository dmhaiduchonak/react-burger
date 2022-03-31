import {ingredientsReducer, initialState} from './ingredients';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    SET_INGREDIENTS_CURRENT_TAB,
    INCREMENT_INGREDIENT_COUNTER,
    DECREMENT_INGREDIENT_COUNTER
} from '../constants/ingredients';

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
        expect(ingredientsReducer(undefined, {type: '', item: testItem, items: [testItem], tab: ''})).toEqual(
            initialState
        )
    })

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(
            ingredientsReducer(initialState, {
                type: GET_INGREDIENTS_REQUEST,
                item: testItem,
                items: [testItem],
                tab: ''
            })
        ).toEqual(
            expect.objectContaining(
                {
                    request: true,
                    failed: false,
                }
            )
        )
    })

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(
            ingredientsReducer(initialState, {
                type: GET_INGREDIENTS_SUCCESS,
                item: testItem,
                items: [testItem],
                tab: ''
            })
        ).toEqual(
            expect.objectContaining(
                {
                    items: [testItem],
                    request: false,
                }
            )
        )
    })

    it('should handle GET_INGREDIENTS_FAILED', () => {
        expect(
            ingredientsReducer(initialState, {
                type: GET_INGREDIENTS_FAILED,
                item: testItem,
                items: [testItem],
                tab: ''
            })
        ).toEqual(
            initialState
        )
    })

    it('should handle SET_INGREDIENTS_CURRENT_TAB', () => {
        expect(
            ingredientsReducer(initialState, {
                type: SET_INGREDIENTS_CURRENT_TAB,
                item: testItem,
                items: [testItem],
                tab: 'bun'
            })
        ).toEqual(
            expect.objectContaining(
                {
                    currentTab: 'bun',
                }
            )
        )
    })

    it('should handle INCREMENT_INGREDIENT_COUNTER', () => {
        expect(
            ingredientsReducer({
                currentTab: 'bun',
                items: [testItem],
                request: false,
                failed: false,
                currentIngredient: null
            }, {
                type: INCREMENT_INGREDIENT_COUNTER,
                item: testItem,
                items: [testItem],
                tab: ''
            })
        ).toEqual(
            {
                currentIngredient: null,
                currentTab: "bun",
                failed: false,
                request: false,
                items: [
                    {
                        __v: 0,
                        _id: "60d3b41abdacab0026a733c7",
                        calories: 643,
                        carbohydrates: 85,
                        counter: 2,
                        fat: 26,
                        id: "60d3b41abdacab0026a733c7",
                        image: "https://code.s3.yandex.net/react/code/bun-01.png",
                        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
                        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                        key: "CLTz1daaVtFbofewWawdh",
                        name: "Флюоресцентная булка R2-D3",
                        price: 988,
                        proteins: 44,
                        type: "bun"
                    }
                ],
            }
        )

        expect(
            ingredientsReducer({
                currentTab: 'bun',
                items: [testItem2],
                request: false,
                failed: false,
                currentIngredient: null
            }, {
                type: INCREMENT_INGREDIENT_COUNTER,
                item: testItem2,
                items: [testItem2],
                tab: ''
            })
        ).toEqual(
            {
                currentIngredient: null,
                currentTab: "bun",
                failed: false,
                request: false,
                items: [
                    {
                        __v: 0,
                        _id: "60d3b41abdacab0026a733ce",
                        calories: 99,
                        carbohydrates: 42,
                        counter: 1,
                        fat: 24,
                        id: "60d3b41abdacab0026a733ce",
                        image: "https://code.s3.yandex.net/react/code/sauce-03.png",
                        image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
                        image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
                        key: "sdfgs9eijesffadf",
                        name: "Соус традиционный галактический",
                        price: 15,
                        proteins: 42,
                        type: "sauce"
                    }
                ],
            }
        )
    })
    it('should handle DECREMENT_INGREDIENT_COUNTER', () => {
        expect(
            ingredientsReducer({
                currentTab: 'bun',
                items: [
                    {
                        __v: 0,
                        _id: "60d3b41abdacab0026a733c7",
                        calories: 643,
                        carbohydrates: 85,
                        counter: 2,
                        fat: 26,
                        id: "60d3b41abdacab0026a733c7",
                        image: "https://code.s3.yandex.net/react/code/bun-01.png",
                        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
                        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                        key: "CLTz1daaVtFbofewWawdh",
                        name: "Флюоресцентная булка R2-D3",
                        price: 988,
                        proteins: 44,
                        type: "bun"
                    }
                ],
                request: false,
                failed: false,
                currentIngredient: null
            }, {
                type: DECREMENT_INGREDIENT_COUNTER,
                item: testItem,
                items: [testItem],
                tab: ''
            })
        ).toEqual(
            {
                currentIngredient: null,
                currentTab: "bun",
                failed: false,
                request: false,
                items: [
                    {
                        __v: 0,
                        _id: "60d3b41abdacab0026a733c7",
                        calories: 643,
                        carbohydrates: 85,
                        counter: 0,
                        fat: 26,
                        id: "60d3b41abdacab0026a733c7",
                        image: "https://code.s3.yandex.net/react/code/bun-01.png",
                        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
                        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                        key: "CLTz1daaVtFbofewWawdh",
                        name: "Флюоресцентная булка R2-D3",
                        price: 988,
                        proteins: 44,
                        type: "bun"
                    }
                ],
            }
        )

        expect(
            ingredientsReducer({
                currentTab: 'bun',
                items: [
                    {
                        __v: 0,
                        _id: "60d3b41abdacab0026a733ce",
                        calories: 99,
                        carbohydrates: 42,
                        counter: 4,
                        fat: 24,
                        id: "60d3b41abdacab0026a733ce",
                        image: "https://code.s3.yandex.net/react/code/sauce-03.png",
                        image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
                        image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
                        key: "sdfgs9eijesffadf",
                        name: "Соус традиционный галактический",
                        price: 15,
                        proteins: 42,
                        type: "sauce"
                    }
                ],
                request: false,
                failed: false,
                currentIngredient: null
            }, {
                type: DECREMENT_INGREDIENT_COUNTER,
                item: testItem2,
                items: [testItem2],
                tab: ''
            })
        ).toEqual(
            {
                currentIngredient: null,
                currentTab: "bun",
                failed: false,
                request: false,
                items: [
                    {
                        __v: 0,
                        _id: "60d3b41abdacab0026a733ce",
                        calories: 99,
                        carbohydrates: 42,
                        counter: 3,
                        fat: 24,
                        id: "60d3b41abdacab0026a733ce",
                        image: "https://code.s3.yandex.net/react/code/sauce-03.png",
                        image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
                        image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
                        key: "sdfgs9eijesffadf",
                        name: "Соус традиционный галактический",
                        price: 15,
                        proteins: 42,
                        type: "sauce"
                    }
                ],
            }
        )
    })
})