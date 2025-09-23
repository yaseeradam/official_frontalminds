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
  prompt: `You are a helpful AI assistant for FrontalMinds, a company specializing in neural interfaces and cognitive enhancement. Your role is to answer user questions about the company, its products, and its services. Be friendly, knowledgeable, and professional.

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
