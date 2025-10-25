import { Interview, InterviewQuestion } from "../types/types";

const mockInterviewQuestions: InterviewQuestion[] = [
  {
    id: "q1",
    questionText:
      "What area challenged you the most in sales and how did you overcome it?",
    answer: null,
    feedback: null,
    score: null,
  },
  {
    id: "q2",
    questionText:
      "Describe a time you successfully closed a deal that initially seemed impossible.",
    answer: null,
    feedback: null,
    score: null,
  },
  {
    id: "q3",
    questionText:
      "How do you handle rejection or setbacks in the sales process?",
    answer: null,
    feedback: null,
    score: null,
  },
  {
    id: "q4",
    questionText:
      "What is your approach to building long-term relationships with clients?",
    answer: null,
    feedback: null,
    score: null,
  },
  {
    id: "q5",
    questionText: "How do you stay motivated and achieve your sales targets?",
    answer: null,
    feedback: null,
    score: null,
  },
];

export const mockInterviewData: Interview = {
  id: "int_sales_manager_123",
  userId: "user_abc",
  jobRoleDescription:
    "Sales Manager in a fast-paced SaaS environment, responsible for leading a team to exceed quarterly quotas and develop new business strategies.",
  amountOfQuestions: 5,
  status: "in_progress",
  createdAt: new Date("2024-06-12T10:00:00Z"),
  updatedAt: new Date("2024-06-12T11:00:00Z"),
  questions: mockInterviewQuestions,
  totalScore: null,
  overallFeedback: null,
};
