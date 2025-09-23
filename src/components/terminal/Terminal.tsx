"use client";

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon } from 'lucide-react';
import { routeCommand } from '@/ai/flows/terminal-command-router';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type Line = {
  type: 'input' | 'output' | 'error' | 'system' | 'easter-egg';
  text: string;
};

const HELP_MESSAGE = `Available commands:
  help      - show this help message
  about     - navigate to the About page
  services  - navigate to the Services page
  projects  - navigate to the Projects page
  contact   - navigate to the Contact page
  clear/cls - clear the terminal screen
  exit      - close the terminal`;

export function Terminal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [lines, setLines] = useState<Line[]>([
    { type: 'system', text: 'FrontalMinds Terminal v1.0' },
    { type: 'system', text: 'Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const router = useRouter();
  const isMobile = useIsMobile();
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isMobile) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMobile]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (terminalRef.current && !terminalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const addLine = (line: Line) => setLines(prev => [...prev, line]);

  const handleCommand = async (command: string) => {
    const trimmed = command.trim();
    if (trimmed) {
      addLine({ type: 'input', text: `> ${trimmed}` });
      setHistory(prev => [trimmed, ...prev]);
      setHistoryIndex(-1);
    }

    setInput('');

    const lowerCaseCommand = trimmed.toLowerCase();

    switch (lowerCaseCommand) {
      case 'help':
        HELP_MESSAGE.split('\n').forEach(line => addLine({ type: 'output', text: line }));
        return;
      case 'clear':
      case 'cls':
        setLines([]);
        return;
      case 'exit':
        onClose();
        return;
    }

    try {
      const result = await routeCommand({ command: lowerCaseCommand });
      if (result.navigationPath) {
        addLine({ type: 'system', text: `Navigating to ${result.navigationPath}...` });
        router.push(result.navigationPath);
        setTimeout(onClose, 500);
      } else if (result.easterEgg) {
        addLine({ type: 'easter-egg', text: `*** ${result.easterEgg} ***` });
      } else {
        addLine({ type: 'error', text: `Command not found: ${trimmed}` });
      }
    } catch (error) {
      addLine({ type: 'error', text: 'An unexpected error occurred.' });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'c' && e.ctrlKey) {
        setInput('');
        addLine({ type: 'input', text: `> ${input}^C` });
    }
  };
  
  const content = isMobile ? (
    <div className="p-6 text-center">
      <TerminalIcon className="mx-auto h-12 w-12 text-primary" />
      <h3 className="mt-4 font-headline text-lg font-medium">Terminal Access</h3>
      <p className="mt-2 text-sm text-muted-foreground">The interactive terminal is available on desktop devices only.</p>
    </div>
  ) : (
    <div className="flex flex-col h-full font-code" onClick={() => inputRef.current?.focus()}>
      <div className="flex-shrink-0 p-2 flex items-center justify-between bg-black/30">
        <span className="text-sm text-primary">root@frontalminds:~</span>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div ref={scrollRef} className="flex-grow p-2 overflow-y-auto terminal-output">
        {lines.map((line, index) => (
          <p key={index} className={cn('whitespace-pre-wrap break-words', {
            'text-primary': line.type === 'input',
            'text-gray-300': line.type === 'output',
            'text-red-500': line.type === 'error',
            'text-cyan-400': line.type === 'system',
            'text-yellow-400 text-glow': line.type === 'easter-egg',
          })}>
            {line.text}
          </p>
        ))}
      </div>
      <div className="flex-shrink-0 p-2 flex items-center">
        <span className="text-primary">&gt;&nbsp;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-transparent text-primary outline-none"
          spellCheck="false"
          autoComplete="off"
        />
        <span className="blinking-cursor"></span>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={terminalRef}
          initial={{ opacity: 0, scale: 0.9, y: "-20%" }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: "-20%" }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] h-[70vh] max-w-2xl max-h-[450px] bg-black/80 backdrop-blur-sm rounded-lg border border-primary/20 shadow-2xl box-glow"
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
