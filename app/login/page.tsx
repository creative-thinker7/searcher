import LoginForm from "./_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center pt-24">
      <div className="flex w-full max-w-md flex-col gap-y-4 rounded-lg bg-fetch-form-bg p-8 shadow-md">
        <h2 className="text-center text-lg font-bold">Log into Dog Search</h2>
        <LoginForm />
      </div>
    </div>
  );
}
