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
} from '../../utils/constants';

const initialState = {
    name: null,
    email: null,
    is_login_completed: false,
    login_failed: false,
    login_request: false,
    logout_failed: false,
    logout_request: false,
    registration_failed: false,
    registration_request: false,
    forgot_password_failed: false,
    forgot_password_request: false,
    forgot_password_completed: false,
    reset_password_failed: false,
    reset_password_request: false,
    reset_password_completed: false,
    get_profile_failed: false,
    get_profile_request: false,
    save_profile_failed: false,
    save_profile_request: false,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_REGISTRATION_SUCCESS: {
            return {
                ...state,
                name: action.name,
                email: action.email,
                is_login_completed: true,
                registration_failed: false,
                registration_request: false,
            };
        }
        case SEND_REGISTRATION_REQUEST: {
            return {
                ...state,
                registration_failed: false,
                registration_request: true,
            };
        }
        case SEND_REGISTRATION_FAILED: {
            return {
                ...state,
                registration_failed: true,
                registration_request: false,
            };
        }

        case SEND_LOGIN_SUCCESS: {
            return {
                ...state,
                name: action.name,
                email: action.email,
                is_login_completed: true,
                login_failed: false,
                login_request: false,
            };
        }
        case SEND_LOGIN_REQUEST: {
            return {
                ...state,
                login_failed: false,
                login_request: true,
            };
        }
        case SEND_LOGIN_FAILED: {
            return {
                ...state,
                login_failed: true,
                login_request: false,
            };
        }

        case SEND_LOGOUT_SUCCESS: {
            return {
                ...state,
                name: null,
                email: null,
                is_login_completed: false,
                logout_failed: false,
                logout_request: false,
            };
        }
        case SEND_LOGOUT_REQUEST: {
            return {
                ...state,
                logout_failed: false,
                logout_request: true,
            };
        }
        case SEND_LOGOUT_FAILED: {
            return {
                ...state,
                logout_failed: true,
                logout_request: false,
            };
        }

        case SEND_FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgot_password_failed: false,
                forgot_password_request: false,
                forgot_password_completed: true,
            };
        }
        case SEND_FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgot_password_failed: false,
                forgot_password_request: true,
                forgot_password_completed: false,
            };
        }
        case SEND_FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                forgot_password_failed: true,
                forgot_password_request: false,
                forgot_password_completed: false,
            };
        }
        case SEND_RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                reset_password_failed: false,
                reset_password_request: false,
                reset_password_completed: true,
            };
        }
        case SEND_RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                reset_password_failed: false,
                reset_password_request: true,
                reset_password_completed: false,
            };
        }
        case SEND_RESET_PASSWORD_FAILED: {
            return {
                ...state,
                reset_password_failed: true,
                reset_password_request: false,
                reset_password_completed: false,
            };
        }

        case SEND_GET_PROFILE_SUCCESS: {
            return {
                ...state,
                get_profile_failed: false,
                get_profile_request: false,
                name: action.name,
                email: action.email,
                is_login_completed: true,
            };
        }
        case SEND_GET_PROFILE_REQUEST: {
            return {
                ...state,
                get_profile_failed: false,
                get_profile_request: true,
            };
        }
        case SEND_GET_PROFILE_FAILED: {
            return {
                ...state,
                get_profile_failed: true,
                get_profile_request: false,
                is_login_completed: true,
            };
        }

        case SEND_SAVE_PROFILE_SUCCESS: {
            return {
                ...state,
                save_profile_failed: false,
                save_profile_request: false,
                name: action.name,
                email: action.email,
            };
        }
        case SEND_SAVE_PROFILE_REQUEST: {
            return {
                ...state,
                save_profile_failed: false,
                save_profile_request: true,
            };
        }
        case SEND_SAVE_PROFILE_FAILED: {
            return {
                ...state,
                save_profile_failed: true,
                save_profile_request: false,
            };
        }

        default: {
            return state
        }
    }
}
