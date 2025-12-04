import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import {   FileJson2Icon, LucideProps, MousePointerClick, TextIcon } from "lucide-react";



export const ReadPropertyFromJsonTask = {
  type: TaskType.READ_PROPERTY_FROM_JSON,
  label: "Read property from Json",
  icon: (props) => (
    <FileJson2Icon className="stroke-orange-400" {...props}/>
  ),
  isEntryPoint: false,
  credits:1,
  inputs: [
    {
      name: "JSON",  // Changed to lowercase
      type: TaskParamType.STRING,
      required: true,
    
    },
    {
      name: "Property name",  // Changed to lowercase
      type: TaskParamType.STRING,
      required: true,
    }
  ] as const,
  outputs: [
    {
      name: "Property value",  // Changed to camelCase
      type: TaskParamType.STRING
    },
  ] as const,
}satisfies WorkflowTask