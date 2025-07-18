import { getUserOrRedirect } from "@/lib/auth/getUserOrRedirect";
import Header from "./_components/Header";
import Dashboard from "./_components/Dashboard";

const Page: React.FC = async () => {
    const user = await getUserOrRedirect();
    return (
        <section className="flex flex-col w-full h-screen overflow-hidden relative">
            <Header user={user} />
            <Dashboard user={user} />
        </section>
    )
}

export default Page;
