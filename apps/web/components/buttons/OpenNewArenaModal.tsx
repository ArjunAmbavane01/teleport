"use client"

import { useState } from 'react'
import { Button } from '@workspace/ui/components/button'
import CreateArenaModal from '@/app/dashboard/_components/CreateArenaModal'
import { PlusCircle } from 'lucide-react'


const OpenNewArenaModalBtn: React.FC = () => {
    const [isCreateArenaModalOpen, setIsCreateArenaModalOpen] = useState<boolean>(false);

    const openModal = () => setIsCreateArenaModalOpen(c => !c);
    return (
        <>
            <Button onClick={openModal}>New Arena <PlusCircle className="size-3" /></Button>
            {isCreateArenaModalOpen && <CreateArenaModal setIsCreateArenaModalOpen={setIsCreateArenaModalOpen} />}
        </>

    )
}

export default OpenNewArenaModalBtn
