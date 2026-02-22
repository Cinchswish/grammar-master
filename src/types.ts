export enum Difficulty {
  Beginner = "初级",
  Intermediate = "中级",
  Advanced = "高级"
}

export enum GrammarCategory {
  RelativeClause = "定语从句",
  AdverbialClause = "状语从句",
  NonFiniteVerb = "非谓语动词",
  Conjunction = "连词",
  NounClause = "名词性从句",
  AbsoluteConstruction = "独立主格"
}

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  sentence: string; // Use "____" as placeholder
  options: Option[];
  correctOptionId: string;
  explanation: {
    rule: string;
    correctAnswer: string;
    example: string;
    commonMistake: string;
  };
  category: GrammarCategory;
  difficulty: Difficulty;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<string, string>; // questionId -> optionId
  isSubmitted: boolean;
  score: number;
}
