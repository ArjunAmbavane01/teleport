import { User } from "next-auth";
import SignOutButton from "@/components/buttons/SignOutBtn";

interface HeaderProps {
    user: User;
}

const Header: React.FC<HeaderProps> = ({ user }: HeaderProps) => {
    return (
        <section className='flex items-center justify-between p-3 mx-auto h-12 w-full max-w-8xl bg-blue-100/10'>
            <div>
                Teleport
            </div>
            <div className='flex items-center gap-5 text-md'>
                Hello, {user.name}
                <SignOutButton />
            </div>
        </section>
    )
}

export default Header;