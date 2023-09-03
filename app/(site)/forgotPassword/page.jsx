
import styles from './page.module.css'
import ForgotPassword from '@app/components/Authentication/forgotPassword/ForgotPassword'

export default function ForgotPasswordPage(){
    return (
        <main className={styles.forgotPasswordPage}>
            <ForgotPassword />
        </main>
    )
}