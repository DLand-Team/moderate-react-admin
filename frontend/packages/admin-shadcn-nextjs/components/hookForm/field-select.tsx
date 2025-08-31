"use client";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IconX } from "@tabler/icons-react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
export interface Option {
    title: string;
    value: string;
}
export function FieldSelect({
    form,
    name,
    placeholder,
    options,
    label,
    clear = false,
}: {
    form: UseFormReturn<any>;
    name: string;
    placeholder?: string;
    options: Option[];
    label: string | React.FC<any>;
    clear?: boolean;
}) {
    const LableComp = typeof label != "string" ? label : () => label;
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        <LableComp />
                    </FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                        <div
                            style={{
                                position: "relative",
                            }}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder={placeholder} />
                                    <div
                                        style={{
                                            width: "25px",
                                        }}></div>
                                </SelectTrigger>
                            </FormControl>
                            {clear && (
                                <IconX
                                    color={"var(--muted-foreground)"}
                                    size={16}
                                    style={{
                                        position: "absolute",
                                        right: "30px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        pointerEvents: "painted",
                                    }}
                                    onClick={(e) => {
                                        form.setValue(name, "");
                                        e.stopPropagation();
                                        e.preventDefault();
                                    }}
                                />
                            )}
                        </div>

                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}>
                                    {option.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
