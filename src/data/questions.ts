import { Difficulty, GrammarCategory, Question } from "../types";

export const questions: Question[] = [
  {
    id: "1",
    sentence: "______ tired, she still finished the report on time.",
    options: [
      { id: "a", text: "Although" },
      { id: "b", text: "Because" },
      { id: "c", text: "Unless" },
      { id: "d", text: "If" }
    ],
    correctOptionId: "a",
    explanation: {
      correctAnswer: "Although",
      rule: "Although 引导让步状语从句，表示“尽管”。句子前半部分说“累”，后半部分说“按时完成了报告”，逻辑上是转折/让步关系。",
      example: "Although it was raining, they went out for a walk.",
      commonMistake: "误用 Because。Because 表示原因，逻辑不通。"
    },
    category: GrammarCategory.AdverbialClause,
    difficulty: Difficulty.Beginner
  },
  {
    id: "2",
    sentence: "The boy ______ is playing basketball over there is my brother.",
    options: [
      { id: "a", text: "which" },
      { id: "b", text: "who" },
      { id: "c", text: "whose" },
      { id: "d", text: "whom" }
    ],
    correctOptionId: "b",
    explanation: {
      correctAnswer: "who",
      rule: "who 引导定语从句，先行词是人（The boy），且在从句中作主语。",
      example: "The girl who won the race is my classmate.",
      commonMistake: "误用 which。which 的先行词通常是物。"
    },
    category: GrammarCategory.RelativeClause,
    difficulty: Difficulty.Beginner
  },
  {
    id: "3",
    sentence: "I don't know ______ he will come or not.",
    options: [
      { id: "a", text: "if" },
      { id: "b", text: "whether" },
      { id: "c", text: "that" },
      { id: "d", text: "what" }
    ],
    correctOptionId: "b",
    explanation: {
      correctAnswer: "whether",
      rule: "whether...or not 是固定搭配，表示“是否”。虽然 if 也可以表示“是否”，但在与 or not 直接连用时，通常使用 whether。",
      example: "I wonder whether it will rain tomorrow.",
      commonMistake: "误用 that。that 引导宾语从句时表示确定的事实，而不表示疑问。"
    },
    category: GrammarCategory.NounClause,
    difficulty: Difficulty.Intermediate
  },
  {
    id: "4",
    sentence: "______ the homework, the boy went out to play.",
    options: [
      { id: "a", text: "Finish" },
      { id: "b", text: "Finished" },
      { id: "c", text: "Finishing" },
      { id: "d", text: "Having finished" }
    ],
    correctOptionId: "d",
    explanation: {
      correctAnswer: "Having finished",
      rule: "非谓语动词作时间状语。动作“完成作业”发生在“出去玩”之前，且与主语“the boy”是主动关系，故用现在分词的完成式。",
      example: "Having seen the movie, I didn't want to see it again.",
      commonMistake: "误用 Finished。Finished 表示被动或完成的状态，但此处主语是动作的发出者。"
    },
    category: GrammarCategory.NonFiniteVerb,
    difficulty: Difficulty.Advanced
  },
  {
    id: "5",
    sentence: "This is the house ______ I lived ten years ago.",
    options: [
      { id: "a", text: "which" },
      { id: "b", text: "that" },
      { id: "c", text: "where" },
      { id: "d", text: "when" }
    ],
    correctOptionId: "c",
    explanation: {
      correctAnswer: "where",
      rule: "where 引导定语从句，先行词是地点（the house），且在从句中作地点状语（I lived there）。",
      example: "The school where I studied is very beautiful.",
      commonMistake: "误用 which。如果用 which，后面应该是 I lived in which。"
    },
    category: GrammarCategory.RelativeClause,
    difficulty: Difficulty.Intermediate
  },
  {
    id: "6",
    sentence: "______ by the news, he couldn't say a word.",
    options: [
      { id: "a", text: "Shocking" },
      { id: "b", text: "Shocked" },
      { id: "c", text: "To shock" },
      { id: "d", text: "Shock" }
    ],
    correctOptionId: "b",
    explanation: {
      correctAnswer: "Shocked",
      rule: "过去分词作状语，表示被动或状态。主语 he 与 shock 是被动关系（被消息震惊）。",
      example: "Frightened by the dog, the child cried.",
      commonMistake: "误用 Shocking。Shocking 通常形容事物令人震惊，如 The news is shocking。"
    },
    category: GrammarCategory.NonFiniteVerb,
    difficulty: Difficulty.Intermediate
  },
  {
    id: "7",
    sentence: "You won't pass the exam ______ you work hard.",
    options: [
      { id: "a", text: "if" },
      { id: "b", text: "unless" },
      { id: "c", text: "since" },
      { id: "d", text: "as" }
    ],
    correctOptionId: "b",
    explanation: {
      correctAnswer: "unless",
      rule: "unless 引导条件状语从句，相当于 if...not，表示“除非”。",
      example: "I'll go there unless it rains.",
      commonMistake: "误用 if。如果用 if，句子应为 if you don't work hard。"
    },
    category: GrammarCategory.AdverbialClause,
    difficulty: Difficulty.Beginner
  },
  {
    id: "8",
    sentence: "The sun ______ , they continued their journey.",
    options: [
      { id: "a", text: "setting" },
      { id: "b", text: "set" },
      { id: "c", text: "having set" },
      { id: "d", text: "was setting" }
    ],
    correctOptionId: "c",
    explanation: {
      correctAnswer: "having set",
      rule: "独立主格结构。The sun 与 set 是主动关系，且动作发生在“继续旅程”之前，故用现在分词的完成式。",
      example: "Night having come, we left the village.",
      commonMistake: "误用 was setting。独立主格结构中不能出现谓语动词形式。"
    },
    category: GrammarCategory.AbsoluteConstruction,
    difficulty: Difficulty.Advanced
  }
];
