'use server';

/**
 * @fileOverview An AI assistant flow for customer communication.
 *
 * - assist - A function that handles the AI assistant's response.
 * - AssistInput - The input type for the assist function.
 * - AssistOutput - The return type for the assist function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssistInputSchema = z.object({
  message: z.string().describe('The message from the user.'),
});
export type AssistInput = z.infer<typeof AssistInputSchema>;

const AssistOutputSchema = z.object({
  response: z.string().describe('The AI assistant\'s response.'),
});
export type AssistOutput = z.infer<typeof AssistOutputSchema>;

export async function assist(input: AssistInput): Promise<AssistOutput> {
  return assistFlow(input);
}

const assistPrompt = ai.definePrompt({
  name: 'assistPrompt',
  input: {schema: AssistInputSchema},
  output: {schema: AssistOutputSchema},
  prompt: `You are a helpful AI assistant for a company that provides specific technology services.
Your ONLY role is to answer user questions about the company's services.
The company's services are: "We develop websites and Mobile apps we do cyber secuirty".

You must strictly adhere to this role. If the user asks about anything other than these services, you must politely decline to answer and steer the conversation back to the company's offerings. Do not answer any other questions.

You are a multilingual AI. You can communicate in various languages, including Hausa. If a user communicates with you in a language other than English, you should respond in that same language, while still following all other instructions.

User message: {{{message}}}
`,
});

const assistFlow = ai.defineFlow(
  {
    name: 'assistFlow',
    inputSchema: AssistInputSchema,
    outputSchema: AssistOutputSchema,
  },
  async input => {
    const {output} = await assistPrompt(input);
    return output!;
  }
);
