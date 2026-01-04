import { EligibilityForm } from '@/components/eligibility-form';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">Manage your account and eligibility details to get personalized scheme recommendations.</p>
      </div>
      <EligibilityForm />
    </div>
  );
}
