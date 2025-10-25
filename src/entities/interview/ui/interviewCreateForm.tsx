import { Form, FormField, FormItem } from "@/shared/ui/form/form";
import { FloatingLabelInput } from "@/shared/ui/input/floatingInputLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createInterviewSchema,
  CreateInterviewFormData,
} from "../lib/schemes/createInterviewSchema";
import { cn } from "@/shared/lib/mergeClass";
import { Button } from "@/shared/ui/button/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const questionOptions = [5, 10, 15, 20, 25, 30];

export const InterviewCreateForm = () => {
  const navigate = useNavigate();

  const [currentAmountOfQuestions, setCurrentAmountOfQuestions] = useState(10);
  const form = useForm<CreateInterviewFormData>({
    resolver: zodResolver(createInterviewSchema),
    defaultValues: {
      jobRoleDescription: "",
      amountOfQuestions: 20,
    },
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onSubmit = async (data: CreateInterviewFormData) => {
    console.log("Submitted data:", {
      ...data,
      amountOfQuestions: currentAmountOfQuestions,
    });
    navigate(`interview/1`);
  };

  return (
    <div className="relative text-white flex items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-3xl rounded-3xl p-8 py-12 space-y-8 text-center overflow-hidden">
        <h1 className="text-4xl font-extrabold mb-4 text-zinc-600">
          Создайте ваше интервью
        </h1>
        <p className="text-base text-gray-600 mx-auto mb-12">
          Просто выберите свою должность и отрасль или введите описание
          вакансии, затем укажите, на сколько вопросов вы хотели бы ответить.
          После этого начнется собеседование. Сохраняйте спокойствие и удачи!
        </p>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="text-left">
              <label
                htmlFor="jobRoleDescription"
                className="block text-gray-600 text-sm font-medium mb-3"
              >
                Должностная роль, отрасль или описание
              </label>
              <FormField
                control={form.control}
                name="jobRoleDescription"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FloatingLabelInput
                      {...field}
                      label="Введите здесь..."
                      labelClassName="text-zinc-600"
                      className={cn(
                        "py-2.5 bg-zinc-200 rounded-2xl border border-gray-300 text-zinc-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500",
                        errors.jobRoleDescription && "border-red-500"
                      )}
                    />
                    {errors.jobRoleDescription && (
                      <p className="text-red-500 text-sm mt-1 text-left">
                        {errors.jobRoleDescription.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="text-left">
              <label className="block text-gray-600 text-sm font-medium mb-3">
                Количество вопросов
              </label>
              <div className="flex flex-wrap gap-4 justify-center">
                {questionOptions.map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    onClick={() => setCurrentAmountOfQuestions(amount)}
                    className={cn(
                      "rounded-2xl p-7 text-lg font-semibold cursor-pointer",
                      currentAmountOfQuestions === amount
                        ? "bg-indigo-600/60 hover:bg-indigo-700/60 text-white shadow-lg"
                        : "bg-zinc-200 hover:bg-zinc-300 text-gray-700 border border-gray-300"
                    )}
                  >
                    {amount}
                  </Button>
                ))}
              </div>
              {errors.amountOfQuestions && (
                <p className="text-red-500 text-sm mt-3 text-left">
                  {errors.amountOfQuestions.message}
                </p>
              )}
            </div>

            <Button
              size="lg"
              disabled={!isValid}
              type="submit"
              className="mt-8 bg-indigo-600/60 hover:bg-indigo-700/60 text-white p-7 px-12 rounded-3xl cursor-pointer text-xl font-bold shadow-lg transition-all duration-200"
            >
              Создать
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
