export type InterviewQuestion = {
  id: string; // Уникальный ID для вопроса (UUID или просто инкремент)
  questionText: string; // Сам текст вопроса
  answer: string | null; // Ответ пользователя на этот вопрос (изначально null)
  feedback: string | null; // Фидбек от нейронки по этому ответу (изначально null)
  score: number | null; // Оценка от нейронки за этот вопрос (например, от 0 до 100)
  // Дополнительно можно добавить:
  // keywords: string[]; // Ключевые слова, ожидаемые в ответе (для нейронки)
  // suggestedAnswer: string | null; // Пример идеального ответа (для пользователя после фидбека)
};

// Основной тип для всего интервью
export type Interview = {
  id: string; // Уникальный ID для интервью
  userId: string; // ID пользователя, который проходит интервью
  jobRoleDescription: string; // Описание роли, на основе которой генерировались вопросы
  amountOfQuestions: number; // Запрошенное количество вопросов
  status: "pending" | "in_progress" | "completed" | "cancelled"; // Статус интервью
  createdAt: Date; // Дата создания
  updatedAt: Date; // Дата последнего обновления

  // Массив вопросов, сгенерированных для этого интервью
  questions: InterviewQuestion[];

  totalScore: number | null; // Общая оценка в процентах (например, среднее по вопросам)
  overallFeedback: string | null; // Общий фидбек от нейронки по всему интервью
};
