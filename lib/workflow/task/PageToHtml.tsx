// import { TaskParamType, TaskType } from "@/types/task";
// import { CodeIcon,  LucideProps } from "lucide-react";

// // 

// export const PageToHtmlTask = {
//   type: TaskType.PAGE_TO_HTML,
//   label: "Get html from page",
//   icon: (props: LucideProps) => (
//     <CodeIcon className="stroke-pink-400" {...props}/>
//   ),
//   isEntryPoint: true,
//   inputs: [
//     {
//       name: "Web Page",  // Display name
//       type: TaskParamType.BROWSER_INSTANCE,
//       required: true,
//     }
//   ],
//   outputs: [
//     {
//       name: "Html",
//       type: TaskParamType.STRING
//     },
//     {
//       name: "Web Page",  // Keep consistent casing
//       type: TaskParamType.BROWSER_INSTANCE
//     }
//   ]
// }

import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { CodeIcon, LucideProps, TextIcon } from "lucide-react";

export const PageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  label: "Get html from page",
  icon: (props: LucideProps) => (
    <CodeIcon className="stroke-pink-400" {...props}/>
  ),
  isEntryPoint: false,
  credits:2,
  inputs: [
    {
      name: "webPage",  // Changed to camelCase
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    }
  ] as const,
  outputs: [
    {
      name: "html",  // Changed to lowercase
      type: TaskParamType.STRING
    },
    {
      name: "webPage",  // Changed to camelCase
      type: TaskParamType.BROWSER_INSTANCE
    }
  ] as const,
}satisfies WorkflowTask

// export const ExtractTextFromElementTask = {
//   type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
//   label: "Extract text from element",
//   icon: (props: LucideProps) => (
//     <TextIcon className="stroke-pink-400" {...props}/>
//   ),
//   isEntryPoint: true,
//   inputs: [
//     {
//       name: "html",  // Changed to lowercase
//       type: TaskParamType.STRING,
//       required: true,
//     },
//     {
//       name: "selector",  // Changed to lowercase
//       type: TaskParamType.STRING,
//       required: true,
//     }
//   ],
//   outputs: [
//     {
//       name: "extractedText",  // Changed to camelCase
//       type: TaskParamType.STRING
//     },
//   ]
// }