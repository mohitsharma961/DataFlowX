import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import {  Link2Icon } from "lucide-react";



export const NavigateUrlTask = {
  type: TaskType.NAVIGATE_URL,
  label: "Navigate Url",
  icon: (props) => (
    <Link2Icon className="stroke-orange-400" {...props}/>
  ),
  isEntryPoint: false,
  credits:2,
  inputs: [
    {
      name: "webPage",  // Changed to lowercase
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
      variant:"textarea",
    },
    {
      name: "Url",  // Changed to lowercase
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