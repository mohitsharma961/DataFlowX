import {  ExecutionEnvironment } from "@/types/executor";
import { FillInputTask } from "../task/FillInput";
import { waitFor } from "@/lib/helper/waitFor";
import { ClickElementTask } from "../task/ClickElement";
import { NavigateUrlTask } from "../task/NavigateUrl";

export async function NavigateUrlExecutor(environment:ExecutionEnvironment<typeof NavigateUrlTask>):Promise<boolean>{
    
   try {
    const url=environment.getInput("Url");
    if(!url){
        environment.log.error("input url is not defined")
    }
  

    await environment.getPage()!.goto(url);
    environment.log.error(`visited ${url}`);
    
    return true;
   } catch (error:any) {
    environment.log.error(error.message);
    return false;
   }
}