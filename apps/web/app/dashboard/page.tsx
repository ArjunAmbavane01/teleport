import { requireAuth } from "@/lib/auth/requireAuth";
import Navbar from "./_components/Header";
import Dashboard from "./_components/Dashboard";

const Page: React.FC = async () => {
    const user = await requireAuth();
    return (
        <section className="flex flex-col w-full h-screen overflow-hidden relative">
            <Navbar user={user}/>
            <Dashboard />
        </section>
    )
}

export default Page;
