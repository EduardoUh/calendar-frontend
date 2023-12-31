import { useSelector, useDispatch } from 'react-redux';
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from '../store';
import { calendarApi } from '../api';


export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            dispatch(onLogout(error.response.data.message));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startSignUp = async ({ name, email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post('/auth/signup', { name, email, password });
            localStorage.setItem('token', data.token);
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            dispatch(onLogout(error.response.data.message));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());
        try {
            const { data } = await calendarApi.get('/auth/renew-token');
            localStorage.setItem('token', data.token);
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = async () => {
        localStorage.clear();
        dispatch(onLogoutCalendar());
        dispatch(onLogout());
    }

    return {
        //* Properties
        status,
        user,
        errorMessage,
        //* Methods
        startLogin,
        startSignUp,
        checkAuthToken,
        startLogout
    }
}