import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, User, Sparkles, X } from 'lucide-react';
import { mockTrainees } from '@/utils/mockData';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  candidates?: typeof mockTrainees;
}

interface SkillSearchChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const skillKeywords: Record<string, string[]> = {
  'react': ['React Development', 'Full Stack'],
  'python': ['Python Backend', 'Core Stack'],
  'node': ['Node.js Backend', 'Full Stack'],
  'ai': ['Machine Learning', 'Deep Learning', 'AI-ML'],
  'ml': ['Machine Learning', 'Deep Learning', 'AI-ML'],
  'machine learning': ['Machine Learning', 'AI-ML'],
  'deep learning': ['Deep Learning', 'AI-ML'],
  'data': ['Data Structures', 'Core Stack'],
  'frontend': ['React Development', 'Full Stack'],
  'backend': ['Python Backend', 'Node.js Backend'],
  'full stack': ['Full Stack', 'React Development', 'Node.js Backend'],
};

const SkillSearchChatbot: React.FC<SkillSearchChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI Talent Assistant. Ask me to find candidates with specific skills like 'Show me React developers' or 'Find candidates with Python skills'.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const findCandidatesBySkill = (query: string): typeof mockTrainees => {
    const lowerQuery = query.toLowerCase();
    let matchedTracks: string[] = [];

    // Find matching skill keywords
    Object.entries(skillKeywords).forEach(([keyword, tracks]) => {
      if (lowerQuery.includes(keyword)) {
        matchedTracks.push(...tracks);
      }
    });

    // If no specific skill found, try to match with track or course names directly
    if (matchedTracks.length === 0) {
      return mockTrainees.filter(
        (t) =>
          t.track.toLowerCase().includes(lowerQuery) ||
          t.course.toLowerCase().includes(lowerQuery) ||
          t.name.toLowerCase().includes(lowerQuery)
      );
    }

    // Filter trainees by matched tracks
    return mockTrainees.filter((t) =>
      matchedTracks.some(
        (track) =>
          t.track.toLowerCase().includes(track.toLowerCase()) ||
          t.course.toLowerCase().includes(track.toLowerCase())
      )
    );
  };

  const generateResponse = (query: string): { text: string; candidates: typeof mockTrainees } => {
    const candidates = findCandidatesBySkill(query);
    
    if (candidates.length === 0) {
      return {
        text: "I couldn't find any candidates matching your criteria. Try searching for skills like React, Python, Node.js, AI/ML, or Data Structures.",
        candidates: [],
      };
    }

    // Sort by score
    const sortedCandidates = [...candidates].sort((a, b) => b.avgScore - a.avgScore);
    const topCandidates = sortedCandidates.slice(0, 5);

    return {
      text: `I found ${candidates.length} candidate(s) matching your criteria. Here are the top performers:`,
      candidates: topCandidates,
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      const response = generateResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        candidates: response.candidates.length > 0 ? response.candidates : undefined,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-4 right-4 w-[400px] h-[500px] z-50 flex flex-col border-0 card-shadow-lg">
      <CardHeader className="pb-3 border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            AI Talent Search
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-3',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <div className="p-2 rounded-full bg-primary/10 h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[280px] rounded-lg p-3',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.candidates && message.candidates.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.candidates.map((candidate) => (
                        <div
                          key={candidate.id}
                          className="flex items-center gap-2 p-2 rounded-md bg-card border border-border"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={candidate.avatar} />
                            <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {candidate.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {candidate.track}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={cn(
                              'text-xs',
                              candidate.avgScore >= 85
                                ? 'bg-success/10 text-success'
                                : 'bg-primary/10 text-primary'
                            )}
                          >
                            {candidate.avgScore}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {message.role === 'user' && (
                  <div className="p-2 rounded-full bg-secondary/10 h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-secondary" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="p-2 rounded-full bg-primary/10 h-8 w-8 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask for candidates with specific skills..."
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={!input.trim() || isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillSearchChatbot;
