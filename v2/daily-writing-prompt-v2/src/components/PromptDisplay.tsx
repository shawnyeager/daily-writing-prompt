import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, ChevronLeft, ChevronRight, Shuffle, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/useToast';
import { WritingInterface } from '@/components/WritingInterface';
import {
  WritingPrompt,
  getTodaysPrompt,
  getPromptByIndex,
  getRandomPrompt,
  prompts
} from '@/data/prompts';

interface PromptDisplayProps {
  className?: string;
}

export function PromptDisplay({ className }: PromptDisplayProps) {
  const [currentPrompt, setCurrentPrompt] = useState<WritingPrompt>(getTodaysPrompt());
  const [currentIndex, setCurrentIndex] = useState(() => {
    const todaysPrompt = getTodaysPrompt();
    return todaysPrompt.id - 1;
  });
  const { toast } = useToast();

  const handlePrevious = useCallback(() => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : prompts.length - 1;
    setCurrentIndex(newIndex);
    setCurrentPrompt(getPromptByIndex(newIndex));
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    const newIndex = currentIndex < prompts.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setCurrentPrompt(getPromptByIndex(newIndex));
  }, [currentIndex]);

  const handleRandom = useCallback(() => {
    const randomPrompt = getRandomPrompt();
    setCurrentPrompt(randomPrompt);
    setCurrentIndex(randomPrompt.id - 1);
  }, []);

  const handleToday = useCallback(() => {
    const todaysPrompt = getTodaysPrompt();
    setCurrentPrompt(todaysPrompt);
    setCurrentIndex(todaysPrompt.id - 1);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(currentPrompt.text);
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard",
        duration: 2000,
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
        duration: 2000,
      });
    }
  }, [currentPrompt.text, toast]);

  const getDateForPrompt = useCallback((promptIndex: number) => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const promptDate = new Date(startOfYear.getTime() + (promptIndex * 24 * 60 * 60 * 1000));
    return promptDate;
  }, []);

  const isToday = useCallback(() => {
    const todaysPrompt = getTodaysPrompt();
    return currentPrompt.id === todaysPrompt.id;
  }, [currentPrompt.id]);

  const currentDate = getDateForPrompt(currentIndex);

  const currentDateString = currentDate.toISOString().split('T')[0];

  return (
    <div className={`w-full space-y-6 ${className || ''}`}>
      <Card className="bg-[#2a2a2a] border-gray-700 shadow-2xl">
        <CardHeader className="pb-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-base font-normal text-gray-400">
              {currentDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-600">
                {currentPrompt.category}
              </Badge>
              <span>#{currentPrompt.id}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-6 pb-6">
          <div className="px-6 min-h-[100px] flex items-center">
            <p className="text-2xl leading-relaxed text-white font-light">
              {currentPrompt.text}
            </p>
          </div>

          <div className="flex gap-2 flex-wrap pt-2 px-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="flex items-center gap-1.5 bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
            >
              <Copy className="h-4 w-4" />
              Copy
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              className="flex items-center gap-1.5 bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              className="flex items-center gap-1.5 bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRandom}
              className="flex items-center gap-1.5 bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
            >
              <Shuffle className="h-4 w-4" />
              Random
            </Button>

            {!isToday() && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleToday}
                className="flex items-center gap-1.5 bg-blue-900/30 border-blue-700 text-blue-300 hover:bg-blue-800/40 hover:text-blue-200 transition-colors"
              >
                <Calendar className="h-4 w-4" />
                Today
              </Button>
            )}
          </div>

          <div className="text-center text-sm text-gray-500 pt-2">
            Prompt {currentPrompt.id} of {prompts.length}
          </div>
        </CardContent>
      </Card>

      <WritingInterface
        prompt={currentPrompt}
        date={currentDateString}
      />
    </div>
  );
}