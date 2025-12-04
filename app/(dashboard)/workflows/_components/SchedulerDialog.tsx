// "use client";
// import React, { useEffect, useState } from 'react'
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger
// } from "@/components/ui/dialog"
// import { CalendarIcon, TriangleAlertIcon } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { cn } from '@/lib/utils';
// import CustomDialogHeader from '@/components/CustomDialogHeader';
// import { Input } from '@/components/ui/input';
// import { useMutation } from '@tanstack/react-query';
// import { UpdateWorkflowCron } from '@/actions/workflows/updateWorkflowCron';
// import { toast } from 'sonner';
// import cronstrue from 'cronstrue'

// function SchedulerDialog(props:{workflowId:string,cron:string|null}) {
//   const [cron,setCron]=useState(props.cron||"");
//   const [validCron,setValidCron]=useState(false);
//   const [readableCron,SetReadableCron]=useState("");
//   const mutation=useMutation({
  
//   mutationFn:UpdateWorkflowCron,
//   onSuccess:()=>{
//     toast.success("Schedule updated successfully",{id:"cron"})
//   },
//    onError:()=>{
//     toast.error("something went wrong",{id:"cron"})
//   }
  

  
//   });

//   useEffect(()=>{

//     try {

//       const humanCronStr=cronstrue.toString(cron);
//       setValidCron(true);
//       SetReadableCron(humanCronStr);
      
//     } catch (error) {
//       setValidCron(false);
      
//     }
//   },[cron])



//   return <Dialog>
//     <DialogTrigger asChild>
//       <Button variant={"link"} size={"sm"} className={cn("text-sm p-0 h-auto")}>
//         <div className='flex items-center gap-1'>
//         <TriangleAlertIcon className='h-3 w-3  '/>
//         setSchedule
//         </div>
//       </Button>

//     </DialogTrigger>
//     <DialogContent className='px-0'>
//       <CustomDialogHeader title="Schedule workflow execution"icon={CalendarIcon}/>
//       <div className='p-6 space-y-4'>
//         <p>Specify a cron expression to schedule periodic workflow execution,
//           All times are in UTC
//         </p>
//          <Input placeholder='E.g.*  * * *' value={cron} onChange={(e)=>setCron(e.target.value)}/>
            
//         <div className={cn("bg-accent rounded-md p-4 border text-sm border-destructive text-destructive",

//           validCron && "border-primary text-primary "
//         )}>

//           {validCron ? readableCron:"Not a valid cron expression"}
//         </div>
//       </div>

//       <DialogFooter className='px-6 gap-2'>
//         <DialogClose asChild>
//           <Button className='w-full' variant={"secondary"}>
//             Cancel
//           </Button>
//         </DialogClose>
//         <DialogClose>

//           <Button className='w-full'
//           disabled={mutation.isPending}
          
//           onClick={()=>{

//             toast.loading("Saving....",{id:"cron"});
//             mutation.mutate({
//               id:props.workflowId,
//               cron
//             })
//           }}
                 
//           >
//             save
//           </Button>
//         </DialogClose>

//       </DialogFooter>
//     </DialogContent>
//   </Dialog>
   
// }

// export default SchedulerDialog




"use client";
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { CalendarIcon, ClockIcon, TriangleAlertIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CustomDialogHeader from '@/components/CustomDialogHeader';
import { Input } from '@/components/ui/input';
import { UpdateWorkflowCron } from '@/actions/workflows/updateWorkflowCron';
import { toast } from 'sonner';
import cronstrue from 'cronstrue'
import parser from "cron-parser";
import { RemoveWorkflowSchedule } from '@/actions/workflows/removeWorkflowSchedule';
import { Separator } from '@/components/ui/separator';

function SchedulerDialog(props:{workflowId:string,cron:string|null}) {
  const [cron,setCron]=useState(props.cron||"");
  const [validCron,setValidCron]=useState(false);
  const [readableCron,SetReadableCron]=useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    try {
      parser.parseExpression(cron)
      const humanCronStr=cronstrue.toString(cron);
      setValidCron(true);
      SetReadableCron(humanCronStr);
    } catch (error) {
      setValidCron(false);
    }
  },[cron])

  

  const handleSave = async () => {
    setIsLoading(true);
    toast.loading("Saving....",{id:"cron"});
    
    try {
      await UpdateWorkflowCron({
        id: props.workflowId,
        cron
      });
      toast.success("Schedule updated successfully",{id:"cron"});
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong",{id:"cron"});
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveSchedule = async () => {
    setIsRemoving(true);
    toast.loading("Removing Schedule...",{id:"cron"});
    
    try {
      await RemoveWorkflowSchedule(props.workflowId);
      toast.success("Schedule removed successfully",{id:"cron"});
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong",{id:"cron"});
    } finally {
      setIsRemoving(false);
    }
  };


  const workflowHasValidCron=props.cron && props.cron.length>0;
  const readableSavedCron=workflowHasValidCron && cronstrue.toString(props.cron!);

  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>

      <Button variant={"link"} size={"sm"} className={cn("text-sm p-0 h-auto text-orange-500",workflowHasValidCron && "text-primary")}>

        {workflowHasValidCron && (<div className='flex items-center gap-2'>
          <ClockIcon/>
          {readableSavedCron}
          </div>)}

          {!workflowHasValidCron &&(

            <div className='flex items-center gap-1'>
          <TriangleAlertIcon className='h-3 w-3'/>
          setSchedule
        </div>
          )
          
          }


        
      </Button>
    </DialogTrigger>
    <DialogContent className='px-0'>
      <CustomDialogHeader title="Schedule workflow execution" icon={CalendarIcon}/>
      <div className='p-6 space-y-4'>
        <p>Specify a cron expression to schedule periodic workflow execution,
          All times are in UTC
        </p>
        <Input placeholder='E.g. * * * * *' value={cron} onChange={(e)=>setCron(e.target.value)}/>
            
        <div className={cn("bg-accent rounded-md p-4 border text-sm border-destructive text-destructive",
          validCron && "border-primary text-primary "
        )}>
          {validCron ? readableCron : "Not a valid cron expression"}
        </div>

        {workflowHasValidCron && <DialogClose asChild>
          <div>
              <Button 
                className='w-full text-destructive border-destructive hover:text-destructive' 
                variant={"outline"} 
                disabled={isLoading || isRemoving} 
                onClick={handleRemoveSchedule}
              >
                Remove current Schedule
              </Button>

              <Separator className='my-4'/>
          </div>
          </DialogClose>}
      </div>

      <DialogFooter className='px-6 gap-2'>
        <DialogClose asChild>
          <Button className='w-full' variant={"secondary"}>
            Cancel
          </Button>
        </DialogClose>
        <Button 
          className='w-full'
          disabled={isLoading || !validCron || isRemoving}
          onClick={handleSave}
        >
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
}

export default SchedulerDialog