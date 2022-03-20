import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import type {RootState} from '../services/store'
import type {AppDispatch} from '../types'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector