// import { waitFor } from "@/lib/helper/waitFor"
// import { Environment, ExecutionEnvironment } from "@/types/executor";
// import puppeteer from "puppeteer"
// import { LaunchBrowserTask } from "../task/LaunchBrowser";



// export async function LaunchBrowserExecutor(environment:ExecutionEnvironment<typeof LaunchBrowserTask>):Promise<boolean>{
    
//    try {
//     const websiteUrl=environment.getInput("website Url");
//     const browser=await puppeteer.launch({
//         headless:true,
//     })
//      environment.log.info("Browser started successfully")
//     environment.setBrowser(browser);
//     const page=await browser.newPage();


//     await page.goto(websiteUrl);
//     await waitFor(2000);
//     environment.setPage(page);

//      environment.log.info(`Opened page at ${websiteUrl}`)
//     return true;
//    } catch (error:any) {
//     environment.log.error(error.message);
//     return false;
//    }
// }



import { waitFor } from "@/lib/helper/waitFor"
import { Environment, ExecutionEnvironment } from "@/types/executor";
import puppeteer from "puppeteer"
import { LaunchBrowserTask } from "../task/LaunchBrowser";

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("website Url");
    
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-features=IsolateOrigins',
        '--disable-site-isolation-trials',
      ],
    });
    
    environment.log.info("Browser started successfully");
    environment.setBrowser(browser);
    
    const page = await browser.newPage();
    await page.goto(websiteUrl, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    await waitFor(2000);
    environment.setPage(page);
    
    environment.log.info(`Opened page at ${websiteUrl}`); // Fixed: added opening parenthesis
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}