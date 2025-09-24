
"use client";

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { X, Terminal as TerminalIcon, Maximize, Minimize2 } from 'lucide-react';
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
  home      - navigate to the Home page
  about     - navigate to the About page
  services  - navigate to the Services page
  projects  - navigate to the Projects page
  contact   - navigate to the Contact page
  assist    - open the AI Assistant
  login     - navigate to the Login page
  signup    - navigate to the Sign Up page
  clear/cls - clear the terminal screen
  exit      - close the terminal`;

const WELCOME_MESSAGE = `Welcome to the FrontalMinds Secure Terminal.
Type 'help' for a list of commands.`;

export function Terminal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 896, height: 600 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const router = useRouter();
  const isMobile = useIsMobile();
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  useEffect(() => {
    if (isOpen) {
      if (lines.length === 0) {
        setLines([{ type: 'system', text: WELCOME_MESSAGE }]);
      }
      if (!isMobile) {
        inputRef.current?.focus();
      }
      
      // Center on open
      const terminal = terminalRef.current;
      if (terminal) {
          const { innerWidth, innerHeight } = window;
          const { width, height } = terminal.getBoundingClientRect();
          setPosition({ x: (innerWidth - width) / 2, y: (innerHeight - height) / 2 });
      } else {
        // Fallback for initial render
        const x = (window.innerWidth - dimensions.width) / 2;
        const y = (window.innerHeight - dimensions.height) / 2;
        setPosition({ x, y });
      }
    }
  }, [isOpen, isMobile, dimensions.width, dimensions.height, lines.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const addLine = (line: Line) => setLines(prev => [...prev, line]);

  const handleCommand = async (command: string) => {
    const trimmed = command.trim();
    if (trimmed) {
      addLine({ type: 'input', text: `root@frontalminds:~# ${trimmed}` });
      setHistory(prev => [trimmed, ...prev]);
      setHistoryIndex(-1);
    } else {
      addLine({ type: 'input', text: `root@frontalminds:~#` });
    }

    setInput('');

    const lowerCaseCommand = trimmed.toLowerCase();

    switch (lowerCaseCommand) {
      case 'help':
        HELP_MESSAGE.split('\n').forEach(line => addLine({ type: 'output', text: line }));
        return;
      case 'clear':
      case 'cls':
        setLines([{ type: 'system', text: WELCOME_MESSAGE }]);
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
      } else if(trimmed) {
        addLine({ type: 'error', text: `bash: command not found: ${trimmed}` });
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
        addLine({ type: 'input', text: `root@frontalminds:~# ${input}^C` });
    }
  };

  const toggleMaximize = () => setIsMaximized(!isMaximized);

  const content = isMobile ? (
    <div className="p-6 text-center">
      <TerminalIcon className="mx-auto h-12 w-12 text-primary" />
      <h3 className="mt-4 font-headline text-lg font-medium">Terminal Access</h3>
      <p className="mt-2 text-sm text-muted-foreground">The interactive terminal is available on desktop devices only.</p>
    </div>
  ) : (
    <div className="flex flex-col h-full font-code" onClick={() => inputRef.current?.focus()}>
      <motion.div
        onPointerDown={(e) => {
            // prevent drag from text selection
            if (e.target instanceof HTMLElement && e.target.closest('button')) return;
            dragControls.start(e, { snapToCursor: false });
        }}
        className="flex-shrink-0 p-2 flex items-center justify-between bg-card/50 cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center gap-2">
            <TerminalIcon className="h-4 w-4 text-primary"/>
            <span className="text-sm text-primary">root@frontalminds: ~</span>
        </div>
        <div className="flex items-center">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={toggleMaximize}>
                 {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
                <X className="h-4 w-4" />
            </Button>
        </div>
      </motion.div>
      <div ref={scrollRef} className="flex-grow p-2 overflow-y-auto terminal-output bg-background/95">
        {lines.map((line, index) => (
          <p key={index} className={cn('whitespace-pre-wrap break-words text-sm', {
            'text-primary/90': line.type === 'input',
            'text-foreground': line.type === 'output',
            'text-destructive': line.type === 'error',
            'text-accent font-bold': line.type === 'system',
            'text-yellow-400 text-glow': line.type === 'easter-egg',
          })}>
            {line.text}
          </p>
        ))}
         <div className="flex items-center">
          <span className="text-primary/90">root@frontalminds:~#&nbsp;</span>
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
       {!isMaximized && (
        <>
            <motion.div className="resize-handle resize-handle-tr" onPan={(e, info) => { setDimensions(d => ({ width: d.width + info.delta.x, height: d.height - info.delta.y })); setPosition(p => ({ ...p, y: p.y + info.delta.y })) }} />
            <motion.div className="resize-handle resize-handle-tl" onPan={(e, info) => { setDimensions(d => ({ width: d.width - info.delta.x, height: d.height - info.delta.y })); setPosition(p => ({ x: p.x + info.delta.x, y: p.y + info.delta.y })) }} />
            <motion.div className="resize-handle resize-handle-br" onPan={(e, info) => { setDimensions(d => ({ width: d.width + info.delta.x, height: d.height + info.delta.y })); }} />
            <motion.div className="resize-handle resize-handle-bl" onPan={(e, info) => { setDimensions(d => ({ width: d.width - info.delta.x, height: d.height + info.delta.y })); setPosition(p => ({ ...p, x: p.x + info.delta.x })) }} />
            <motion.div className="resize-handle resize-handle-t" onPan={(e, info) => { setDimensions(d => ({ ...d, height: d.height - info.delta.y })); setPosition(p => ({ ...p, y: p.y + info.delta.y })) }} />
            <motion.div className="resize-handle resize-handle-b" onPan={(e, info) => { setDimensions(d => ({ ...d, height: d.height + info.delta.y })); }} />
            <motion.div className="resize-handle resize-handle-r" onPan={(e, info) => { setDimensions(d => ({ ...d, width: d.width + info.delta.x })); }} />
            <motion.div className="resize-handle resize-handle-l" onPan={(e, info) => { setDimensions(d => ({ ...d, width: d.width - info.delta.x })); setPosition(p => ({ ...p, x: p.x + info.delta.x })) }} />
        </>
      )}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
            ref={terminalRef}
            dragControls={dragControls}
            dragListener={false}
            drag
            whileDrag={{ cursor: 'grabbing' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
                opacity: 1, 
                scale: 1, 
                width: isMaximized ? '90vw' : dimensions.width, 
                height: isMaximized ? '80vh' : dimensions.height,
                x: position.x,
                y: position.y,
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            dragMomentum={false}
            transition={{ type: 'spring', stiffness: 500, damping: 40, mass: 0.8 }}
            className="fixed z-50 flex flex-col overflow-hidden max-w-[95vw] max-h-[90vh] min-w-[400px] min-h-[300px] bg-card rounded-lg border border-primary/30 shadow-2xl shadow-primary/20"
            style={{
                ...(isMaximized && { top: '5vh', left: '5vw', x:0, y:0, width: '90vw', height: '90vh' }),
                ...(!isMaximized && { top: '0px', left: '0px'})
            }}
            onDragEnd={(_, info) => {
              if (!isMaximized) {
                setPosition({ x: position.x + info.offset.x, y: position.y + info.offset.y })
              }
            }}
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

    