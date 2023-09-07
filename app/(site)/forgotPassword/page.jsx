
import styles from './page.module.css'
import ForgotPassword from '@app/components/Authentication/forgotPassword/ForgotPassword'


export const metadata = {
    title: 'Forgot Password - Swooshland Customs',
    description: 'Forgot your password? Reset it here.',
  } 
export default function ForgotPasswordPage(){
    return (
        <main className={styles.forgotPasswordPage}>
            <ForgotPassword />
        </main>
    )
}