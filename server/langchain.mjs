import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { writeFile, readFile } from 'fs/promises';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// 파일을 읽고 내용을 반환하는 함수
async function readMyFile() {
    try {
        const data = await readFile('../contracts/Game.sol', 'utf8');
        return data; // 데이터 반환
    } catch (error) {
        console.error('파일을 읽는 도중 에러가 발생했습니다:', error);
        throw error; // 에러를 다시 던져서 외부에서 처리할 수 있게 함
    }
}

async function trigger() {
    try {
        const fileData = await readMyFile();
        console.log("읽은 파일의 내용:", fileData);

        const model = new ChatOpenAI({
            openAIApiKey: OPENAI_API_KEY,
        });

        const promptTemplate = PromptTemplate.fromTemplate(
            `I want to change the Solidity Code.
            The existing code is {originalFile}

            This is the requirement for new Solidity code: 
            Add a 'require' statement in the modifier section to {requirement}.
            The new statement should be a new line.
            Please add the line of code for 'require'. 
            Please Give me the full entire code.

            I need a straightforward Solidity code snippet that satisfies the requirements. 
            Please provide only the raw code, 
            without any additional explanations or instructions.`
        );
        
        const chain = promptTemplate.pipe(model);
        
        const result = await chain.invoke({ originalFile: fileData, requirement: "prevent it from attacking the Elderly"}); // 읽은 데이터를 사용
        
        console.log(result);

        const myString = result.content;
        const filePath = "../contracts/myFile.sol";
        await writeFile(filePath, myString);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

trigger().then(() => {
    console.log("Operation completed");
}).catch((error) => {
    console.error("An error occurred:", error);
});
