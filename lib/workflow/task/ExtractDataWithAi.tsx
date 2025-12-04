import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import {   BrainIcon, LucideProps, MousePointerClick, TextIcon } from "lucide-react";



export const ExtractDataWithAiTask = {
  type: TaskType.EXTRACT_DATA_WITH_AI,
  label: "Extract data with Ai",
  icon: (props) => (
    <BrainIcon className="stroke-rose-400" {...props}/>
  ),
  isEntryPoint: false,
  credits:4,
  inputs: [
    {
      name: "Content",  // Changed to lowercase
      type: TaskParamType.STRING,
      required: true,
    
    },
    {
      name: "Credentials",  // Changed to lowercase
      type: TaskParamType.CREDENTIAL,
      required: true,
    },
     {
      name: "Prompt",  // Changed to lowercase
      type: TaskParamType.STRING,
      required: true,
      variant:"textarea"
    }
  ] as const,
  outputs: [
    {
      name: "Extracted data",  // Changed to camelCase
      type: TaskParamType.STRING
    },
  ] as const,
}satisfies WorkflowTask