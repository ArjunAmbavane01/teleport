"use client"

import { Dispatch, SetStateAction, useRef, useState } from "react";
import { RemoteUser } from "@/features/arena/types";
import { Input } from "@workspace/ui/components/input";
import { LuSendHorizontal } from "react-icons/lu";

interface UserChatProps {
    currentChatUser: RemoteUser;
    setCurrentChatUser: Dispatch<SetStateAction<RemoteUser | null>>;
    setOpenChatWindow: Dispatch<SetStateAction<boolean>>;
    sendChatMessage: (message: string) => void;
    setIsUserTalking: (value: boolean) => void;
}

const UserChat: React.FC<UserChatProps> = ({ currentChatUser, setCurrentChatUser, setOpenChatWindow, sendChatMessage, setIsUserTalking }: UserChatProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [error, setError] = useState<{ value: boolean; message: string }>({ value: false, message: "" });

    const handleSubmit = () => {
        if (!inputRef.current) return;
        const message = inputRef.current.value.trim();
        if (!message) {
            inputRef.current.focus();
            return;
        }
        if (message.length > 250) {
            setError(err => { return { value: true, message: "characters more than 250" } });
        }

        const messageTosend = {
            
        }
        sendChatMessage(message);
    }

    return (
        <div className="flex flex-col justify-end gap-1 p-4 w-full h-full">
            <div className="flex flex-col justify-between items-start w-full p-1 rounded-lg border border-foreground">
                <Input
                    ref={inputRef}
                    onFocus={() => setIsUserTalking(true)}
                    onBlur={()=>setIsUserTalking(false)}
                    className="w-full p-2 text-sm leading-tight !bg-transparent resize-none border-0 ring-0 focus-visible:ring-0 focus:outline-none focus:border-none"
                    placeholder="Enter Message"
                />
                <div className="flex justify-between items-center w-full">
                    <span className="text-xs text-red-500 ml-2"> {error && error.message}</span>
                    <LuSendHorizontal onClick={handleSubmit} className="size-8 p-2 rounded-lg text-foreground bg-transparent hover:bg-foreground/20 cursor-pointer transition-colors duration-100" />
                </div>
            </div>
        </div>
    )
}

export default UserChat
