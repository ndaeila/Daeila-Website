import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Article from './Article/Article';
import { Encode_Sans } from 'next/font/google'

const EncodeSansFont = Encode_Sans({ subsets: ['latin'] })

type BlogLayoutProps = {
  children: ReactNode;
};

const Layout = ( { children } : BlogLayoutProps) => {
  return (
    <div className={EncodeSansFont.className + " bg-silver-rust-300 text-silver-rust-800"}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;