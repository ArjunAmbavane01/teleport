import { ReactNode } from 'react'
import { Button } from '@workspace/ui/components/button'

interface CloseModalBtnProps {
    text: ReactNode;
    onClick: () => void;
}

const CloseModalBtn: React.FC<CloseModalBtnProps> = ({ text, onClick }: CloseModalBtnProps) => {
    return <Button variant={'ghost'} onClick={onClick}>{text}</Button>
}

export default CloseModalBtn;
