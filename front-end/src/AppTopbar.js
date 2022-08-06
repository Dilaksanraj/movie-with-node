import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { AppsConst } from './shared/AppsConst';
import EmptyPage from './pages/EmptyPage';
import { NavLink } from 'react-router-dom';
import { clearAuth, logout } from './common/service/auth.service';


export const AppTopbar = (props) => {

    const isAuth = localStorage.getItem(AppsConst.token) ? true : false;
    const history = useHistory();

    async function logoutHndle(){
        const response = logout();
        localStorage.clear();
    }

    return (
        <>
            <div className="layout-topbar">
                <Link to="/home" className="layout-topbar-logo">
                    <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/logo-dark.svg' : 'assets/layout/images/logo-white.svg'} alt="logo" />
                    <span>{AppsConst.AppName}</span>
                </Link>

                {!props.isCommon &&
                    <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                        <i className="pi pi-bars" />
                    </button>

                }

                <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                    <i className="pi pi-ellipsis-v" />
                </button>

                <ul className={classNames("layout-topbar-menu lg:flex origin-top", { 'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                    {
                        !isAuth &&
                        <>
                            <li>
                                <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick} style={{width: '100px', fontSize: '14px'}}>
                                    <NavLink className="p-ripple" activeClassName="router-link-active router-link-exact-active" to='/login'>
                                        {/* <i className="pi pi-user" /> */}
                                        Login
                                        <span>Login</span>
                                    </NavLink>

                                </button>
                            </li>
                        </>
                    }
                    {
                        isAuth &&
                        <>
                            <li>
                                <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick} style={{width: '100px', fontSize: '14px'}}>
                                    <NavLink className="" activeClassName="router-link-active router-link-exact-active" to='/home'>
                                        My movie
                                        {/* <i className="pi pi-star" /> */}
                                        <span>Events</span>
                                    </NavLink>

                                </button>
                            </li>
                            <li>
                                <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick} style={{width: '100px', fontSize: '14px'}}>

                                    <NavLink className="" activeClassName="router-link-active router-link-exact-active" to='/setting'>
                                    Settings
                                        {/* <i className="pi pi-cog" /> */}
                                        <span>Settings</span>
                                    </NavLink>

                                </button>
                            </li>

                            <li>
                                <button className="p-link layout-topbar-button" onClick={clearAuth} style={{width: '100px', fontSize: '14px'}}>
                                    <NavLink className="" activeClassName="router-link-active router-link-exact-active" to='/login' onClick={logoutHndle} >
                                    Logout
                                        <span>Logout</span>
                                    </NavLink>

                                </button>
                            </li>
                        </>
                    }

                </ul>
            </div>
        </>


    );
}
