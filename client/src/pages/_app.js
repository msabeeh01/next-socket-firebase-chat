import '../app/globals.css'
//parent component for all pages
export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
  }