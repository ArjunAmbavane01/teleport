import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import CloseModalBtn from '@/components/buttons/CloseModal';
import CreateArenaForm from './CreateArenaForm';
import { IoIosCloseCircleOutline } from 'react-icons/io';

interface CreateArenaModalProps {
    setIsCreateArenaModalOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateArenaModal: React.FC<CreateArenaModalProps> = ({ setIsCreateArenaModalOpen }: CreateArenaModalProps) => {
    return (
        <>
            <div className='absolute inset-0 bg-black opacity-80' />
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col h-[600px] w-[800px] rounded-lg bg-gray-100 '>
                <div className='fixed top-2 right-2 text-black'>
                    <CloseModalBtn text={<IoIosCloseCircleOutline />} onClick={() => setIsCreateArenaModalOpen(c => !c)} />
                </div>
                <div className='grid grid-cols-2 size-full rounded-lg'>
                    <div className="relative size-full">
                        <div className='absolute inset-0 bg-black/20 z-10' />
                        <Image
                            src="/images/appDemo.png"
                            alt="app demo"
                            layout="fill"
                            quality={100}
                            className="rounded-lg"
                        />
                    </div>
                    <div className='p-5 py-16'>
                        <CreateArenaForm />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateArenaModal;
