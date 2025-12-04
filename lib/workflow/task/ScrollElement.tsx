import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import {   ArrowUpIcon } from "lucide-react";



export const ScrollElementTask = {
  type: TaskType.SCROLL_ELEMENT,
  label: "Scroll Element",
  icon: (props) => (
    <ArrowUpIcon className="stroke-orange-400" {...props}/>
  ),
  isEntryPoint: false,
  credits:1,
  inputs: [
    {
      name: "webPage",  // Changed to lowercase
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    
    },
    {
      name: "Selector",  // Changed to lowercase
      type: TaskParamType.STRING,
      required: true,
    }
  ] as const,
  outputs: [
    {
      name: "webPage",  // Changed to camelCase
      type: TaskParamType.BROWSER_INSTANCE
    },
  ] as const,
}satisfies WorkflowTask