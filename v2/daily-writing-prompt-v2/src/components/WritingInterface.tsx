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

      // Reload the saved response and update the text field to match exactly
      const updated = getResponseForPrompt(prompt.id, date);
      setSavedResponse(updated);
      if (updated) {
        setResponse(updated.response);
      }
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

    if (!window.confirm('Are you sure you want to delete this response? This action cannot be undone.')) {
      return;
    }

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
    // Parse the date string to avoid timezone issues
    const [year, month, day] = dateStr.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className={`w-full bg-[#2a2a2a] border-gray-700 ${className || ''}`}>
      <CardHeader className="border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-400" />
            <div>
              <CardTitle className="text-lg text-white font-medium">
                Your Response
              </CardTitle>
              <p className="text-sm text-gray-400 mt-0.5">
                {formatDate(date)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {savedResponse && !hasChanges && (
              <span className="text-sm text-green-400 bg-green-900/20 px-3 py-1 rounded-full border border-green-700">
                Saved
              </span>
            )}
            {hasChanges && (
              <span className="text-sm text-orange-400 bg-orange-900/20 px-3 py-1 rounded-full border border-orange-700">
                Unsaved
              </span>
            )}
            <span className="text-sm text-gray-300 bg-gray-800 px-3 py-1 rounded-full border border-gray-600">
              {wordCount} words
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder={`Write your thoughts about: "${prompt.text}"`}
            className="min-h-[200px] resize-y bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
            disabled={!isEditing && !!savedResponse}
          />

          {wordCount > 0 && (
            <p className="text-xs text-gray-400">
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
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? 'Saving...' : 'Save Response'}
                </Button>

                {isEditing && (
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                )}
              </>
            ) : (
              <Button
                variant="outline"
                onClick={handleEdit}
                className="flex items-center gap-2 bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700"
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
              className="flex items-center gap-2 bg-red-900/40 hover:bg-red-900/60 border-red-800"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          )}
        </div>

        {savedResponse && !isEditing && (
          <div className="text-xs text-gray-500 pt-2 border-t border-gray-700">
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