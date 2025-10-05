import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Save, FileText, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/useToast';
import {
  saveResponse,
  getResponseForPrompt,
  deleteResponse,
  countWords,
  type PromptResponse
} from '@/lib/storage';
import { WritingPrompt } from '@/data/prompts';

interface WritingInterfaceProps {
  prompt: WritingPrompt;
  date: string; // ISO date string (YYYY-MM-DD)
  className?: string;
}

export function WritingInterface({ prompt, date, className }: WritingInterfaceProps) {
  const [response, setResponse] = useState('');
  const [savedResponse, setSavedResponse] = useState<PromptResponse | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Load existing response when prompt or date changes
  useEffect(() => {
    const existing = getResponseForPrompt(prompt.id, date);
    setSavedResponse(existing);

    if (existing) {
      setResponse(existing.response);
      setIsEditing(false);
    } else {
      setResponse('');
      setIsEditing(false);
    }
  }, [prompt.id, date]);

  const wordCount = countWords(response);
  const hasChanges = savedResponse ? response !== savedResponse.response : response.length > 0;

  const handleSave = useCallback(async () => {
    if (!response.trim()) {
      toast({
        title: "Cannot save empty response",
        description: "Please write something before saving.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsSaving(true);

    try {
      const responseData: Omit<PromptResponse, 'createdAt' | 'updatedAt'> = {
        promptId: prompt.id,
        response: response.trim(),
        date,
        wordCount: countWords(response.trim())
      };

      saveResponse(responseData);

      // Reload the saved response
      const updated = getResponseForPrompt(prompt.id, date);
      setSavedResponse(updated);
      setIsEditing(false);

      toast({
        title: "Response saved!",
        description: `${wordCount} words saved for ${prompt.category}`,
        duration: 3000,
      });
    } catch {
      toast({
        title: "Failed to save",
        description: "There was an error saving your response. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSaving(false);
    }
  }, [response, prompt, date, wordCount, toast]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancel = useCallback(() => {
    if (savedResponse) {
      setResponse(savedResponse.response);
    } else {
      setResponse('');
    }
    setIsEditing(false);
  }, [savedResponse]);

  const handleDelete = useCallback(() => {
    if (!savedResponse) return;

    deleteResponse(prompt.id, date);
    setSavedResponse(null);
    setResponse('');
    setIsEditing(false);

    toast({
      title: "Response deleted",
      description: "Your response has been removed.",
      duration: 3000,
    });
  }, [savedResponse, prompt.id, date, toast]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">
              <FileText className="inline-block h-5 w-5 mr-2" />
              Your Response
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {formatDate(date)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {savedResponse && (
              <Badge variant="secondary">
                Saved • {savedResponse.wordCount} words
              </Badge>
            )}
            <Badge variant="outline">
              {wordCount} words
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder={`Write your thoughts about: "${prompt.text}"`}
            className="min-h-[200px] resize-y"
            disabled={!isEditing && !!savedResponse}
          />

          {wordCount > 0 && (
            <p className="text-xs text-muted-foreground">
              {wordCount} {wordCount === 1 ? 'word' : 'words'}
              {hasChanges && ' • Unsaved changes'}
            </p>
          )}
        </div>

        <div className="flex justify-between gap-2">
          <div className="flex gap-2">
            {!savedResponse || isEditing ? (
              <>
                <Button
                  onClick={handleSave}
                  disabled={isSaving || !response.trim()}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? 'Saving...' : 'Save Response'}
                </Button>

                {isEditing && (
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                )}
              </>
            ) : (
              <Button
                variant="outline"
                onClick={handleEdit}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Edit Response
              </Button>
            )}
          </div>

          {savedResponse && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          )}
        </div>

        {savedResponse && !isEditing && (
          <div className="text-xs text-muted-foreground pt-2 border-t">
            <p>
              Created: {new Date(savedResponse.createdAt).toLocaleString()}
              {savedResponse.updatedAt !== savedResponse.createdAt && (
                <span> • Updated: {new Date(savedResponse.updatedAt).toLocaleString()}</span>
              )}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}