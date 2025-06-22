import { redirect } from "next/navigation"
import SignInpage from "./signIn";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";

const Page: React.FC = async () => {

    const isAuthenticated = await checkIsAuthenticated();;
    if (isAuthenticated) redirect('/dashboard'); 
       
    return (
        <SignInpage />
    )
}

export default Page;