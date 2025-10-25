import { ButtonHTMLAttributes, PropsWithChildren, useState } from "react";
import { ChevronLeft, Mic, Play } from "lucide-react";
import { cn } from "@/shared/lib/mergeClass";
import { Interview } from "@/entities/interview/types/types";
import { mockInterviewData } from "@/entities/interview/lib/constants";

// Вспомогательный компонент для кнопки
const InterviewButton = ({
  children,
  className,
  onClick,
  ...props
}: { className: string; onClick?: VoidFunction } & PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

const InterviewPage = () => {
  const [currentInterview, setCurrentInterview] =
    useState<Interview>(mockInterviewData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = currentInterview.questions[currentQuestionIndex];

  const [isRecording, setIsRecording] = useState(false);
  const [isPlayback, setIsPlayback] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const maxTime = 3 * 60;

  // Функции для обработки действий (заглушки)
  const handleRecordToggle = () => {
    setIsRecording(!isRecording);
    // В реальном приложении здесь будет логика запуска/остановки записи аудио
  };

  const handlePlaybackToggle = () => {
    setIsPlayback(!isPlayback);
    // В реальном приложении здесь будет логика воспроизведения ответа
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentInterview.amountOfQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Сброс состояний для нового вопроса
      setIsRecording(false);
      setIsPlayback(false);
      setTimeElapsed(0);
    } else {
      // Это был последний вопрос, можно перейти к завершению/ревью
      alert("Интервью завершено! Переход к ревью.");
      // В реальном приложении здесь будет перенаправление или изменение статуса
    }
  };

  const handleEndAndReview = () => {
    if (
      window.confirm(
        "Вы уверены, что хотите завершить интервью и перейти к ревью?"
      )
    ) {
      // Логика завершения интервью и сохранения ответов
      alert("Интервью завершено и отправлено на ревью!");
      // В реальном приложении:
      // 1. Отправить все ответы на сервер для обработки фидбека и оценки.
      // 2. Перенаправить на страницу с результатами/ревью.
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(1, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      {/* Top Header Bar */}
      <div className="w-full max-w-7xl flex justify-between items-center py-4 px-6 bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center space-x-4">
          <img src="/logo.svg" alt="InterviewBoss Logo" className="h-8" />{" "}
          {/* Убедитесь, что у вас есть файл logo.svg */}
          <span className="text-xl font-bold text-gray-800 hidden md:block">
            InterviewBoss
          </span>
        </div>
        <div className="text-right text-gray-600 text-sm">
          <p className="font-semibold">
            {currentInterview.jobRoleDescription.split(",")[0] ||
              "Sales Manager Job Interview"}
          </p>
          <p className="text-xs">
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
            |{" "}
            {new Date().toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-3xl flex flex-col items-center">
        {/* Navigation and Actions */}
        <div className="w-full flex justify-between items-center mb-8">
          <InterviewButton className="text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 flex items-center space-x-2">
            <ChevronLeft size={18} />
            <span>Interview Generation</span>
          </InterviewButton>

          <span className="text-lg font-semibold text-gray-800 bg-white px-5 py-2 rounded-full shadow-sm border border-gray-200">
            Question {currentQuestionIndex + 1}
          </span>

          <InterviewButton
            onClick={handleEndAndReview}
            className="bg-red-500 hover:bg-red-600 text-white shadow-md"
          >
            End & Review
          </InterviewButton>
        </div>

        {/* Question Card */}
        <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            {currentQuestion?.questionText}
          </h2>

          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-gray-500 text-sm">
              {formatTime(timeElapsed)} / {formatTime(maxTime)}
            </p>

            {/* Mic/Play Button */}
            <button
              onClick={handleRecordToggle} // Или handlePlaybackToggle если ответ уже записан
              className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 transform",
                isRecording
                  ? "bg-red-500 hover:bg-red-600 text-white shadow-lg scale-105" // Запись
                  : currentQuestion.answer // Если ответ уже есть
                  ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg scale-100" // Воспроизведение
                  : "bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg scale-100" // Обычное состояние
              )}
            >
              {isRecording ? (
                <Mic size={48} className="animate-pulse" />
              ) : currentQuestion.answer ? (
                <Play size={48} /> // Иконка воспроизведения
              ) : (
                <Mic size={48} /> // Иконка микрофона
              )}
            </button>
          </div>
        </div>

        {/* Tips & Tricks / Next Question */}
        <div className="w-full flex justify-between items-end">
          <div className="w-2/3 bg-blue-100 border border-blue-200 text-blue-800 p-4 rounded-xl text-left shadow-sm">
            <p className="font-semibold mb-1">Tips & Tricks</p>
            <ul className="list-disc list-inside text-sm">
              <li>Listen carefully to the question.</li>
              <li>Structure your answer using STAR method.</li>
              <li>Be confident and clear.</li>
            </ul>
          </div>
          {/* Кнопка "Next Question" */}
          <InterviewButton
            onClick={handleNextQuestion}
            disabled={!currentQuestion.answer && !isRecording} // Кнопка активна, если есть ответ или не идёт запись
            className={cn(
              "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md text-lg px-6 py-3",
              !currentQuestion.answer &&
                !isRecording &&
                "opacity-50 cursor-not-allowed"
            )}
          >
            Next Question
          </InterviewButton>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-gray-500 text-sm">
        Made by interviewboss.ai
      </div>
    </div>
  );
};

export default InterviewPage;
