// "use client";
// import { RunWorkflow } from '@/actions/workflows/runWorkflow';
// import { Button } from '@/components/ui/button';
// import { useMutation } from '@tanstack/react-query';
// import { PlayIcon } from 'lucide-react';
// import React from 'react'
// import { toast } from 'sonner';

// function RunBtn({workflowId}:{workflowId:string}) {
//     const mutation=useMutation({
//         mutationFn:RunWorkflow,
//         onSuccess:()=>{
//             toast.success("workflow started",{id:workflowId});
//         },
//         onError:()=>{
//             toast.error("something went wrong",{id:workflowId});
//         }

//     })
//   return <Button variant={'outline'} size={"sm"} className='flex items-center gap-2 disabled' disabled={mutation.isPending} onClick={()=>{
//     toast.loading("Scheduling run...",{id:workflowId});
//     mutation.mutate({
//         workflowId
//     })

//   }}>
//      <PlayIcon size={16} />
//     Run
//   </Button>
// }

// export default RunBtn




"use client";
import { RunWorkflow } from '@/actions/workflows/runWorkflow';
import { Button } from '@/components/ui/button';
import { PlayIcon } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

function RunBtn({workflowId}:{workflowId:string}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRun = async () => {
    setIsLoading(true);
    toast.loading("Scheduling run...", {id: workflowId});
    
    try {
      await RunWorkflow({ workflowId });
      toast.success("Workflow started", {id: workflowId});
    } catch (error) {
      toast.error("Something went wrong", {id: workflowId});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="flex items-center gap-2"
      disabled={isLoading}
      onClick={handleRun}
    >
      <PlayIcon size={16} />
      Run
    </Button>
  );
}

export default RunBtn;











