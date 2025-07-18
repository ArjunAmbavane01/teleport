"use client"

import { FocusEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Form } from '@workspace/ui/components/form';
import { CreateArenaInput } from '@workspace/common/types/arena.types';
import { Button } from '@workspace/ui/components/button';
import { ArenaRegionsEnum, createArenaSchema } from '@workspace/common/schemas/arena.schema';
import { zodResolver } from '@hookform/resolvers/zod'
import { createNewArena } from '@/actions/arenaActions';
import { toast } from 'sonner';
import { CreateArenaFormField } from './CreateArenaFormField';
import { CgSpinner } from 'react-icons/cg';

const CreateArenaForm: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const router = useRouter();
    const form = useForm<CreateArenaInput>({
        resolver: zodResolver(createArenaSchema),
        defaultValues: {
            arenaName: "Untitled",
            arenaRegion: "office",
        }
    });

    const submitForm = async (values: CreateArenaInput) => {
        setIsSubmitting(true);
        try {
            const res = await createNewArena(values);
            if (res.type === "error") {
                console.error(res.error);
                toast.error(res.message, {
                    richColors: true
                })
            } else {
                const { arenaSlug } = res.data as { arenaSlug: string };
                toast.success(res.message, {
                    richColors: true
                })
                router.push(`/arena/${arenaSlug}`);
            }
        } catch (e) {
            toast.error('An unexpected error occurred', {
                richColors: true
            })
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='flex flex-col gap-12 bg-gray-200 text-black rounded p-3'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitForm)} className="flex flex-col gap-3">
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
