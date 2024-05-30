import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface HeaderProps { }

const Header: React.FC<HeaderProps> = (props) => {
    const router = useRouter();
    const [navBarOpen, setNavBarOpen] = useState<boolean>(true);
    const [currentPath, setCurrentPath] = useState<string>('/');

    useEffect(() => {
        setCurrentPath(router.route);
        // console.log(router);
    }, [router.route]);

    const toggleNavbar = () => {
        setNavBarOpen(!navBarOpen);
    };

    return (
        <Fragment>
            <div className="header" id="header">
                <div className="marquesina">
                    <a id="click-banner-suscripciones-web" href="https://umasalud.com/">
                        <p>
                            ¡Conocé nuestras nuevas suscripciones mensuales para cuidar tu
                            salud! <span> Más información </span>
                        </p>
                    </a>
                </div>
                <nav className="navbar navbar-expand-lg px-1">
                    <a className="navbar-brand" href="/">
                        <img
                            className="logo"
                            alt="logo-prt-san-damaso"
                            src="/logo.webp"
                            width="55px"
                            height="20px"
                        />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarToggler"
                        aria-controls="navbarToggler"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon">
                            <img
                                alt="menu-mobile"
                                className="menu-mobile w-100"
                                src="/menu.png"
                                onClick={toggleNavbar}
                            />
                        </span>
                    </button>
                    <div
                        className={
                            navBarOpen
                                ? 'collapse navbar-collapse show'
                                : 'collapse navbar-collapse'
                        }
                        id="navbarToggler"
                    >
                        <ul className="navbar-nav mt-2 mt-lg-0">
                            <li className={currentPath === '/' ? 'nav-item active' : 'nav-item'}>
                                <Link href="/" className="nav-link">
                                    Inicio
                                </Link>
                            </li>

                            <li className={currentPath === '/sobreMi' ? 'nav-item active' : 'nav-item'}>
                                <Link href="https://umasalud.com/empresas" className="nav-link">
                                    ÜMA para empresas
                                </Link>
                            </li>

                            <li className={currentPath === '/imagenes' ? 'nav-item active' : 'nav-item'}>
                                <Link href="https://umasalud.com/trabaja-con-nosotros" className="nav-link">
                                    Sumate al equipo
                                </Link>
                            </li>

                            <li className={currentPath === '/contacto' ? 'nav-item active' : 'nav-item'}>
                                <Link href="https://umasalud.com/blog" className="nav-link">
                                    Blog
                                </Link>
                            </li>
                            <li className={currentPath === '/contacto' ? 'nav-item active' : 'nav-item'}>
                                <Link href="https://umasalud.com/suscripciones" className="nav-link">
                                    Suscripciones
                                </Link>
                            </li>
                            <li className={currentPath === '/contacto' ? 'nav-item active' : 'nav-item'}>
                                <Link href="/" className="nav-link">
                                    Servicios
                                </Link>
                            </li>
                        </ul>
                    </div>

                </nav>
            </div>
        </Fragment>
    );
};

export default Header;
