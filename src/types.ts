export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface FAQItem {
  question: string;
  answer: string;
}
