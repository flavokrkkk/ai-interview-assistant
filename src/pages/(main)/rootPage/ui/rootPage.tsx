import { Sidebar } from "@/widgets/sidebar/ui/sidebar";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const RootPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          {/* Предполагаем, что у вас есть изображение лоадера */}
          <img
            alt="logo-suspense"
            src="/images/logo.jpg" // Убедитесь, что этот путь существует
            className="h-6 w-6 animate-ping rounded-sm"
          />
        </div>
      }
    >
      <div className="relative flex h-screen">
        {" "}
        {/* Добавляем flex и убираем absolute */}
        <Sidebar /> {/* Монтируем сайдбар */}
        <main className="flex-1 overflow-auto p-4">
          {" "}
          {/* main занимает оставшееся пространство */}
          <Outlet />
        </main>
      </div>
    </Suspense>
  );
};

export default RootPage;
