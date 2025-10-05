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
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-lg font-medium text-muted-foreground">
                {currentDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="text-sm text-muted-foreground">
                <Badge variant="outline">
                  {currentPrompt.category}
                </Badge>
                <span className="ml-2">#{currentPrompt.id}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-xl leading-relaxed text-foreground min-h-[3rem] flex items-center justify-center">
                {currentPrompt.text}
              </p>
            </div>

            <div className="flex justify-center gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              {!isToday() && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleToday}
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Today
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleRandom}
                className="flex items-center gap-2"
              >
                <Shuffle className="h-4 w-4" />
                Random
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Prompt {currentPrompt.id} of {prompts.length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-4xl mx-auto">
        <WritingInterface
          prompt={currentPrompt}
          date={currentDateString}
        />
      </div>
    </div>
  );
}