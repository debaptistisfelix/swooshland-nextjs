
import styles from './page.module.css'
import ResetPassword from '@app/components/Authentication/resetPassword/ResetPassword'

export const metadata = {
    title: 'Reset Password - Swooshland Customs',
    description: 'Manage your cart items here. Add, remove, and update your cart items.',
  } 

export default function resetPasswordPage(){
    return (
        <main className={styles.resetPasswordPage}>
            <ResetPassword />
        </main>
    )
}