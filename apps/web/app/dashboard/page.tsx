import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { redirect } from "next/navigation";
import Navbar from "./_components/Navbar";
import Dashboard from "./_components/Dashboard";
import { auth } from "@/app/api/auth/[...nextauth]/options";

const Page: React.FC = async () => {
    const isAuthenticated = await checkIsAuthenticated();
    if (!isAuthenticated) redirect('/auth/sign-in');

    const session = await auth();
    return (
        <section className="flex flex-col w-full h-screen overflow-hidden relative">
            <Navbar session={session} />
            <Dashboard session={session}/>
        </section>
    )
}

export default Page;
