import { Dispatch, SetStateAction } from "react";
import { RemoteUser } from "@/features/arena/types";
import { Input } from "@workspace/ui/components/input";
import { LuSendHorizontal } from "react-icons/lu";

interface UserChatProps {
    currentChatUser: RemoteUser;
    setCurrentChatUser: Dispatch<SetStateAction<RemoteUser | null>>;
    setOpenChatWindow: Dispatch<SetStateAction<boolean>>;
}

const UserChat: React.FC<UserChatProps> = ({ currentChatUser, setCurrentChatUser, setOpenChatWindow }: UserChatProps) => {
    return (
        <div className="flex flex-col justify-end gap-1 p-4 w-full h-full">
            <div className="flex flex-col justify-between items-start w-full p-1 rounded-lg border border-foreground">
                <Input
                    className="w-full p-2 text-sm leading-tight bg-transparent resize-none border-0 ring-0 focus-visible:ring-0 focus:outline-none focus:border-none"
                    placeholder="Enter Message"
                />

                <div className="flex justify-end w-full">
                        <LuSendHorizontal className="size-8 p-2 rounded-lg text-foreground bg-transparent hover:bg-foreground/20 cursor-pointer transition-colors duration-100" />
                </div>
            </div>
        </div>
    )
}

export default UserChat
