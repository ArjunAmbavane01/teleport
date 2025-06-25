import { Button } from '@workspace/ui/components/button'
import { ReactNode } from 'react'

interface CloseModalBtnProps {
    text: ReactNode;
    onClick: () => void;
}

const CloseModalBtn: React.FC<CloseModalBtnProps> = ({ text, onClick }: CloseModalBtnProps) => {
    return (<Button variant={'ghost'} onClick={onClick}>{text}</Button>)
}

export default CloseModalBtn
