import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import {   DatabaseIcon, FileJson2Icon, LucideProps, MousePointerClick, TextIcon } from "lucide-react";



export const AddPropertyToJsonTask = {
  type: TaskType.ADD_PROPERTY_TO_JSON,
  label: "Add property from Json",
  icon: (props) => (
    <DatabaseIcon className="stroke-orange-400" {...props}/>
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
    },
     {
      name: "Property value",  // Changed to lowercase
      type: TaskParamType.STRING,
      required: true,
    }
  ] as const,
  outputs: [
    {
      name: "update JSON",  // Changed to camelCase
      type: TaskParamType.STRING
    },
  ] as const,
}satisfies WorkflowTask