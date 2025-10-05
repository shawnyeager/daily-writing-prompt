import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Target, Calendar, PenTool } from 'lucide-react';
import { getStreak, initializeStorage, type WritingStreak } from '@/lib/storage';

interface StreakDisplayProps {
  className?: string;
}

export function StreakDisplay({ className }: StreakDisplayProps) {
  const [streak, setStreak] = useState<WritingStreak>({
    currentStreak: 0,
    longestStreak: 0,
    lastWriteDate: null,
    totalResponses: 0
  });

  useEffect(() => {
    // Initialize storage and load streak data
    initializeStorage();
    const currentStreak = getStreak();
    setStreak(currentStreak);

    // Listen for storage changes to update streak display
    const handleStorageChange = () => {
      const updatedStreak = getStreak();
      setStreak(updatedStreak);
    };

    window.addEventListener('storage', handleStorageChange);

    // Also listen for custom events when localStorage is updated from the same tab
    window.addEventListener('streakUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('streakUpdated', handleStorageChange);
    };
  }, []);

  const getStreakStatus = () => {
    if (streak.currentStreak === 0) {
      return {
        status: 'Start your streak!',
        description: 'Write your first response to begin',
        color: 'text-slate-500'
      };
    } else if (streak.currentStreak === 1) {
      return {
        status: 'Great start!',
        description: 'Keep going to build your streak',
        color: 'text-green-600'
      };
    } else if (streak.currentStreak < 7) {
      return {
        status: 'Building momentum!',
        description: 'You\'re on a roll',
        color: 'text-blue-600'
      };
    } else if (streak.currentStreak < 30) {
      return {
        status: 'Strong streak!',
        description: 'Excellent consistency',
        color: 'text-orange-600'
      };
    } else {
      return {
        status: 'Incredible streak!',
        description: 'You\'re a writing champion',
        color: 'text-red-600'
      };
    }
  };

  const { status, description, color } = getStreakStatus();

  const stats = [
    {
      icon: Flame,
      label: 'Current Streak',
      value: streak.currentStreak,
      suffix: streak.currentStreak === 1 ? 'day' : 'days',
      color: 'text-orange-500'
    },
    {
      icon: Target,
      label: 'Longest Streak',
      value: streak.longestStreak,
      suffix: streak.longestStreak === 1 ? 'day' : 'days',
      color: 'text-purple-500'
    },
    {
      icon: PenTool,
      label: 'Total Responses',
      value: streak.totalResponses,
      suffix: streak.totalResponses === 1 ? 'response' : 'responses',
      color: 'text-blue-500'
    },
    {
      icon: Calendar,
      label: 'Last Write',
      value: streak.lastWriteDate
        ? new Date(streak.lastWriteDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })
        : 'Never',
      suffix: '',
      color: 'text-green-500'
    }
  ];

  return (
    <Card className={`${className || ''}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Writing Streak
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-center">
          <div className={`text-2xl font-bold ${color}`}>
            {status}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
              >
                <Icon className={`h-4 w-4 mx-auto mb-1 ${stat.color}`} />
                <div className="text-lg font-semibold">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.suffix && `${stat.suffix} • `}{stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {streak.currentStreak > 0 && (
          <div className="text-center">
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20"
            >
              🔥 {streak.currentStreak} day{streak.currentStreak !== 1 ? 's' : ''} strong!
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}