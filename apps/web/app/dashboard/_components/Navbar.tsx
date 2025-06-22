import { Session } from "next-auth";
import SignOutButton from "@/components/buttons/SignOutBtn";

interface NavbarProps {
    session:Session | null;
}

const Navbar: React.FC<NavbarProps> = ({session}:NavbarProps) => {
    return (
        <section className='flex items-center justify-between p-3 mx-auto h-12 w-full max-w-8xl bg-blue-100/10'>
            <div>
                Teleport
            </div>
            <div className='flex items-center gap-5 text-md'>
                Hello, {session ? session.user?.name : "User"}
                <SignOutButton />
            </div>
        </section>
    )
}

export default Navbar;