import '../styles/globals.css'
import NavBar from '../components/NavBar'
import { AuthProvider } from '../lib/auth.js'


function MyApp({ Component, pageProps }) {
  return (
    <>
    <AuthProvider>
      <NavBar/>
      <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default MyApp