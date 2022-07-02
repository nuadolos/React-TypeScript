import { AppDispatch } from './../../index';
import { IUser } from './../../../models/IUser';
import { AuthActionEnum, SetUserAction, SetAuthAction, SetIsLoadingAction, SetErrorAction } from './types';
import axios from 'axios';
import { useState } from 'react';
import UserService from '../../../api/UserService';

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({ type: AuthActionEnum.SET_USER, payload: user }),
    setIsAuth: (isAuth: boolean): SetAuthAction => ({ type: AuthActionEnum.SET_IS_AUTH, payload: isAuth }),
    setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({ type: AuthActionEnum.SET_IS_LOADING, payload: isLoading }),
    setError: (error: string): SetErrorAction => ({ type: AuthActionEnum.SET_ERROR, payload: error }),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            setTimeout(async () => {
                dispatch(AuthActionCreators.setIsLoading(true));
                const response = await UserService.getUsers();
                const user = response.data.find(user => user.username === username && user.password === password);
                if (user) {
                    localStorage.setItem('auth', 'true');
                    localStorage.setItem('username', user.username);
                    dispatch(AuthActionCreators.setUser(user));
                    dispatch(AuthActionCreators.setIsAuth(true));
                } else {
                    dispatch(AuthActionCreators.setError('Некорректный логин или пароль'));
                }
                dispatch(AuthActionCreators.setIsLoading(false));
            }, 1000)
        } catch (e) {
            dispatch(AuthActionCreators.setError(`Ошибка: ${(e as Error).message}`));
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth');
        localStorage.removeItem('username');
        dispatch(AuthActionCreators.setUser({} as IUser));
        dispatch(AuthActionCreators.setIsAuth(false));
    }
}