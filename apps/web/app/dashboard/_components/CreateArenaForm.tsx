import CreateNewArenaBtn from '@/components/buttons/CreateNewArenaBtn'
import { Input } from '@workspace/ui/components/input';
import { createArenaSchema } from '@workspace/common/schemas/arena.schema';
import { zodResolver } from '@hookform/resolvers/zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { Session } from 'next-auth';
import { z } from 'zod';
import { useForm } from "react-hook-form";

interface CreateArenaFormProps {
    session: Session | null;
}

const CreateArenaForm: React.FC<CreateArenaFormProps> = ({ session }: CreateArenaFormProps) => {
    const form = useForm<z.infer<typeof createArenaSchema>>({
        resolver: zodResolver(createArenaSchema),
        defaultValues: {
            adminId: "",
            name: "Untitled",
            region: "office",
        }
    });
    return (
        <div className='flex flex-col gap-12 bg-gray-200 text-black rounded'>
            <div className='flex flex-col gap-8'>
                <div className='flex flex-col gap-5'>
                    Arena Name
                    <Input placeholder='Enter Arena Name' />
                </div>
                <div className='flex flex-col gap-5'>
                    Choose Region
                    <Select >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Region" />
                        </SelectTrigger>
                        <SelectContent className="w-[180px]">
                            <SelectItem value="office">Office</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <CreateNewArenaBtn session={session} />
        </div>
    )
}

export default CreateArenaForm;
