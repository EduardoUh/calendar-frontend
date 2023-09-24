import { useAuthStore } from '../../hooks';


export const NavBar = () => {
    const { user, startLogout } = useAuthStore();
    return (
        <div className="navbar navbar-dark bg-dark mb-4 px-4">
            <span className="navbar-brand">
                <i className="fas fa-calendar-alt" />
                &nbsp;
                {user.name.toUpperCase()}
            </span>
            <button
                onClick={startLogout}
                className="btn btn-outline-danger"
            >
                <i className="fas fa-sign-out-alt" />
                &nbsp;&nbsp;
                <span>Log Out</span>
            </button>
        </div>
    )
}
