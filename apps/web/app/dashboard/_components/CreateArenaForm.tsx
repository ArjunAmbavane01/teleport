import { FocusEvent, useState } from 'react';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { Form } from '@workspace/ui/components/form';
import { createArenaSchema, CreateArenaInput, ArenaRegionsEnum } from '@workspace/common/schemas/arena.schema';
import { Button } from '@workspace/ui/components/button';
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { CgSpinner } from 'react-icons/cg';
import axios from 'axios';
import { toast } from 'sonner';
import { CreateArenaFormField } from './CreateArenaFormField';

interface CreateArenaFormProps {
    session: Session | null;
}

const CreateArenaForm: React.FC<CreateArenaFormProps> = ({ session }: CreateArenaFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const router = useRouter();
    const form = useForm<CreateArenaInput>({
        resolver: zodResolver(createArenaSchema),
        defaultValues: {
            arenaName: "Untitled",
            arenaRegion: "office",
            adminId: session?.user?.id,
        }
    });

    const createNewArena = async (values: CreateArenaInput) => {
        setIsSubmitting(true);
        // setTimeout(() => setIsSubmitting(false), 4000);
        try {
            const response = await axios.post('/api/arena/createArena', {
                ...values
            });
            const { type, message, data } = response.data;
            if (type === "error") {
                toast.error(message, {
                    richColors: true
                })
            } else {
                toast.success(message, {
                    richColors: true
                })
                router.push(`/arena/${data.arenaId}`);
            }
        } catch (e) {
            toast.error('An unexpected error occurred', {
                richColors: true
            })
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <div className='flex flex-col gap-12 bg-gray-200 text-black rounded p-3'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(createNewArena)} className="flex flex-col gap-3">
                    <CreateArenaFormField
                        name='arenaName'
                        label='Arena Name'
                        placeholder='Enter Arena Name'
                        inputType='text'
                        onFocus={(e: FocusEvent<HTMLInputElement>) => {
                            e.target.select()
                        }}
                        formControl={form.control}
                    />
                    <CreateArenaFormField
                        name='arenaRegion'
                        label='Arena Region'
                        placeholder='Select Arena Region'
                        inputType='select'
                        selectItems={ArenaRegionsEnum.options}
                        formControl={form.control}
                    />
                    <Button type='submit' className="bg-white p-2 w-full">{
                        isSubmitting ? (
                            <>
                                Creating <CgSpinner className="animate-spin" />
                            </>
                        ) : (
                            <>
                                Create Arena
                            </>
                        )
                    }</Button>
                </form>

            </Form>
        </div>
    )
}



export default CreateArenaForm;
