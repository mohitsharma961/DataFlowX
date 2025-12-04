// // "use client";
// // import { RunWorkflow } from '@/actions/workflows/runWorkflow';
// // import useExecutionPlan from '@/components/hooks/useExecutionPlan';
// // import { Button } from '@/components/ui/button';
// // import { useMutation } from '@tanstack/react-query';
// // import { useReactFlow } from '@xyflow/react';
// // import { PlayIcon } from 'lucide-react';
// // import React from 'react'
// // import { toast } from 'sonner';

// // const ExecuteBtn = ({workflowId}:{workflowId:string}) => {

   
// //   const generate=useExecutionPlan();
// //   const {toObject}=useReactFlow();

// //   const mutation=useMutation({
// //     mutationFn:RunWorkflow,
// //     onSuccess:()=>{
// //       toast.success("Execution started",{id:"flow-execution"});
      
// //     },
// //     onError:()=>{

// //       toast.error("Execution failed",{id:"flow-execution"});
// //     }

// //   })



// //   return (
// //     <Button variant={"outline"} className="flex items-center gap-2" disabled={mutation.isPending}
    
// //     onClick={()=>{

// //       const plan=generate();
// //      if(!plan){
// //       return ;
// //      }
// //      mutation.mutate({
// //       workflowId:workflowId,
// //       flowDefinition:JSON.stringify(toObject())
// //      })

// //     }}><PlayIcon size={16} className='stroke-orange-400' />
      
  
// //        Execute
// //     </Button>
// //   )
// // }

// // export default ExecuteBtn


// "use client";
// import { RunWorkflow } from '@/actions/workflows/runWorkflow';
// import useExecutionPlan from '@/components/hooks/useExecutionPlan';
// import { Button } from '@/components/ui/button';
// import { useReactFlow } from '@xyflow/react';
// import { PlayIcon, UploadIcon } from 'lucide-react';
// import React, { useState } from 'react';
// import { toast } from 'sonner';

// const PublishBtn = ({ workflowId }: { workflowId: string }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const generate = useExecutionPlan();
//   const { toObject } = useReactFlow();

//   const handleExecute = async () => {
//     const plan = generate();
//     if (!plan) {
//       toast.error("Failed to generate execution plan");
//       return;
//     }

//     setIsLoading(true);
//     toast.loading("Starting execution...", { id: "flow-execution" });

//     try {
//       await RunWorkflow({
//         workflowId: workflowId,
//         flowDefinition: JSON.stringify(toObject()),
//       });

//       toast.success("Execution started", { id: "flow-execution" });
//     } catch (error) {
//       console.error('Execution error:', error);
//       toast.error(
//         `Execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
//         { id: "flow-execution" }
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Button
//       variant="outline"
//       className="flex items-center gap-2"
//       disabled={isLoading}
//       onClick={handleExecute}
//     >
//       <UploadIcon size={16} className="stroke-green-400" />
//       Publish
//     </Button>
//   );
// };

// export default PublishBtn;


"use client";

import { PublishWorkflow } from '@/actions/workflows/PublishWorkflow';
import useExecutionPlan from '@/components/hooks/useExecutionPlan';
import { Button } from '@/components/ui/button';
import { useReactFlow } from '@xyflow/react';
import { UploadIcon } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

const PublishBtn = ({ workflowId }: { workflowId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();

  const handlePublish = async () => {
    const plan = generate();
    if (!plan) {
      toast.error("Failed to generate execution plan");
      return;
    }

    setIsLoading(true);
    toast.loading("Publishing workflow...", { id: "flow-publish" });

    try {
      await PublishWorkflow({
        id: workflowId,
        flowDefinition: JSON.stringify(toObject()),
      });
      toast.success("Workflow published successfully", { id: "flow-publish" });
    } catch (error) {
      console.error('Publish error:', error);
      toast.error(
        `Publishing failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { id: "flow-publish" }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      disabled={isLoading}
      onClick={handlePublish}
    >
      <UploadIcon size={16} className="stroke-green-400" />
      Publish
    </Button>
  );
};

export default PublishBtn;
