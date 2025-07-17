"use client"

import { Dispatch, SetStateAction } from "react";
import { RemoteUser } from "@/features/arena/types";
import { Button } from "@workspace/ui/components/button";

interface BottomMenuProps {
  setOpenChatWindow: Dispatch<SetStateAction<boolean>>;
  setCurrentChatUser: Dispatch<SetStateAction<RemoteUser | null>>;
}

const BottomMenu: React.FC<BottomMenuProps> = ({ setOpenChatWindow, setCurrentChatUser }: BottomMenuProps) => {
  return (
    <div className='flex items-center justify-around gap-3 fixed bottom-6 mx-auto inset-x-0 w-lg h-12 rounded-lg bg-blue-800 z-50'>
      <Button
        onClick={() => {
          setOpenChatWindow(c => !c);
          setCurrentChatUser(null);
        }}
        className="px-4 py-2 cursor-pointer">Chat</Button>
    </div>
  )
}

export default BottomMenu;
