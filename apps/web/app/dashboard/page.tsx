import SignOutButton from "@/components/SignOutButton";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { redirect } from "next/navigation";

const Page: React.FC = async () => {
    const isAuthenticated = await checkIsAuthenticated();
    if (!isAuthenticated) {
        redirect('/auth/sign-in');
    } else {
        return (
            <div className="flex flex-col items-center gap-5 p-10">
                Dashboard
                <SignOutButton />
            </div>
        )
    }
}

export default Page;
