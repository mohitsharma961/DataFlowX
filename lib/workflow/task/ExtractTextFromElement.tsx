import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import {   LucideProps, TextIcon } from "lucide-react";

// 

// export const ExtractTextFromElementTask= {
//   type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
//   label: "Extract text from element",
//   icon: (props: LucideProps) => (
//     <TextIcon className="stroke-pink-400" {...props}/>
//   ),
//   isEntryPoint: true,
//   inputs: [
//     {
//       name: "Html",  // Display name
//       type: TaskParamType.STRING,
//       required: true,
//     },
//     {
//       name: "Selector",  // Display name
//       type: TaskParamType.STRING,
//       required: true,
//     }
//   ],
//   outputs: [
//     {
//       name: "Extracted text",
//       type: TaskParamType.STRING
//     },
    
//   ]
// }

export const ExtractTextFromElementTask = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Extract text from element",
  icon: (props: LucideProps) => (
    <TextIcon className="stroke-pink-400" {...props}/>
  ),
  isEntryPoint: false,
  credits:2,
  inputs: [
    {
      name: "html",  // Changed to lowercase
      type: TaskParamType.STRING,
      required: true,
      variant:"textarea",
    },
    {
      name: "selector",  // Changed to lowercase
      type: TaskParamType.STRING,
      required: true,
    }
  ] as const,
  outputs: [
    {
      name: "extractedText",  // Changed to camelCase
      type: TaskParamType.STRING
    },
  ] as const,
}satisfies WorkflowTask