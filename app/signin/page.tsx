import { SignInForm } from "@components/signin/SignInForm";

export const dynamic = "force-dynamic";

export default async function SignInPage() {
  return (
    <div className="p-4 border border-zinc-700">
      <SignInForm />
    </div>
  );
}
