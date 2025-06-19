import { FC } from "react"
import { redirect } from "next/navigation"
import SignInpage from "./signIn";

const Page: FC = async () => {

    const isAuthenticated = false;
    if (isAuthenticated) {
        redirect('/dashboard');
    }
    return (
        <SignInpage />
    )
}

export default Page;