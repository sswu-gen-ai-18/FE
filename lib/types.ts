export interface CustomerData {
  name: string;
  gender: string;
  age: number;
  callHistory: number;
}

export interface CallRecord {
  timestamp: string;
  transcript: string;
  emotion: string;
  aiResponse: string;
}

export interface EmotionAnalysis {
  emotion: 'angry' | 'sad' | 'frustrated' | 'neutral' | 'happy';
  confidence: number;
  keywords: string[];
}