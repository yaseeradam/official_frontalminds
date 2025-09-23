'use server';

/**
 * @fileOverview A Genkit flow for routing terminal commands to different pages.
 *
 * - routeCommand - A function that routes the terminal command.
 * - TerminalCommandInput - The input type for the routeCommand function.
 * - TerminalCommandOutput - The return type for the routeCommand function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TerminalCommandInputSchema = z.object({
  command: z
    .string()
    .describe('The command entered by the user in the terminal.'),
});
export type TerminalCommandInput = z.infer<typeof TerminalCommandInputSchema>;

const TerminalCommandOutputSchema = z.object({
  navigationPath: z.string().describe('The path to navigate to based on the command.'),
  easterEgg: z.string().optional().describe('An optional easter egg message.'),
});
export type TerminalCommandOutput = z.infer<typeof TerminalCommandOutputSchema>;

export async function routeCommand(input: TerminalCommandInput): Promise<TerminalCommandOutput> {
  return routeCommandFlow(input);
}

const routeCommandPrompt = ai.definePrompt({
  name: 'routeCommandPrompt',
  input: {schema: TerminalCommandInputSchema},
  output: {schema: TerminalCommandOutputSchema},
  prompt: `You are a command router for a website terminal. Based on the command entered by the user, determine the appropriate navigation path.

Valid commands and their corresponding paths are:
- help: displays available commands (no navigation required)
- about: /about
- services: /services
- projects: /projects
- contact: /contact
- clear / cls: clears the terminal screen (no navigation required)
- exit: closes the terminal (no navigation required)

If the command is not recognized, return an empty string for the navigationPath.

If the command is "frontal" or "brain", return a special easter egg message.

Command: {{{command}}}
`,
});

const routeCommandFlow = ai.defineFlow(
  {
    name: 'routeCommandFlow',
    inputSchema: TerminalCommandInputSchema,
    outputSchema: TerminalCommandOutputSchema,
  },
  async input => {
    if (input.command === 'frontal' || input.command === 'brain') {
      return {
        navigationPath: '',
        easterEgg: 'You found a secret!',
      };
    }
    const {output} = await routeCommandPrompt(input);
    return output!;
  }
);
