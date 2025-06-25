"use client"

import CreateArenaModal from '@/app/dashboard/_components/CreateArenaModal'
import { Button } from '@workspace/ui/components/button'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'


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
