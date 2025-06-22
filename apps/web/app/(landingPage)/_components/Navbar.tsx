import SignInButton from "@/components/buttons/SignInBtn";
import { Github } from "lucide-react";

const Navbar: React.FC = () => {
    return (
        <section className='fixed top-0 inset-x-0 flex items-center justify-center w-screen bg-blue-100/10'>
            <div className='flex justify-between items-center p-3 mx-auto w-full max-w-8xl'>
                <div>
                    Teleport
                </div>
                <div className='flex items-center gap-5'>
                    <div className="flex items-center gap-1">Github <Github className="size-3" /> </div>
                    <SignInButton />
                </div>
            </div>
        </section>
    )
}

export default Navbar;
