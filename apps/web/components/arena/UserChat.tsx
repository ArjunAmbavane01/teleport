"use client"

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ChatMessagesMap, RemoteUser } from "@/features/arena/types";
import { Input } from "@workspace/ui/components/input";
import { LuSendHorizontal } from "react-icons/lu";
import { ChatMessage } from "@workspace/common/types";

interface UserChatProps {
    localUserID: string;
    currentChatUser: RemoteUser;
    chatMessages: ChatMessagesMap;
    setCurrentChatUser: Dispatch<SetStateAction<RemoteUser | null>>;
    sendChatMessage: (message: string) => void;
    setIsUserTalking: (value: boolean) => void;
}

const UserChat: React.FC<UserChatProps> = ({ localUserID, currentChatUser, chatMessages, sendChatMessage, setIsUserTalking}: UserChatProps) => {

    const [error, setError] = useState<{ value: boolean; message: string }>({ value: false, message: "" });
    const inputRef = useRef<HTMLInputElement | null>(null);
    const endRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

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
        sendChatMessage(message);
        inputRef.current.value = "";
    }

    return (
        <div className="flex flex-col justify-end gap-3 pb-3 px-2 w-full h-full">
            <div className="flex flex-col gap-2 overflow-y-auto size-full">
                {(chatMessages[currentChatUser.userId] ?? []).map((message) => {
                    const isSentByMe = message.senderId === localUserID;
                    return <div key={message.id} className={`flex w-full text-sm ${isSentByMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] py-1 px-2 rounded ${isSentByMe ?
                            'bg-blue-500 text-white rounded-br-none'
                            : 'bg-gray-200 text-black rounded-bl-none'}`}>
                            {message.content}
                        </div>
                    </div>
                })}
            </div>
            <div className="flex flex-col justify-between items-start w-full p-1 rounded-lg border border-foreground">
                <Input
                    ref={inputRef}
                    onFocus={() => setIsUserTalking(true)}
                    onBlur={() => setIsUserTalking(false)}
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
