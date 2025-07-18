import { Dispatch, SetStateAction } from 'react'
import { motion } from "motion/react";
import UserChatList from './UserChatList';
import { RemoteUser } from '@/features/arena/types';
import UserChat from './UserChat';
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { IoClose } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";



interface ChatWindowProps {
    remoteUsers: RemoteUser[];
    currentChatUser: RemoteUser | null;
    setCurrentChatUser: Dispatch<SetStateAction<RemoteUser | null>>;
    setOpenChatWindow: Dispatch<SetStateAction<boolean>>;
    sendChatMessage: (message: string) => void;
    setIsUserTalking: (value: boolean) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ remoteUsers, currentChatUser, setCurrentChatUser, setOpenChatWindow, sendChatMessage,setIsUserTalking }: ChatWindowProps) => {
    return (
        <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col justify-start items-center gap-5 absolute inset-y-0 right-6 w-72 h-[70%] my-auto bg-background/95 rounded-lg border border-foreground">
            <div className='flex items-center justify-between gap-3 w-full p-3 border-b border-foreground text-foreground'>
                {!currentChatUser ?
                    (<span>Chat</span>) :
                    <div className='flex flex-1 justify-start items-center gap-3'>
                        <IoIosArrowBack
                            onClick={() => setCurrentChatUser(null)}
                            className="size-7 p-1 rounded-lg hover:bg-foreground/20 cursor-pointer"
                        />
                        <div className="flex items-center gap-3 text-base text-foreground">
                            <Avatar className="size-6 rounded-full border border-foreground">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>{currentChatUser!.name.split(" ").map((w) => w.slice(0, 1)).join("")}</AvatarFallback>
                            </Avatar>
                            {currentChatUser!.name}
                        </div>
                    </div>
                }
                <IoClose
                    onClick={() => {
                        setOpenChatWindow(false);
                        setCurrentChatUser(null);
                    }}
                    className="size-7 p-1 rounded-full hover:bg-foreground/20 cursor-pointer"
                />
            </div>

            {currentChatUser ?
                <UserChat currentChatUser={currentChatUser} setCurrentChatUser={setCurrentChatUser} setOpenChatWindow={setOpenChatWindow} sendChatMessage={sendChatMessage} setIsUserTalking={setIsUserTalking} /> : <UserChatList remoteUsers={remoteUsers} setCurrentChatUser={setCurrentChatUser} setOpenChatWindow={setOpenChatWindow} />
            }

        </motion.div>
    )
}

export default ChatWindow
