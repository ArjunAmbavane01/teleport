import { FocusEventHandler, } from 'react';
import { Input } from '@workspace/ui/components/input';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/form';
import { CreateArenaInput } from '@workspace/common/schemas/arena.schema';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { Control, FieldPath } from "react-hook-form";

interface CreateArenaFormFieldProps {
    name: FieldPath<CreateArenaInput>,
    label: string,
    placeholder: string,
    description?: string,
    inputType?: string,
    selectItems?: string[],
    onFocus?: FocusEventHandler<HTMLInputElement>
    formControl: Control<CreateArenaInput>,
}

export const CreateArenaFormField: React.FC<CreateArenaFormFieldProps> = ({ name, label, placeholder, description, inputType, selectItems, onFocus, formControl }: CreateArenaFormFieldProps) => {
    return <FormField control={formControl} name={name} render={({ field }) => (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                {inputType === 'select' ?
                    (
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={placeholder} defaultValue={'office'} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>{label}</SelectLabel>
                                    {selectItems && selectItems.map((item) => (
                                        <SelectItem key={item} value={item}>{item.slice(0, 1).toLocaleUpperCase() + item.slice(1)}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )
                    :
                    (
                        <Input onFocus={onFocus} placeholder={placeholder} type={inputType || 'text'} {...field} />
                    )
                }
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
        </FormItem>
    )} />
}