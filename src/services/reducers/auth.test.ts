import {authReducer, initialState} from './auth';
import {
    SEND_REGISTRATION_REQUEST,
    SEND_REGISTRATION_SUCCESS,
    SEND_REGISTRATION_FAILED,
    SEND_LOGIN_REQUEST,
    SEND_LOGIN_SUCCESS,
    SEND_LOGIN_FAILED,
    SEND_LOGOUT_REQUEST,
    SEND_LOGOUT_SUCCESS,
    SEND_LOGOUT_FAILED,
    SEND_FORGOT_PASSWORD_REQUEST,
    SEND_FORGOT_PASSWORD_SUCCESS,
    SEND_FORGOT_PASSWORD_FAILED,
    SEND_RESET_PASSWORD_REQUEST,
    SEND_RESET_PASSWORD_SUCCESS,
    SEND_RESET_PASSWORD_FAILED,
    SEND_GET_PROFILE_SUCCESS,
    SEND_GET_PROFILE_REQUEST,
    SEND_GET_PROFILE_FAILED,
    SEND_SAVE_PROFILE_SUCCESS,
    SEND_SAVE_PROFILE_REQUEST,
    SEND_SAVE_PROFILE_FAILED,
} from '../constants/auth';

describe('Auth reducer', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {type: '', name: '', email: ''})).toEqual(
            initialState
        )
    })

    it('should handle SEND_REGISTRATION_REQUEST', () => {
        expect(
            authReducer(initialState, {
                type: SEND_REGISTRATION_REQUEST,
                name: '',
                email: ''
            })
        ).toEqual(
            expect.objectContaining({
                registration_failed: false,
                registration_request: true,
            })
        )
    })

    it('should handle SEND_REGISTRATION_SUCCESS', () => {
        expect(
            authReducer(initialState, {
                type: SEND_REGISTRATION_SUCCESS,
                name: 'name',
                email: 'email'
            })
        ).toEqual(
            expect.objectContaining(
                {
                    name: 'name',
                    email: 'email',
                    is_login_completed: true,
                    registration_failed: false,
                    registration_request: false,
                }
            )
        )
    })

    it('should handle SEND_REGISTRATION_FAILED', () => {
        expect(
            authReducer(initialState, {
                type: SEND_REGISTRATION_FAILED,
                name: '',
                email: ''
            })
        ).toEqual(
            expect.objectContaining(
                {
                    registration_failed: true,
                    registration_request: false
                }
            )
        )
    })

    it('should handle SEND_LOGIN_SUCCESS', () => {
        expect(
            authReducer(initialState, {
                type: SEND_LOGIN_SUCCESS,
                name: 'name',
                email: 'email'
            })
        ).toEqual(
            expect.objectContaining(
                {
                    name: 'name',
                    email: 'email',
                    is_login_completed: true,
                    login_failed: false,
                    login_request: false,
                }
            )
        )
    })

    it('should handle SEND_LOGIN_REQUEST', () => {
        expect(
            authReducer(initialState, {
                type: SEND_LOGIN_REQUEST,
                name: '',
                email: ''
            })
        ).toEqual(
            expect.objectContaining(
                {
                    login_failed: false,
                    login_request: true,
                }
            )
        )
    })

    it('should handle SEND_LOGIN_FAILED', () => {
        expect(
            authReducer(initialState, {
                type: SEND_LOGIN_FAILED,
                name: '',
                email: ''
            })
        ).toEqual(
            expect.objectContaining(
                {
                    login_failed: true,
                    login_request: false,
                }
            )
        )
    })

    it('should handle SEND_LOGOUT_SUCCESS', () => {
        expect(
            authReducer(initialState, {
                type: SEND_LOGOUT_SUCCESS,
                name: '',
                email: ''
            })
        ).toEqual(
            expect.objectContaining(
                {
                    name: null,
                    email: null,
                    is_login_completed: true,
                    logout_failed: false,
                    logout_request: false,
                }
            )
        )
    })

    it('should handle SEND_LOGOUT_REQUEST', () => {
        expect(
            authReducer(initialState, {
                type: SEND_LOGOUT_REQUEST,
                name: '',
                email: ''
            })
        ).toEqual(
            expect.objectContaining(
                {
                    logout_failed: false,
                    logout_request: true,
                }
            )
        )
    })

    it('should handle SEND_LOGOUT_FAILED', () => {
        expect(
            authReducer(initialState, {
                type: SEND_LOGOUT_FAILED,
                name: '',
                email: ''
            })
        ).toEqual(
            expect.objectContaining(
                {
                    is_login_completed: false,
                    logout_failed: true,
                    logout_request: false,
                }
            )
        )
    })

    it('should handle SEND_FORGOT_PASSWORD_SUCCESS', () => {
        expect(
            authReducer(initialState, {
                type: SEND_FORGOT_PASSWORD_SUCCESS,
                name: '',
                email: ''
            })
        ).toEqual(
            expect.objectContaining(
                {
                    forgot_password_failed: false,
                    forgot_password_request: false,
                    forgot_password_completed: true,
                }
            )
        )
    })

    it('should handle SEND_FORGOT_PASSWORD_REQUEST', () => {
        expect(
            authReducer(initialState, {
                type: SEND_FORGOT_PASSWORD_REQUEST,
                name: '',
                email: ''
            })
        ).toEqual(
            expect.objectContaining(
                {
                    forgot_password_failed: false,
                    forgot_password_request: true,
                    forgot_password_completed: false,
                }
            )
        )
    })

    it('should handle SEND_FORGOT_PASSWORD_FAILED', () => {
        expect(
            authReducer(initialState, {
                type: SEND_FORGOT_PASSWORD_FAILED,
                name: '',
                email: ''
            })
        ).toEqual(
            expect.objectContaining(
                {
                    forgot_password_failed: true,
                    forgot_password_request: false,
                    forgot_password_completed: false,
                }
            )
        )
    })

    it('should handle SEND_RESET_PASSWORD_SUCCESS', () => {
        expect(
            authReducer(initialState, {
                type: SEND_RESET_PASSWORD_SUCCESS,
                name: '',
                email: ''
            })
        ).toEqual(
            expect.objectContaining(
                {
                    reset_password_failed: false,
                    reset_password_request: false,
                    reset_password_completed: true,
                }
            )
        )
    })

    it('should handle SEND_RESET_PASSWORD_REQUEST', () => {
        expect(
            authReducer(initialState, {
                type: SEND_RESET_PASSWORD_REQUEST,
                name: '',
                email: ''
            })
        ).toEqual(
            expect.objectContaining(
                {
                    reset_password_failed: false,
                    reset_password_request: true,
                    reset_password_completed: false,
                }
            )
        )
    })

    it('should handle SEND_RESET_PASSWORD_FAILED', () => {
        expect(
            authReducer(initialState, {
                type: SEND_RESET_PASSWORD_FAILED,
                name: '',
                email: ''
            })
        ).toEqual(
            expect.objectContaining(
                {
                    reset_password_failed: true,
                    reset_password_request: false,
                    reset_password_completed: false,
                }
            )
        )
    })

    it('should handle SEND_GET_PROFILE_SUCCESS', () => {
        expect(
            authReducer(initialState, {
                type: SEND_GET_PROFILE_SUCCESS,
                name: 'name',
                email: 'email'
            })
        ).toEqual(
            expect.objectContaining(
                {
                    get_profile_failed: false,
                    get_profile_request: false,
                    name: 'name',
                    email: 'email',
                    is_login_completed: true,
                }
            )
        )
    })

    it('should handle SEND_GET_PROFILE_REQUEST', () => {
        expect(
            authReducer(initialState, {
                type: SEND_GET_PROFILE_REQUEST,
                name: '',
                email: ''
            })
        ).toEqual(
            expect.objectContaining(
                {
                    get_profile_failed: false,
                    get_profile_request: true,
                }
            )
        )
    })

    it('should handle SEND_GET_PROFILE_FAILED', () => {
        expect(
            authReducer(initialState, {
                type: SEND_GET_PROFILE_FAILED,
                name: '',
                email: ''
            })
        ).toEqual(
            expect.objectContaining(
                {
                    get_profile_failed: true,
                    get_profile_request: false,
                    is_login_completed: true,
                }
            )
        )
    })

    it('should handle SEND_SAVE_PROFILE_SUCCESS', () => {
        expect(
            authReducer(initialState, {
                type: SEND_SAVE_PROFILE_SUCCESS,
                name: 'name',
                email: 'email'
            })
        ).toEqual(
            expect.objectContaining(
                {
                    save_profile_failed: false,
                    save_profile_request: false,
                    name: 'name',
                    email: 'email',
                }
            )
        )
    })

    it('should handle SEND_SAVE_PROFILE_REQUEST', () => {
        expect(
            authReducer(initialState, {
                type: SEND_SAVE_PROFILE_REQUEST,
                name: '',
                email: ''
            })
        ).toEqual(
            expect.objectContaining(
                {
                    save_profile_failed: false,
                    save_profile_request: true,
                }
            )
        )
    })

    it('should handle SEND_SAVE_PROFILE_FAILED', () => {
        expect(
            authReducer(initialState, {
                type: SEND_SAVE_PROFILE_FAILED,
                name: '',
                email: ''
            })
        ).toEqual(
            expect.objectContaining(
                {
                    save_profile_failed: true,
                    save_profile_request: false,
                }
            )
        )
    })

})