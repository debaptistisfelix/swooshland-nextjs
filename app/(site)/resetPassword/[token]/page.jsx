
import styles from './page.module.css'
import ResetPassword from '@app/components/Authentication/resetPassword/ResetPassword'


export default function resetPasswordPage(){
    return (
        <main className={styles.resetPasswordPage}>
            <ResetPassword />
        </main>
    )
}