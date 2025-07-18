import { redirect } from "next/navigation"
import { auth } from "@/app/api/auth/[...nextauth]/options";
import SignInPage from "./signIn";

const Page: React.FC = async () => {
    const session = await auth();
    if (session) redirect('/dashboard');
    return <SignInPage />
}

export default Page;