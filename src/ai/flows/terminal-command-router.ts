'use server';

/**
 * @fileOverview A Genkit flow + switch router for routing terminal commands
 *               to pages or triggering animations/easter eggs.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TerminalCommandInputSchema = z.object({
  command: z
    .string()
    .describe('The command entered by the user in the terminal.'),
});
export type TerminalCommandInput = z.infer<typeof TerminalCommandInputSchema>;

const TerminalCommandOutputSchema = z.object({
  navigationPath: z
    .string()
    .describe('The path to navigate to based on the command.'),
  easterEgg: z
    .string()
    .optional()
    .describe('An optional easter egg message.'),
});
export type TerminalCommandOutput = z.infer<
  typeof TerminalCommandOutputSchema
>;

/**
 * Prompt for Genkit AI fallback.
 */
const routeCommandPrompt = ai.definePrompt({
  name: 'routeCommandPrompt',
  input: { schema: TerminalCommandInputSchema },
  output: { schema: TerminalCommandOutputSchema },
  prompt: `
You are a command router for a website terminal. Based on the command entered by the user, determine the appropriate navigation path or easter egg response.

Valid commands and their corresponding paths are:
- help: displays available commands (no navigation required)
- home: /
- about: /about
- services: /services
- projects: /projects
- contact: /contact
- assist: /assist
- login: /login
- signup: /signup
- clear / cls: clears the terminal screen (no navigation required)
- exit: closes the terminal (no navigation required)

Additional Futuristic Commands:
- matrix: streams Matrix code
- neofetch: futuristic system info
- hack: fake hacking animation
- space: show space news
- glitch: generate glitch text
- theme cyberpunk: switch theme
- particle: particle effect
- wormhole: wormhole ASCII + teleport
- rainbow: rainbow effect
- starfield: starfield animation
- ai: ask AI a question
- selfdestruct: fake self destruct countdown
- blackhole: suck text into blackhole animation
- portal: hidden page/Easter egg
- matrixify [text]: render text in matrix style
- glow [text]: render glowing neon text
- scan [url]: fake URL scan
- trace [user]: fake trace route
- encrypt [text]: encode string
- decrypt [text]: decode string
- dna: DNA-style animation
- quantum: quantum computing effect
- drone: fake drone animation
- holo: holographic effect
- synthwave: switch to synthwave theme
- neon: turn on neon lights animation
- hyperspace: hyperspace jump animation
- cyberstorm: show a cyber storm animation
- pixelrain: simulate pixel rain effect
- vortex: show vortex / spiral animation
- firewall: fake firewall status scan
- cybershock: cyberpunk glitch shockwave
`,
});

/**
 * Genkit flow wrapper (AI fallback).
 */
const routeCommandFlow = ai.defineFlow(
  {
    name: 'routeCommandFlow',
    inputSchema: TerminalCommandInputSchema,
    outputSchema: TerminalCommandOutputSchema,
  },
  async (input) => {
    const output = await routeCommandPrompt(input);
    return {
      navigationPath: output?.output?.navigationPath ?? '',
      easterEgg: output?.output?.easterEgg,
    };
  }
);

/**
 * Main routeCommand entry point:
 * 1. Checks hard-coded commands first.
 * 2. Falls back to AI flow if unknown.
 */
export async function routeCommand(
  input: TerminalCommandInput
): Promise<TerminalCommandOutput> {
  const cmd = input.command.trim().toLowerCase();

  // ✅ 1. Hard-coded navigation commands:
  if (cmd === 'home') return { navigationPath: '/' };
  if (cmd === 'about') return { navigationPath: '/about' };
  if (cmd === 'services') return { navigationPath: '/services' };
  if (cmd === 'projects') return { navigationPath: '/projects' };
  if (cmd === 'contact') return { navigationPath: '/contact' };
  if (cmd === 'assist') return { navigationPath: '/assist' };
  if (cmd === 'login') return { navigationPath: '/login' };
  if (cmd === 'signup') return { navigationPath: '/signup' };

  // ✅ 2. Hard-coded easter egg / special commands:
  const sexyCommands: Record<string, string> = {
    help: 'Showing help menu…',
    clear: 'Clearing terminal…',
    cls: 'Clearing terminal…',
    exit: 'Closing terminal…',

    matrix: 'Launching Matrix animation…',
    neofetch: 'Displaying system info…',
    hack: 'Initiating fake hacking animation…',
    space: 'Displaying live space feed…',
    glitch: 'Generating glitch text…',
    'theme cyberpunk': 'Switching to Cyberpunk theme…',
    particle: 'Starting particle effect…',
    wormhole: 'Opening wormhole…',
    rainbow: 'Rainbow mode engaged…',
    starfield: 'Starting starfield animation…',
    ai: 'Connecting to AI…',
    selfdestruct: 'Self-destruct countdown initiated…',
    blackhole: 'Sucking everything into a blackhole…',
    portal: 'Opening hidden portal…',
    dna: 'Generating DNA animation…',
    quantum: 'Quantum computing effect engaged…',
    drone: 'Deploying drone animation…',
    holo: 'Showing holographic effect…',
    synthwave: 'Switching to Synthwave theme…',

    // New sexy commands:
    neon: 'Turning on neon lights animation…',
    hyperspace: 'Jumping to hyperspace…',
    cyberstorm: 'Launching cyber storm effect…',
    pixelrain: 'Simulating pixel rain effect…',
    vortex: 'Spinning up vortex animation…',
    firewall: 'Scanning firewall status…',
    cybershock: 'Releasing cyberpunk glitch shockwave…',
  };

  if (sexyCommands[cmd]) {
    return { navigationPath: '', easterEgg: sexyCommands[cmd] };
  }

  // ✅ 3. Fallback to AI flow for unknown commands:
  return routeCommandFlow(input);
}
