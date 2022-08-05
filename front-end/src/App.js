import React, { useState, useEffect, useRef, useMemo } from 'react';
import classNames from 'classnames';
import { Route, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppConfig } from './AppConfig';

import Dashboard from './components/Dashboard';
import ButtonDemo from './components/ButtonDemo';
import ChartDemo from './components/ChartDemo';
import Documentation from './components/Documentation';
import FileDemo from './components/FileDemo';
import FloatLabelDemo from './components/FloatLabelDemo';
import FormLayoutDemo from './components/FormLayoutDemo';
import InputDemo from './components/InputDemo';
import PopularMovie from './components/ListDemo';
import MenuDemo from './components/MenuDemo';
import MessagesDemo from './components/MessagesDemo';
import MiscDemo from './components/MiscDemo';
import OverlayDemo from './components/OverlayDemo';
import MediaDemo from './components/MediaDemo';
import PanelDemo from './components/PanelDemo';
import TableDemo from './components/TableDemo';
import TreeDemo from './components/TreeDemo';
import InvalidStateDemo from './components/InvalidStateDemo';
import BlocksDemo from './components/BlocksDemo';
import IconsDemo from './components/IconsDemo';

import MovieListAdmin from './components/MovieList';
import UserListAdmin from './components/UserList';

import Crud from './pages/Crud';
import EmptyPage from './pages/EmptyPage';
import TimelineDemo from './pages/TimelineDemo';

import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';

import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './assets/demo/flags/flags.css';
import './assets/demo/Demos.scss';
import './assets/layout/layout.scss';
import './App.scss';
import { Navigation, NavigationDev } from './navigation/navigation';
import Login from './common/Login';
import Register from './common/Register';
import { AppsConst } from './shared/AppsConst';
import Home from './common/Home';
import MovieDetailsView from './components/MovieDetailsView';
import './assets/css/common.css';
import { LoadingContaxt } from './shared/context/common.context';


const App = () => {
    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState('light')
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();

    const providerValue = useMemo(()=> ({isLoading, setLoading}), [isLoading, setLoading]);

    // const [isAutheticated, setIsAutheticated] = useState(AppsConst.token ? true : false);

    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    }

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value)
    }

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode)
    }

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode)
    }

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    }

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive((prevState) => !prevState);
            }
        }
        else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    }

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }
    const isDesktop = () => {
        return window.innerWidth >= 992;
    }

    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false,
        'layout-theme-light': layoutColorMode === 'light'
    });


    const envirment = 'DEV';
    const currentUrl = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    const isCommonRoute = AppsConst.commonUrl.find(e => e.url == `/${currentUrl}`) ? true : false;
    const isAutheticated = localStorage.getItem(AppsConst.token) ? true : false;

    
    return (
        <>
            {
                isCommonRoute && !isAutheticated && <>
                    <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode} isCommon={isCommonRoute} isAuth={isAutheticated}
                        mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />
                    <div className="layout-main-container">
                        <div className="layout-main">
                            {/* <EmptyPage></EmptyPage> */}

                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Route path="/home" component={Home} />
                        </div>
                    </div>
                </>
            }
            {isCommonRoute && isAutheticated &&
                <>
                    <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode} isCommon={isCommonRoute} isAuth={isAutheticated}
                        mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />
                    {currentUrl !== 'movie'&&
                    <PopularMovie></PopularMovie>
                    }
                
                </>
            }

            {!isCommonRoute && currentUrl.length >18&&
                <>
                <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode} isCommon={isCommonRoute} isAuth={isAutheticated}
                mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />
                
                <Route path="/movie/:id" component={MovieDetailsView} />
                </>
            }


            {!isCommonRoute && currentUrl.length <18 && <div className={wrapperClass} onClick={onWrapperClick}>
                <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

                <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode}
                    mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />
                <div className="layout-sidebar" onClick={onSidebarClick}>
                    <AppMenu model={envirment === 'DEV' ? NavigationDev : Navigation} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
                </div>


                <div className="layout-main-container">
                    <div className="layout-main">
                        <Route path="/dashboard" exact render={() => <Dashboard colorMode={layoutColorMode} location={location} />} />
                        <Route path="/formlayout" component={FormLayoutDemo} />
                        <Route path="/input" component={InputDemo} />
                        <Route path="/floatlabel" component={FloatLabelDemo} />
                        <Route path="/invalidstate" component={InvalidStateDemo} />
                        <Route path="/button" component={ButtonDemo} />
                        <Route path="/table" component={TableDemo} />
                        <Route path="/list" component={PopularMovie} />
                        <Route path="/tree" component={TreeDemo} />
                        <Route path="/panel" component={PanelDemo} />
                        <Route path="/overlay" component={OverlayDemo} />
                        <Route path="/media" component={MediaDemo} />
                        <Route path="/menu" component={MenuDemo} />
                        <Route path="/messages" component={MessagesDemo} />
                        <Route path="/blocks" component={BlocksDemo} />
                        <Route path="/icons" component={IconsDemo} />
                        <Route path="/file" component={FileDemo} />
                        <Route path="/chart" render={() => <ChartDemo colorMode={layoutColorMode} location={location} />} />
                        <Route path="/misc" component={MiscDemo} />
                        <Route path="/timeline" component={TimelineDemo} />
                        <Route path="/crud" component={Crud} />
                        <Route path="/empty" component={EmptyPage} />
                        <Route path="/documentation" component={Documentation} />

                        {/* admin */}
                        <Route path="/manage-movie" component={MovieListAdmin} />
                        <Route path="/manage-user" component={UserListAdmin} />
                        
                    </div>

                    <AppFooter layoutColorMode={layoutColorMode} />
                </div>

                

                <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                    layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

                <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                    <div className="layout-mask p-component-overlay"></div>
                </CSSTransition>

            </div>
            }
        </>



    );

}

export default App;
