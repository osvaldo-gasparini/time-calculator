export interface ParsedEntry {
  original: string;
  minutes: number;
  valid: boolean;
}

export interface ParseResult {
  entries: ParsedEntry[];
  total: number;
  isValid: boolean;
}

export function parseTimeEntry(entry: string): ParsedEntry {
  const trimmed = entry.trim();
  if (!trimmed) {
    return { original: entry, minutes: 0, valid: false };
  }

  // Remove extra spaces and normalize
  const normalized = trimmed.replace(/\s+/g, ' ').toLowerCase();
  
  // Pattern for "1:45 hr" or "1:45hr"
  const hourMinutePattern = /^(\d+):(\d{1,2})\s*hr?$/;
  
  // Pattern for "1 hr" or "1hr"
  const hourOnlyPattern = /^(\d+)\s*hr?$/;
  
  // Pattern for "30 min" or "30min"
  const minuteOnlyPattern = /^(\d+)\s*min?$/;

  let match;
  
  // Try hour:minute format first
  if ((match = normalized.match(hourMinutePattern))) {
    const hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    
    if (minutes >= 60) {
      return { original: entry, minutes: 0, valid: false };
    }
    
    return {
      original: entry,
      minutes: hours * 60 + minutes,
      valid: true
    };
  }
  
  // Try hour only format
  if ((match = normalized.match(hourOnlyPattern))) {
    const hours = parseInt(match[1]);
    return {
      original: entry,
      minutes: hours * 60,
      valid: true
    };
  }
  
  // Try minute only format
  if ((match = normalized.match(minuteOnlyPattern))) {
    const minutes = parseInt(match[1]);
    return {
      original: entry,
      minutes: minutes,
      valid: true
    };
  }
  
  return { original: entry, minutes: 0, valid: false };
}

export function parseTimeEntries(input: string): ParseResult {
  if (!input.trim()) {
    return { entries: [], total: 0, isValid: true };
  }
  
  // Split by newlines or commas
  const rawEntries = input
    .split(/[\n,]+/)
    .map(entry => entry.trim())
    .filter(entry => entry.length > 0);
  
  const entries = rawEntries.map(parseTimeEntry);
  const total = entries
    .filter(entry => entry.valid)
    .reduce((sum, entry) => sum + entry.minutes, 0);
  
  const isValid = entries.every(entry => entry.valid);
  
  return { entries, total, isValid };
}

export function formatTotalTime(totalMinutes: number): string {
  if (totalMinutes === 0) {
    return "0 min";
  }
  
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  if (hours === 0) {
    return `${minutes} min`;
  }
  
  if (minutes === 0) {
    return hours === 1 ? "1 hr" : `${hours} hrs`;
  }
  
  const hourText = hours === 1 ? "1 hr" : `${hours} hrs`;
  const minuteText = minutes === 1 ? "1 min" : `${minutes} mins`;
  
  return `${hourText} ${minuteText}`;
}