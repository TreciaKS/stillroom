export type HistoryItem = {
  entry: string;
  language?: string;
  reflection?: string;
  ts: number;
};

export interface ReflectionProps {
  text: string;
}