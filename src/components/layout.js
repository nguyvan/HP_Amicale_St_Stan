import React from "react"
import Helmet from "react-helmet"

import Footer from "./footer"
import Header from "./header"
import TopBar from "./top-bar"
import Head from "./head"

import "fontsource-poppins"
import "fontsource-poppins/600.css"
import "fontsource-poppins/700.css"
import "fontsource-open-sans"
import "fontsource-dm-serif-display"

export default function Layout({ children, path, color, hideNewsletter, seo }) {

  const head = seo || <Head />;

  return (
    <div id="layout-container" style={color && {backgroundColor: color}}>
      {head}
      <main>
        <div id="header-container">
          <TopBar />
          <Header path={path}/>
        </div>
        {children}
        <Footer hideNewsletter={hideNewsletter} />
      </main>
    </div>
  )
}
