import { generateAiContent } from "@/lib/gemini";
import { GenerateSkillsBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateSkillsBody = await req.json();

    const { experienceLevel, jobTitle } = body;

    if (!experienceLevel || !jobTitle)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "missing fields",
        },
        {
          status: 400,
        },
      );

    const prompt = `
            You are an ATS optimization specialist.
            
            Generate technical skills for the following role.
            
            Job Title:
            ${jobTitle}
            
            Experience Level:
            ${experienceLevel}
            
            CRITICAL OUTPUT INSTRUCTIONS:
            
            - Return ONLY a valid JSON array.
            - Do NOT wrap the array in quotes.
            - Do NOT return an object.
            - Do NOT return markdown.
            - Do NOT use \`\`\`json code blocks.
            - Do NOT add explanations, notes, headings, or introductory text.
            - The response must start with "[" and end with "]".
            - Every item must be a string.
            - Include only technical skills.
            - Exclude all soft skills.
            - Generate 15-25 relevant technical skills.
            - Remove duplicates.
            
            Valid Example:
            
            [
              "JavaScript",
              "TypeScript",
              "React.js",
              "Node.js",
              "MongoDB"
            ]
            
            Invalid Example:
            
            {
              "skills": [
                "JavaScript",
                "React.js"
              ]
            }
            
            Invalid Example:
            
            "[
              \\"JavaScript\\",
              \\"React.js\\"
            ]"
            
            Output:
            Return ONLY the raw JSON array.
            `;

    const result = await generateAiContent(prompt);

    let skills = result;

    if (typeof skills === "string") {
      try {
        skills = JSON.parse(skills);
      } catch (err) {
        console.log("failed to parse skills:", err);
      }
    }

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "skills created",
        data: {
          skills,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log("error in skills api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
