"use client"

import { Button } from '@workspace/ui/components/button'
import { PlusCircle } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

interface OpenNewArenaModalBtnProps {
    setIsCreateArenaModalOpen: Dispatch<SetStateAction<boolean>>
}

const OpenNewArenaModalBtn: React.FC<OpenNewArenaModalBtnProps> = ({ setIsCreateArenaModalOpen }: OpenNewArenaModalBtnProps) => {

    const openModal = () => {
        setIsCreateArenaModalOpen(c => !c);
    }
    return (
        <Button onClick={openModal}>New Arena <PlusCircle className="size-3" /></Button>
    )
}

export default OpenNewArenaModalBtn
