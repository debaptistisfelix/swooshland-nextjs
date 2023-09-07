
import styles from './page.module.css'
import LoginSection from '@app/components/Authentication/Login/LoginSection/LoginSection'

export const metadata = {
    title: 'Sign In - Swooshland Customs',
    description: 'Manage your cart items here. Add, remove, and update your cart items.',
  } 
export default function LoginPage(){

    return (
        <main className={styles.loginPageCointainer}>
           <LoginSection />
        </main>
    )
}
