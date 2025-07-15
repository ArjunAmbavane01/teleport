import { Dispatch, SetStateAction } from 'react'
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { RemoteUser } from '@/features/arena/types';

interface ProximityUserCardProps {
    user: RemoteUser;
    setCurrentChatUser: Dispatch<SetStateAction<RemoteUser | null>>;
    setOpenChatWindow: Dispatch<SetStateAction<boolean>>;
}

const ProximityUserCard: React.FC<ProximityUserCardProps> = ({ user, setCurrentChatUser, setOpenChatWindow }: ProximityUserCardProps) => {
    return (
        <motion.div key={user.userId}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
            className="grid grid-rows-3 p-4 gap-5 bg-background/60 w-52 h-24 border border-foreground/50 opacity-10 rounded group relative hover:opacity-100 hover:bg-background/90 transition-colors duration-200">
            <div className="row-span-1 flex justify-start items-center gap-2 w-full mx-auto text-center text-sm text-foreground bg-blue0">
                <Avatar className="size-6 rounded-full border border-foreground">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>{user.name.split(" ").map((w) => w.slice(0, 1)).join("")}</AvatarFallback>
                </Avatar>
                {user.name ?? "undefined"}
            </div>
            <div className="row-span-2 flex justify-between items-end gap-3 ">
                <div onClick={() => {
                    setCurrentChatUser(user);
                    setOpenChatWindow(true);
                }}
                    className="w-full px-3 py-1 text-center text-sm bg-foreground/60 rounded border border-black text-black cursor-pointer group-hover:bg-foreground">Chat</div>
                <div className="w-full px-3 py-1 text-center text-sm bg-foreground/60 rounded border border-black text-black cursor-pointer group-hover:bg-foreground">Call</div>
            </div>
            <div className="absolute inset-0 bg-background/20 rounded pointer-events-none group-hover:opacity-0" />
        </motion.div>
    )
}

export default ProximityUserCard
