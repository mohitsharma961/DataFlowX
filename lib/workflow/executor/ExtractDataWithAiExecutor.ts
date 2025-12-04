import {  ExecutionEnvironment } from "@/types/executor";
import { ExtractDataWithAiTask } from "../task/ExtractDataWithAi";
import { prisma } from "@/lib/prisma";
import { symmetricDecrypt } from "@/lib/encryption";
import { Groq } from "groq-sdk";


export async function ExtractDataWithAiExecutor(environment:ExecutionEnvironment<typeof ExtractDataWithAiTask>):Promise<boolean>{
    
   try {
    const credentials=environment.getInput("Credentials");
    if(!credentials){
        environment.log.error("input->Credentials is not defined")
    }

     const prompt=environment.getInput("Prompt");
    if(!prompt){
        environment.log.error("input->Credentials is not defined")
    }

     const content=environment.getInput("Content");
    if(!content){
        environment.log.error("input->content is not defined")
    }
  //Get Credential from DB
  const credential=await prisma.credential.findUnique({
    where:{id:credentials},
  });

  if(!credential){
    environment.log.error("credential not found");
  }

  const plainCredentialValue=symmetricDecrypt(credential!.value);
  if(!plainCredentialValue){
    environment.log.error("cannot decrypt credential");
    return false;
  }

//   const mockExtractedData={
//     usernameSelector:"#username",
//     passwordSelector:"#password",
//     loginSelector:"body > div > form > input.btn.btn-primary"

//   };



const groq = new Groq({
  apiKey: plainCredentialValue,   // same as OpenAI
});

const response = await groq.chat.completions.create({
  model: "openai/gpt-oss-20b",
  temperature: 1,
  messages: [
    {
      role: "system",
      content:
        "You are a webscrapper helper that extracts data from HTML or text. You will be given a piece of text or HTML content as input and also the prompt with the data you want to extract. The response should always be only extracted data as a JSON array or object, without any additional words or explanation. Analyze the input carefully and extract data precisely based on the prompt.if no data is found,return an empty JSON array.work only with the provided content and ensure the output is always a valid JSON array without any surrounding text",
    },
    {
      role: "user",
      content: content, // your HTML/text input
    },
    {
      role: "user",
      content: prompt, // your extraction prompt
    },
  ],
});

// ----- Logging (Groq uses `usage.total_tokens` etc.)
environment.log.info(`Prompt tokens: ${response.usage?.prompt_tokens}`);
environment.log.info(`Completion tokens: ${response.usage?.completion_tokens}`);

const result = response.choices[0].message?.content;

if (!result) {
  environment.log.error("empty response from ai");
}

environment.setOutput("Extracted data", result??"");
   
    
    return true;
   } catch (error:any) {
    environment.log.error(error.message);
    return false;
   }
}