import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import {   EyeIcon, LucideProps, MousePointerClick, TextIcon } from "lucide-react";



export const WaitForElementTask = {
  type: TaskType.WAIT_FOR_ELEMENT,
  label: "wait for element",
  icon: (props) => (
    <EyeIcon className="stroke-amber-400" {...props}/>
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
    },
    {
      name: "Visibility",  // Changed to lowercase
      type: TaskParamType.SELECT,
      hideHandle:true,
      required: true,
      options:[

        {label:"Visible",value:"visible"},
        {label:"Hidden",value:"hidden"},
      ]
    },
  ] as const,
  outputs: [
    {
      name: "webPage",  // Changed to camelCase
      type: TaskParamType.BROWSER_INSTANCE
    },
  ] as const,
}satisfies WorkflowTask