


"use client";
import React, { useCallback } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {Dialog,DialogContent,DialogTrigger} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Layers2Icon, Loader2 } from "lucide-react";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflow";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateWorkflow } from "@/actions/workflows/createWorkflow";
import { toast } from "sonner";

const CreateWorkflowDialog = ({triggerText}:{triggerText?:string}) => {
     const[open,setOpen]=useState(false);
     const[isPending, setIsPending]=useState(false);
     const router = useRouter();
     const form=useForm<createWorkflowSchemaType>({
      resolver:zodResolver(createWorkflowSchema),
      defaultValues:{},
     })

     const onSubmit = useCallback(async (values: createWorkflowSchemaType) => {
      setIsPending(true);
      toast.loading("Creating workflow...", { id: "create-workflow" });
      
      try {
        // Call server action directly with plain object
        const result = await CreateWorkflow({
          name: values.name,
          description: values.description || undefined,
        });
        
        toast.success("Workflow created successfully", { id: "create-workflow" });
        setOpen(false);
        router.push(`/workflow/editor/${result.id}`); // Navigate to editor if needed
      } catch (error) {
        console.error("Failed to create workflow:", error);
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
      <Button>{triggerText??"Create workflow"}</Button>
    </DialogTrigger>
    <DialogContent className="px-0">
    <CustomDialogHeader
    icon={Layers2Icon}
    title="create workflow"
    subTitle="start building your workflow"
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

export default CreateWorkflowDialog