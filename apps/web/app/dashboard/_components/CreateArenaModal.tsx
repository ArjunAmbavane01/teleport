import CloseModalBtn from '@/components/buttons/CloseModalBtn';
import { Session } from 'next-auth';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import ArenaForm from './CreateArenaForm';

interface CreateArenaModalProps {
    session: Session | null;
    setIsCreateArenaModalOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateArenaModal: React.FC<CreateArenaModalProps> = ({ session, setIsCreateArenaModalOpen }: CreateArenaModalProps) => {
    return (
        <>
            <div className='absolute inset-0 bg-black opacity-80' />
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col h-[600px] w-[800px] rounded bg-gray-100 '>
                <div className='fixed top-2 right-2 text-black'>
                    <CloseModalBtn text={<IoIosCloseCircleOutline />} onClick={() => setIsCreateArenaModalOpen(c => !c)} />
                </div>
                <div className='grid grid-cols-2 size-full rounded'>
                    <div className="relative size-full">
                        <div className='absolute inset-0 bg-black/20 z-10' />
                        <Image
                            src="/images/appDemo.png"
                            alt="app demo"
                            layout="fill"
                            quality={100}
                            className=""
                        />
                    </div>
                    <div className='p-5 py-16'>
                        <ArenaForm session={session}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateArenaModal;
