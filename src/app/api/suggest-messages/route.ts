import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(req: Request) {

    try {
        const text = await streamText({
            model: google('models/gemini-1.5-flash-latest') as any,
            prompt: 'Give three random open ended and engaging questions separated by "||".',
            maxTokens: 400,
            frequencyPenalty: 0.6,
            temperature: 0.8,
        });
    
        for await (const textPart of text.textStream) {
            process.stdout.write(textPart);
        }
    
        return text.toAIStreamResponse({});
    } catch (error) {
        console.log('Error in suggesting messages', error);
        return Response.json(
            {
                success: false,
                message: "Failed to suggest messages"
            },
            {
                status: 500
            }
        );
    }

}