import { redirect } from "next/navigation"
import SignInpage from "./signIn";
import { auth } from "@/app/api/auth/[...nextauth]/options";

const Page: React.FC = async () => {
    const session = await auth();
    if (session) redirect('/dashboard');
    return (<SignInpage />)
}

export default Page;