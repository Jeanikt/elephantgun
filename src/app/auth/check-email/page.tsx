export default function CheckEmail() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center">
      <div className="w-full max-w-md p-8 border border-black dark:border-white">
        <h1 className="text-4xl font-mono mb-8 text-center">
          Check Your Email
        </h1>
        <p className="text-center">
          We've sent you an email with a link to set your password and complete
          your registration.
        </p>
      </div>
    </div>
  );
}
