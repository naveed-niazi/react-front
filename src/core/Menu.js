import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { signout, isLoggedIn } from '../auth'

const isActive = (history, path) => {
    if (history.location.pathname == path) return { color: "#ff9900" }
    else return { color: "#ffffff" }
}

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-primary mr-auto">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/")} to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={`/post/create`}
                    style={isActive(history, `/post/create`)}>
                    Create Post
                        </Link>
            </li>
            
            {!isLoggedIn() && (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/users")} to="/users">Users</Link>
                    </li>
                    
                    <li className="nav-item ml-auto">
                        <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">Sing In</Link>
                    </li>

                    <li className="nav-item ">
                        <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">Sign Up</Link>
                    </li>
                </>
            )}
            {isLoggedIn() && (
                <>
                    <li className="nav-item ml-auto">
                        <Link className="nav-link" to={`/findpeople`}
                            style={isActive(history, `/findpeople`)}>
                            Find Friends
                        </Link>
                    </li>
                    
                    <li className="nav-item ">
                        <a className="nav-link" style={isActive(history, "/signup"), { cursor: 'pointer', color: '#ffffff' }}
                            onClick={() => signout(() => history.push('/signin'))}>
                            Sign Out</a>
                    </li>
                    <li className="nav-item bg-success">
                        <Link className="nav-link" to={`/user/${isLoggedIn().user._id}`}
                            style={isActive(history, `/user/${isLoggedIn().user._id}`)}>
                            {`${isLoggedIn().user.username}'s Profile`}
                        </Link>
                    </li>
                </>
            )}


        </ul>
    </div>
)

export default withRouter(Menu);