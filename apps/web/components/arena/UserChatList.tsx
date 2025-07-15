import { Dispatch, SetStateAction } from 'react'
import { RemoteUser } from '@/features/arena/types';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { IoClose } from 'react-icons/io5';

interface UserChatListProps {
    remoteUsers: RemoteUser[];
    setCurrentChatUser: Dispatch<SetStateAction<RemoteUser | null>>;
    setOpenChatWindow: Dispatch<SetStateAction<boolean>>;
}

const UserChatList: React.FC<UserChatListProps> = ({ remoteUsers, setCurrentChatUser, setOpenChatWindow }: UserChatListProps) => {
    return (
        <div className='flex flex-col justify-start items-start gap-5 px-4 w-full h-full'>
                {remoteUsers.map(user => {
                    return <div key={user.userId}
                        onClick={() => setCurrentChatUser(user)}
                        className='flex items-center gap-5 w-full h-fit p-2 rounded hover:bg-foreground/20 cursor-pointer'>
                        <div className="flex justify-start items-start gap-3 w-full mx-auto text-center text-sm text-foreground">
                            <Avatar className="size-8 rounded-full border border-foreground">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>{user.name.split(" ").map((w) => w.slice(0, 1)).join("")}</AvatarFallback>
                            </Avatar>
                            {user.name ?? "undefined"}
                        </div>
                    </div>
                })}
        </div>
    )
}

export default UserChatList
