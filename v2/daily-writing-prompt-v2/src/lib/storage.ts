export interface PromptResponse {
  promptId: number;
  response: string;
  date: string; // ISO date string
  wordCount: number;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export interface WritingStreak {
  currentStreak: number;
  longestStreak: number;
  lastWriteDate: string | null; // ISO date string
  totalResponses: number;
}

const STORAGE_KEYS = {
  RESPONSES: 'daily-writing-prompt:responses',
  STREAK: 'daily-writing-prompt:streak'
} as const;

// Response storage functions
export function saveResponse(response: Omit<PromptResponse, 'createdAt' | 'updatedAt'>): void {
  const responses = getResponses();
  const now = new Date().toISOString();

  const existingIndex = responses.findIndex(
    r => r.promptId === response.promptId && r.date === response.date
  );

  if (existingIndex >= 0) {
    // Update existing response
    responses[existingIndex] = {
      ...response,
      createdAt: responses[existingIndex].createdAt,
      updatedAt: now
    };
  } else {
    // Create new response
    responses.push({
      ...response,
      createdAt: now,
      updatedAt: now
    });
  }

  localStorage.setItem(STORAGE_KEYS.RESPONSES, JSON.stringify(responses));
  updateStreak(response.date);

  // Trigger custom event for same-tab updates
  window.dispatchEvent(new CustomEvent('streakUpdated'));
}

export function getResponses(): PromptResponse[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.RESPONSES);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function getResponseForPrompt(promptId: number, date?: string): PromptResponse | null {
  const targetDate = date || new Date().toISOString().split('T')[0];
  const responses = getResponses();
  return responses.find(r => r.promptId === promptId && r.date === targetDate) || null;
}

export function getResponsesForDate(date: string): PromptResponse[] {
  const responses = getResponses();
  return responses.filter(r => r.date === date);
}

export function deleteResponse(promptId: number, date: string): void {
  const responses = getResponses();
  const filtered = responses.filter(r => !(r.promptId === promptId && r.date === date));
  localStorage.setItem(STORAGE_KEYS.RESPONSES, JSON.stringify(filtered));

  // Recalculate streak after deletion
  recalculateStreak();

  // Trigger custom event for same-tab updates
  window.dispatchEvent(new CustomEvent('streakUpdated'));
}

// Streak calculation functions
export function getStreak(): WritingStreak {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.STREAK);
    return stored ? JSON.parse(stored) : {
      currentStreak: 0,
      longestStreak: 0,
      lastWriteDate: null,
      totalResponses: 0
    };
  } catch {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastWriteDate: null,
      totalResponses: 0
    };
  }
}

function updateStreak(writeDate: string): void {
  const streak = getStreak();
  const responses = getResponses();

  // Update total responses count
  streak.totalResponses = responses.length;

  // Check if this is a new writing day
  if (streak.lastWriteDate === writeDate) {
    // Same day, no streak change
    localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak));
    return;
  }

  const yesterday = getYesterday();
  const today = new Date().toISOString().split('T')[0];

  if (writeDate === today) {
    // Writing today
    if (streak.lastWriteDate === yesterday) {
      // Continuing streak
      streak.currentStreak += 1;
    } else if (streak.lastWriteDate === null) {
      // First time writing
      streak.currentStreak = 1;
    } else {
      // Broke streak, restart
      streak.currentStreak = 1;
    }

    streak.lastWriteDate = writeDate;
    streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);
  }

  localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak));
}

function recalculateStreak(): void {
  const responses = getResponses();

  if (responses.length === 0) {
    const emptyStreak: WritingStreak = {
      currentStreak: 0,
      longestStreak: 0,
      lastWriteDate: null,
      totalResponses: 0
    };
    localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(emptyStreak));
    return;
  }

  // Get unique write dates, sorted chronologically
  const writeDates = Array.from(new Set(responses.map(r => r.date))).sort();

  let currentStreak = 0;
  let longestStreak = 0;
  let lastConsecutiveDate: string | null = null;

  const today = new Date().toISOString().split('T')[0];

  // Calculate streaks
  for (let i = 0; i < writeDates.length; i++) {
    const date = writeDates[i];
    const prevDate = i > 0 ? writeDates[i - 1] : null;

    if (prevDate === null) {
      // First date
      currentStreak = 1;
      lastConsecutiveDate = date;
    } else if (isConsecutiveDay(prevDate, date)) {
      // Consecutive day
      currentStreak += 1;
      lastConsecutiveDate = date;
    } else {
      // Gap in streak
      longestStreak = Math.max(longestStreak, currentStreak);
      currentStreak = 1;
      lastConsecutiveDate = date;
    }
  }

  longestStreak = Math.max(longestStreak, currentStreak);

  // Check if current streak is still active (wrote today or yesterday)
  const yesterday = getYesterday();
  const isStreakActive = lastConsecutiveDate === today || lastConsecutiveDate === yesterday;

  if (!isStreakActive) {
    currentStreak = 0;
  }

  const streak: WritingStreak = {
    currentStreak: isStreakActive ? currentStreak : 0,
    longestStreak,
    lastWriteDate: writeDates[writeDates.length - 1] || null,
    totalResponses: responses.length
  };

  localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak));
}

// Utility functions
function getYesterday(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
}

function isConsecutiveDay(date1: string, date2: string): boolean {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = d2.getTime() - d1.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays === 1;
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

// Initialize streak calculation on first load
export function initializeStorage(): void {
  // Ensure streak is properly calculated
  recalculateStreak();
}