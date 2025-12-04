"use server"
import { createFlowNode } from "@/lib/createFlowNode";
import { prisma } from "@/lib/prisma";
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflow";
import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";
import { workflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { Edge } from "@xyflow/react";


export async function CreateWorkflow(form:createWorkflowSchemaType){
    const {success,data}=createWorkflowSchema.safeParse(form);
    if(!success){
        throw new Error("invalid form data");
    }
    const {userId}=auth();
    
    if(!userId){
        throw new Error("unauthentacated");
    }

    const initialFlow:{nodes:AppNode[],edges:Edge[]}={
        nodes:[],
        edges:[],
    };

    //Let's add the flow entry point

    initialFlow.nodes.push(createFlowNode(TaskType.LAUNCH_BROWSER));
    const result=await prisma.workflow.create({
        data:{
            userId,
            status:workflowStatus.DRAFT,
            definition:JSON.stringify(initialFlow),
            ...data,

        },
    });

    if(!result){
        throw new Error("failed to create a workflow");
    }
    return result;
}

