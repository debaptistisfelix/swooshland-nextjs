import './globals.css'
import { Inter} from 'next/font/google'
import Provider from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import ToastContext from './context/ToastContext'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import OrderContextProvider from './context/OrderContext'
import BugDetector from './components/BugDetector/BugDetector'
import TouchContextProvider from './context/TouchContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Swooshland Customs - Homepage',
  description: 'Custom Sneakers and Accessories',
} 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <OrderContextProvider>
          <ToastContext/>
            <CartProvider>
             <Navbar/>
             <BugDetector/>
             <TouchContextProvider>
              {children}
              </TouchContextProvider>
            </CartProvider>
            </OrderContextProvider>
          </Provider>
        <Footer/>
      </body>
    </html>
  )
}
