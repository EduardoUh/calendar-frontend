import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm, useAuthStore } from '../../hooks';
import './LoginPage.css';


const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: ''
}

export const LoginPage = () => {
    const { loginEmail, loginPassword, onInputChange } = useForm(loginFormFields);
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerFormFields);
    const { startLogin, startSignUp, errorMessage } = useAuthStore();

    useEffect(() => {
        if (errorMessage) {
            Swal.fire({
                title: 'Error',
                text: errorMessage,
                icon: 'error'
            });
        }
    }, [errorMessage]);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (!loginEmail.length) {
            return Swal.fire({
                title: 'Error',
                text: 'Email is a required field',
                icon: 'error'
            });
        }
        if (loginPassword.length < 8) {
            return Swal.fire({
                title: 'Error',
                text: 'Password should contain at least 8 characters',
                icon: 'error'
            });
        }
        startLogin({ email: loginEmail, password: loginPassword });
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        if (!registerName.length) {
            return Swal.fire({
                title: 'Error',
                text: 'Name is a required field',
                icon: 'error'
            });
        }
        if (!registerEmail.length) {
            return Swal.fire({
                title: 'Error',
                text: 'Email is a required field',
                icon: 'error'
            });
        }
        if (registerPassword.length < 8) {
            return Swal.fire({
                title: 'Error',
                text: 'Password should contain at least 8 characters',
                icon: 'error'
            });
        }
        if (registerPassword !== registerPassword2) {
            return Swal.fire({
                title: 'Error',
                text: 'Passwords didn\'t match',
                icon: 'error'
            });
        }
        startSignUp({ name: registerName, email: registerEmail, password: registerPassword });
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Login</h3>
                    <form
                        onSubmit={handleLoginSubmit}
                    >
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="email"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="password"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Sign Up</h3>
                    <form
                        onSubmit={handleRegisterSubmit}
                    >
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="name"
                                name="registerName"
                                value={registerName}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="email"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="password"
                                name="registerPassword"
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="repeat password"
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Sign up" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}