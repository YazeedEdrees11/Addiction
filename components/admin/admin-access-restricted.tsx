import { SignOutButton } from "@/components/admin/sign-out-button";

export function AdminAccessRestricted() {
  return (
    <div className="container section-padding pt-36">
      <div className="glass-panel mx-auto max-w-xl p-8 text-center">
        <h1 className="font-heading text-3xl font-bold uppercase text-accent">Access Restricted</h1>
        <p className="mt-3 text-white/70">Your account is authenticated but not assigned as an admin.</p>
        <div className="mt-5 flex justify-center">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}

