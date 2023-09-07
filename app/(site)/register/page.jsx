
import styles from './page.module.css'
import RegisterSection from '@app/components/Authentication/Register/RegisterSection/RegisterSection'

export const metadata = {
  title: 'Sign Up - Swooshland Customs',
  description: 'Manage your cart items here. Add, remove, and update your cart items.',
} 

export default function RegisterPage(){
    return (
      <main className={styles.registerPageContainer}>
            <RegisterSection />
      </main>
    )
}
