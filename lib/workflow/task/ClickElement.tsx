import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import {   LucideProps, MousePointerClick, TextIcon } from "lucide-react";



export const ClickElementTask = {
  type: TaskType.CLICK_ELEMENT,
  label: "Click Element",
  icon: (props) => (
    <MousePointerClick className="stroke-orange-400" {...props}/>
  ),
  isEntryPoint: false,
  credits:1,
  inputs: [
    {
      name: "webPage",  // Changed to lowercase
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
      variant:"textarea",
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