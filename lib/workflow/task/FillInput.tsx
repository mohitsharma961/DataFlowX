import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { CodeIcon, Edit3Icon, LucideProps, TextIcon } from "lucide-react";

export const FillInputTask = {
  type: TaskType.FILL_INPUT,
  label: "Fill input",
  icon: (props) => (
    <Edit3Icon className="stroke-orange-400" {...props}/>
  ),
  isEntryPoint: false,
  credits:1,
  inputs: [
    {
      name: "webPage",  // Changed to camelCase
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
     {
      name: "Selector",  // Changed to camelCase
      type: TaskParamType.STRING,
      required: true,
    },
     {
      name: "Value",  // Changed to camelCase
      type: TaskParamType.STRING,
      required: true,
    }
  ] as const,
  outputs: [
  
    {
      name: "webPage",  // Changed to camelCase
      type: TaskParamType.BROWSER_INSTANCE
    }
  ] as const,
}satisfies WorkflowTask