"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import type {
  ApplicationInput,
  MonthlyRevenueRange,
  VentureCategory,
  VentureStage,
} from "@safari/shared";
import {
  Alert,
  Button,
  Input,
  Select,
  TextArea,
  type SelectOption,
} from "@safari/ui";

const categoryOptions: SelectOption[] = [
  { value: "agriculture", label: "Agriculture" },
  { value: "food_beverage", label: "Food & beverage" },
  { value: "fashion_textiles", label: "Fashion & textiles" },
  { value: "handcraft_decor", label: "Handcraft & decor" },
  { value: "cosmetics", label: "Cosmetics" },
  { value: "clean_energy", label: "Clean energy" },
  { value: "technology", label: "Technology" },
  { value: "services", label: "Services" },
  { value: "other", label: "Other" },
];

const stageOptions: SelectOption[] = [
  { value: "idea", label: "Idea — not yet selling" },
  { value: "pilot", label: "Pilot — testing with early customers" },
  { value: "operating", label: "Operating — steady sales" },
  { value: "growing", label: "Growing — expanding customers or products" },
  { value: "scaling", label: "Scaling — new markets or channels" },
];

const revenueOptions: SelectOption[] = [
  { value: "under_500k", label: "Under RWF 500,000 / month" },
  { value: "500k_2m", label: "RWF 500,000 – 2,000,000" },
  { value: "2m_10m", label: "RWF 2,000,000 – 10,000,000" },
  { value: "10m_50m", label: "RWF 10,000,000 – 50,000,000" },
  { value: "over_50m", label: "Over RWF 50,000,000" },
];

const programOptions: SelectOption[] = [
  { value: "Venture Accelerator", label: "Venture Accelerator" },
  { value: "Generative Enterprise Lab", label: "Generative Enterprise Lab" },
  { value: "The Hub Residency", label: "The Hub Residency" },
];

type SectionProps = {
  step: number;
  title: string;
  description: string;
  children: React.ReactNode;
};

function Section({ step, title, description, children }: SectionProps) {
  return (
    <section className="grid gap-6 border-t border-border pt-8 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-4">
        <div className="mb-2 inline-flex h-7 items-center rounded-full bg-accent/10 px-3 text-xs font-semibold uppercase tracking-wider text-accent">
          Step {step}
        </div>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <p className="mt-2 text-sm text-muted">{description}</p>
      </div>
      <div className="md:col-span-8">
        <div className="flex flex-col gap-5">{children}</div>
      </div>
    </section>
  );
}

type ApplicationFormProps = {
  founderName: string;
  founderEmail: string;
  onSubmit: (input: ApplicationInput) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
};

export function ApplicationForm({
  founderName,
  founderEmail,
  onSubmit,
  onCancel,
  submitLabel = "Save as draft",
}: ApplicationFormProps) {
  const [ventureName, setVentureName] = useState("");
  const [ventureSummary, setVentureSummary] = useState("");
  const [category, setCategory] = useState<VentureCategory | "">("");
  const [stage, setStage] = useState<VentureStage | "">("");
  const [location, setLocation] = useState("Rubavu, Rwanda");
  const [yearsOperating, setYearsOperating] = useState<string>("");
  const [teamSize, setTeamSize] = useState<string>("");
  const [monthlyRevenue, setMonthlyRevenue] = useState<
    MonthlyRevenueRange | ""
  >("");
  const [programInterest, setProgramInterest] = useState<string>(
    "Venture Accelerator",
  );
  const [motivation, setMotivation] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const input: ApplicationInput = {
        ventureName,
        ventureSummary,
        category: (category || undefined) as VentureCategory | undefined,
        stage: (stage || undefined) as VentureStage | undefined,
        location: location || undefined,
        yearsOperating: yearsOperating
          ? Number.parseInt(yearsOperating, 10)
          : undefined,
        teamSize: teamSize ? Number.parseInt(teamSize, 10) : undefined,
        monthlyRevenue:
          (monthlyRevenue || undefined) as MonthlyRevenueRange | undefined,
        programInterest: programInterest || undefined,
        motivation: motivation || undefined,
        contactPhone: contactPhone || undefined,
      };
      await onSubmit(input);
      setSuccess(true);
      setVentureName("");
      setVentureSummary("");
      setCategory("");
      setStage("");
      setYearsOperating("");
      setTeamSize("");
      setMonthlyRevenue("");
      setMotivation("");
      setContactPhone("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {success && (
        <Alert tone="success">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            <span>Draft saved. You can submit it for review anytime.</span>
          </div>
        </Alert>
      )}
      {error && <Alert tone="danger">{error}</Alert>}

      <Section
        step={1}
        title="Founder"
        description="Who is behind this venture? We pre-fill from your account."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Input label="Full name" value={founderName} readOnly />
          <Input label="Email" value={founderEmail} readOnly />
          <Input
            label="Phone (WhatsApp preferred)"
            name="contactPhone"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            placeholder="+250 7XX XXX XXX"
            autoComplete="tel"
          />
          <Input
            label="Where is the venture based?"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Rubavu, Rwanda"
          />
        </div>
      </Section>

      <Section
        step={2}
        title="Venture basics"
        description="A name, a category, and where the business stands today."
      >
        <Input
          label="Venture name"
          name="ventureName"
          value={ventureName}
          onChange={(e) => setVentureName(e.target.value)}
          required
          minLength={2}
          placeholder="e.g. Rubavu Roastery"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Select
            label="Category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as VentureCategory)}
            options={categoryOptions}
            placeholder="Select a category"
          />
          <Select
            label="Stage"
            name="stage"
            value={stage}
            onChange={(e) => setStage(e.target.value as VentureStage)}
            options={stageOptions}
            placeholder="Where is the business today?"
          />
        </div>
        <TextArea
          label="Short summary"
          name="ventureSummary"
          value={ventureSummary}
          onChange={(e) => setVentureSummary(e.target.value)}
          required
          minLength={10}
          rows={4}
          hint="One paragraph. What do you make or do, and for whom?"
          placeholder="We roast single-origin Rwandan coffee sourced from smallholder farms around Lake Kivu, then supply cafes and small shops in Rubavu."
        />
      </Section>

      <Section
        step={3}
        title="Business shape"
        description="Numbers help us understand where you are — approximations are fine."
      >
        <div className="grid gap-5 sm:grid-cols-3">
          <Input
            label="Years operating"
            name="yearsOperating"
            type="number"
            min={0}
            value={yearsOperating}
            onChange={(e) => setYearsOperating(e.target.value)}
            placeholder="e.g. 2"
          />
          <Input
            label="Team size"
            name="teamSize"
            type="number"
            min={0}
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            placeholder="e.g. 4"
          />
          <Select
            label="Monthly revenue"
            name="monthlyRevenue"
            value={monthlyRevenue}
            onChange={(e) =>
              setMonthlyRevenue(e.target.value as MonthlyRevenueRange)
            }
            options={revenueOptions}
            placeholder="Choose a range"
          />
        </div>
      </Section>

      <Section
        step={4}
        title="Program & motivation"
        description="Which program fits, and what would success look like for you?"
      >
        <Select
          label="Program of interest"
          name="programInterest"
          value={programInterest}
          onChange={(e) => setProgramInterest(e.target.value)}
          options={programOptions}
        />
        <TextArea
          label="Why Safari Strives, and what would you do with the support?"
          name="motivation"
          value={motivation}
          onChange={(e) => setMotivation(e.target.value)}
          rows={5}
          hint="Two to three sentences. Be honest about the specific gap you want us to help close."
          placeholder="I have consistent orders but no proper packaging or product photos. With the hub tools and mentor support I would build a clean product line and start selling into hotels."
        />
      </Section>

      <div className="sticky bottom-0 -mx-8 flex flex-col-reverse items-stretch gap-3 border-t border-border bg-background/95 px-8 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-end">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
