


"use client";
import React, { useCallback } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {Dialog,DialogContent,DialogTrigger} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { CopyIcon, Layers2Icon, Loader2 } from "lucide-react";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import { createWorkflowSchema, createWorkflowSchemaType, duplicateWorkflowSchema, duplicateWorkflowSchemaType } from "@/schema/workflow";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateWorkflow } from "@/actions/workflows/createWorkflow";
import { toast } from "sonner";
import { DuplicateWorkflow } from "@/actions/workflows/duplicateWorkflow";
import { cn } from "@/lib/utils";

const DuplicateWorkflowDialog = ({workflowId}:{workflowId?:string}) => {
     const[open,setOpen]=useState(false);
     const[isPending, setIsPending]=useState(false);
     const router = useRouter();
     const form=useForm<duplicateWorkflowSchemaType>({
      resolver:zodResolver(duplicateWorkflowSchema),
      defaultValues:{

        workflowId
      },
     })

     const onSubmit = useCallback(async (values: duplicateWorkflowSchemaType) => {
      setIsPending(true);
      toast.loading("Duplicating workflow...", { id: "duplicate-workflow" });
      
      try {
        // Call server action directly with plain object
        const result = await DuplicateWorkflow({
             workflowId: values.workflowId, 
          name: values.name,
          description: values.description || undefined,
        });
        
        toast.success("Workflow Duplicated", { id: "duplicate-workflow" });
        setOpen(false);
    
      } catch (error) {
        console.error("Failed to duplicate workflow:", error);
        toast.error("Failed to create a workflow", {
          id: "create-workflow",
          description: error instanceof Error ? error.message : "Unknown error",
        });
      } finally {
        setIsPending(false);
      }
    }, [router]);

  return (
   <Dialog open={open} onOpenChange={(open)=>{
    form.reset();
    setOpen(open);
   }}>
    <DialogTrigger asChild>
      <Button variant={'ghost'} size={"icon"} className={cn("ml-2 transition-opacity duration-200 opacity-0 group-hover/card:opacity-100")}><CopyIcon className="w-4 h-4 text-muted-foreground cursor-pointer"/></Button>
    </DialogTrigger>
    <DialogContent className="px-0">
    <CustomDialogHeader
    icon={Layers2Icon}
    title="Duplicate workflow"
    
    />
    <div className="p-6">
     <Form {...form}>
      <form className="space-y-8 w-full" 
      onSubmit={form.handleSubmit(onSubmit)}
      >
       <FormField 
       control={form.control}
       name="name"
       render={({field})=>(
        <FormItem>
          <FormLabel className="flex gap-1 items-center">
            Name
            <p className="text-xs text-primary">(required)</p>
          </FormLabel>
          <FormControl>
            <Input {...field}/>
            </FormControl>
            <FormDescription>
              choose a descriptive and unique name
            </FormDescription>
          <FormMessage/>

        </FormItem>
       )}
       />

        <FormField 
       control={form.control}
       name="description"
       render={({field})=>(
        <FormItem>
          <FormLabel className="flex gap-1 items-center">
            Description
            <p className="text-xs text-muted-foreground">(optional)</p>
          </FormLabel>
          <FormControl>
            <Textarea  className="resize-none"{...field}/>
            </FormControl>
            <FormDescription>
              provide a brief description of what your workflow does
            </FormDescription>
          <FormMessage/>

        </FormItem>
       )}
       />
       <Button type="submit" className="w-full" disabled={isPending}>
        {!isPending && "Proceed"}
        {isPending && <Loader2 className="animate-spin"/>}
       </Button>
      </form>
     </Form>
    </div>
    </DialogContent>
   </Dialog>
  )
}

export default DuplicateWorkflowDialog