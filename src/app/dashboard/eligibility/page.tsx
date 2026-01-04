import { EligibilityForm } from '@/components/eligibility-form';

export default function EligibilityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Find Your Schemes</h1>
        <p className="text-muted-foreground">
          Answer a few questions to get personalized government scheme recommendations from our AI assistant.
        </p>
      </div>
      <EligibilityForm />
    </div>
  );
}
