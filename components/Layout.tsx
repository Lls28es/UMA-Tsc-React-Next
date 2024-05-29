import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
// import { useRouter } from 'next/router';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
    // const router = useRouter();
    return (
        <div className='p-0'>
            <Header />
            <div className="layoutChild px-4">{props.children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
