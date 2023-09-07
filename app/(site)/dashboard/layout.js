import DashNav from "@app/components/Dashboard/Dashboard-Navbar/DashNav"


export default function DashboardLayout({children}){
    return (
        <section className="DashboardPage">
            <DashNav />
            {children}
        </section>
    )
}