export interface Example {
  id: string;
  topic: string;
  question: string;
  answer: number;
  theoryKey: string;
  solution?: string;
  commonMistake?: string;
  subtype?: string;
}
