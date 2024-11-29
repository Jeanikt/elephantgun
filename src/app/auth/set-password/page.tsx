import { Suspense } from "react";
import SetPasswordForm from "./SetPasswordForm";

export default function SetPasswordPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center">
      <div className="w-full max-w-md p-8 border border-black dark:border-white">
        <h1 className="text-4xl font-mono mb-8 text-center">
          Set Your Password
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <SetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
