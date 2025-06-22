import GetTeleportedBtn from "@/components/buttons/GetTeleportedBtn";

const HeroSection: React.FC = () => {
    return (
        <section className='flex items-center justify-center w-screen h-[100vh] bg-black'>
            <div className='flex flex-col items-center gap-5 mx-auto w-full max-w-8xl'>
                <div className='text-5xl text-blue-300'>
                    Teleport
                </div>
                <GetTeleportedBtn />
            </div>
        </section>
    )
}

export default HeroSection;
