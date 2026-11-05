import {
  useFieldArray,
  useFormContext,
  useWatch,
  type FieldPath,
} from "react-hook-form";
import {
  BriefcaseBusiness,
  GraduationCap,
  MapPin,
  Plus,
  Trash2,
  UserRound,
} from "lucide-react";
import {
  CheckboxField,
  InputField,
  NumberField,
  SelectField,
  TextareaField,
} from "../components/fields";
import {
  positionOptions,
  type ApplicationValues,
  type ExperienceValues,
} from "../schema/applicationSchema";

type StepProps = { onEditStep?: (step: number) => void };

export function PersonalStep() {
  return (
    <section className="step-content" aria-labelledby="personal-heading">
      <div className="section-heading">
        <span className="section-icon">
          <UserRound size={19} aria-hidden="true" />
        </span>
        <div>
          <h2 id="personal-heading">Personal details</h2>
          <p>Let’s start with a few details about you.</p>
        </div>
      </div>
      <div className="form-grid">
        <InputField
          name="personal.fullName"
          label="Full name"
          placeholder="e.g. Alex Morgan"
          autoComplete="name"
          required
        />
        <InputField
          name="personal.email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        <InputField
          name="personal.phone"
          label="Phone number"
          type="tel"
          placeholder="+1 (555) 000-0000"
          autoComplete="tel"
          required
        />
        <InputField
          name="personal.dateOfBirth"
          label="Date of birth"
          type="date"
          autoComplete="bday"
          required
        />
        <InputField
          name="personal.city"
          label="Current city"
          placeholder="e.g. San Francisco"
          autoComplete="address-level2"
          required
        />
      </div>
    </section>
  );
}

export function EducationStep() {
  const { control, getFieldState } = useFormContext<ApplicationValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });
  const arrayError = getFieldState("education").error?.message;

  return (
    <section className="step-content" aria-labelledby="education-heading">
      <div className="section-heading">
        <span className="section-icon">
          <GraduationCap size={20} aria-hidden="true" />
        </span>
        <div>
          <h2 id="education-heading">Education</h2>
          <p>Add your academic qualifications, starting with the most recent.</p>
        </div>
      </div>
      <div className="repeat-list">
        {fields.map((field, index) => (
          <article className="repeat-card" key={field.id}>
            <div className="repeat-card-heading">
              <span className="repeat-number">Qualification {index + 1}</span>
              {fields.length > 1 && (
                <button
                  type="button"
                  className="icon-button danger-button"
                  onClick={() => remove(index)}
                  aria-label={`Remove qualification ${index + 1}`}
                >
                  <Trash2 size={16} aria-hidden="true" />
                </button>
              )}
            </div>
            <div className="form-grid">
              <InputField
                name={`education.${index}.degree`}
                label="Degree or qualification"
                placeholder="e.g. B.S. Computer Science"
                required
              />
              <InputField
                name={`education.${index}.institution`}
                label="Institution"
                placeholder="e.g. State University"
                required
              />
              <NumberField
                name={`education.${index}.yearOfPassing`}
                label="Year of passing"
                min={1950}
                max={new Date().getFullYear()}
                step={1}
                required
              />
              <NumberField
                name={`education.${index}.percentage`}
                label="Percentage / score"
                min={0}
                max={100}
                step={0.01}
                required
              />
            </div>
          </article>
        ))}
      </div>
      {arrayError && (
        <span className="field-error" role="alert">
          {arrayError}
        </span>
      )}
      <button
        type="button"
        className="secondary-button add-button"
        onClick={() =>
          append({
            degree: "",
            institution: "",
            yearOfPassing: new Date().getFullYear(),
            percentage: 0,
          })
        }
      >
        <Plus size={17} aria-hidden="true" />
        Add qualification
      </button>
    </section>
  );
}

const availabilityOptions = [
  { value: "Immediately", label: "Immediately" },
  { value: "Within 2 weeks", label: "Within 2 weeks" },
  { value: "Within a month", label: "Within a month" },
  { value: "More than a month", label: "More than a month" },
];

const noticeOptions = [
  { value: "Immediate", label: "Immediate" },
  { value: "15 days", label: "15 days" },
  { value: "30 days", label: "30 days" },
  { value: "60 days", label: "60 days" },
  { value: "90 days", label: "90 days" },
  { value: "Other", label: "Other" },
];

function ExperienceDetails({ type }: { type: "fresher" | "experienced" }) {
  const { control, getFieldState } = useFormContext<ApplicationValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience.previousCompanies",
  });
  const arrayError = getFieldState(
    "experience.previousCompanies",
  ).error?.message;

  if (type === "fresher") {
    return (
      <div className="conditional-panel">
        <p className="panel-title">When would you be available to join?</p>
        <SelectField
          name="experience.availabilityToJoin"
          label="Availability to join"
          options={availabilityOptions}
          required
        />
      </div>
    );
  }

  return (
    <div className="conditional-panel">
      <div className="form-grid">
        <NumberField
          name="experience.totalYears"
          label="Total experience (years)"
          min={0.1}
          max={50}
          step={0.1}
          required
        />
        <SelectField
          name="experience.noticePeriod"
          label="Notice period"
          options={noticeOptions}
          required
        />
      </div>
      <div className="subsection-heading">
        <div>
          <h3>Previous companies</h3>
          <p>Add at least one company. Include your role and dates.</p>
        </div>
        <button
          type="button"
          className="secondary-button compact-button"
          onClick={() =>
            append({
              companyName: "",
              role: "",
              fromDate: "",
              toDate: "",
            })
          }
        >
          <Plus size={16} aria-hidden="true" />
          Add company
        </button>
      </div>
      <div className="repeat-list">
        {fields.map((field, index) => (
          <article className="repeat-card" key={field.id}>
            <div className="repeat-card-heading">
              <span className="repeat-number">Company {index + 1}</span>
              {fields.length > 1 && (
                <button
                  type="button"
                  className="icon-button danger-button"
                  onClick={() => remove(index)}
                  aria-label={`Remove company ${index + 1}`}
                >
                  <Trash2 size={16} aria-hidden="true" />
                </button>
              )}
            </div>
            <div className="form-grid">
              <InputField
                name={`experience.previousCompanies.${index}.companyName`}
                label="Company name"
                placeholder="e.g. Acme Inc."
                required
              />
              <InputField
                name={`experience.previousCompanies.${index}.role`}
                label="Your role"
                placeholder="e.g. Software Engineer"
                required
              />
              <InputField
                name={`experience.previousCompanies.${index}.fromDate`}
                label="From"
                type="date"
                required
              />
              <InputField
                name={`experience.previousCompanies.${index}.toDate`}
                label="To"
                type="date"
                required
              />
            </div>
          </article>
        ))}
      </div>
      {arrayError && (
        <span className="field-error" role="alert">
          {arrayError}
        </span>
      )}
    </div>
  );
}

export function ExperienceStep() {
  const type = useWatch({
    name: "experience.experienceType",
  });

  return (
    <section className="step-content" aria-labelledby="experience-heading">
      <div className="section-heading">
        <span className="section-icon">
          <BriefcaseBusiness size={19} aria-hidden="true" />
        </span>
        <div>
          <h2 id="experience-heading">Experience</h2>
          <p>Tell us where you are in your career.</p>
        </div>
      </div>
      <div className="form-grid single-column">
        <SelectField
          name="experience.experienceType"
          label="Which best describes you?"
          options={[
            { value: "fresher", label: "I'm a fresher" },
            { value: "experienced", label: "I have work experience" },
          ]}
          required
        />
      </div>
      {type && <ExperienceDetails type={type} />}
    </section>
  );
}

const positions = positionOptions.map((position) => ({
  value: position,
  label: position,
}));

export function ApplicationStep() {
  return (
    <section className="step-content" aria-labelledby="application-heading">
      <div className="section-heading">
        <span className="section-icon">
          <MapPin size={19} aria-hidden="true" />
        </span>
        <div>
          <h2 id="application-heading">Application details</h2>
          <p>Choose the role you’re applying for and share any extra context.</p>
        </div>
      </div>
      <div className="form-grid">
        <SelectField
          name="application.position"
          label="Position applied for"
          options={positions}
          required
        />
        <InputField
          name="application.expectedJoiningDate"
          label="Expected joining date"
          type="date"
          required
        />
        <div className="full-width">
          <InputField
            name="application.portfolioUrl"
            label="Portfolio or LinkedIn link"
            type="url"
            placeholder="https://"
            hint="Optional"
          />
        </div>
        <div className="full-width">
          <TextareaField
            name="application.coverNote"
            label="Cover note"
            hint="Optional · Up to 1000 characters"
            placeholder="A short note about why this role interests you..."
            maxLength={1000}
          />
        </div>
      </div>
      <div className="terms-box">
        <CheckboxField
          name="application.acceptedTerms"
          label="I confirm that the information provided is accurate and agree to the processing of my application."
          required
        />
      </div>
    </section>
  );
}

const formatDate = (value: string) => {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
};

const displayValue = (value: string | number | undefined) =>
  value === undefined || value === "" ? "—" : String(value);

function SummarySection({
  title,
  step,
  onEditStep,
  children,
}: {
  title: string;
  step: number;
  onEditStep?: (step: number) => void;
  children: React.ReactNode;
}) {
  return (
    <section className="summary-section">
      <div className="summary-section-heading">
        <h3>{title}</h3>
        {onEditStep && (
          <button
            type="button"
            className="text-button"
            onClick={() => onEditStep(step)}
          >
            Edit
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="summary-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export function ReviewStep({ onEditStep }: StepProps) {
  const values = useWatch<ApplicationValues>();
  const personal = values.personal;
  const education = values.education ?? [];
  const experience = values.experience;
  const application = values.application;

  return (
    <section className="step-content review-content" aria-labelledby="review-heading">
      <div className="section-heading">
        <span className="section-icon">
          <UserRound size={19} aria-hidden="true" />
        </span>
        <div>
          <h2 id="review-heading">Review your application</h2>
          <p>Take a moment to check everything before you submit.</p>
        </div>
      </div>

      <SummarySection title="Personal details" step={0} onEditStep={onEditStep}>
        <dl className="summary-grid">
          <SummaryRow label="Full name" value={displayValue(personal?.fullName)} />
          <SummaryRow label="Email" value={displayValue(personal?.email)} />
          <SummaryRow label="Phone" value={displayValue(personal?.phone)} />
          <SummaryRow
            label="Date of birth"
            value={formatDate(personal?.dateOfBirth ?? "")}
          />
          <SummaryRow label="City" value={displayValue(personal?.city)} />
        </dl>
      </SummarySection>

      <SummarySection title="Education" step={1} onEditStep={onEditStep}>
        <div className="summary-stack">
          {education.map((item, index) => (
            <div className="summary-item" key={`${item.degree}-${index}`}>
              <strong>{displayValue(item.degree)}</strong>
              <span>
                {displayValue(item.institution)} · {displayValue(item.yearOfPassing)} ·{" "}
                {displayValue(item.percentage)}%
              </span>
            </div>
          ))}
        </div>
      </SummarySection>

      <SummarySection title="Experience" step={2} onEditStep={onEditStep}>
        {experience?.experienceType === "fresher" ? (
          <dl className="summary-grid">
            <SummaryRow label="Experience" value="Fresher" />
            <SummaryRow
              label="Availability"
              value={displayValue(experience.availabilityToJoin)}
            />
          </dl>
        ) : experience?.experienceType === "experienced" ? (
          <>
            <dl className="summary-grid">
              <SummaryRow
                label="Total experience"
                value={`${displayValue(experience.totalYears)} years`}
              />
              <SummaryRow
                label="Notice period"
                value={displayValue(experience.noticePeriod)}
              />
            </dl>
            <div className="summary-stack company-summary">
              {(experience.previousCompanies ?? []).map((company, index) => (
                <div
                  className="summary-item"
                  key={`${company.companyName}-${index}`}
                >
                  <strong>{displayValue(company.role)}</strong>
                  <span>
                    {displayValue(company.companyName)} ·{" "}
                    {formatDate(company.fromDate ?? "")} –{" "}
                    {formatDate(company.toDate ?? "")}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </SummarySection>

      <SummarySection title="Application" step={3} onEditStep={onEditStep}>
        <dl className="summary-grid">
          <SummaryRow
            label="Position"
            value={displayValue(application?.position)}
          />
          <SummaryRow
            label="Expected joining date"
            value={formatDate(application?.expectedJoiningDate ?? "")}
          />
          {application?.portfolioUrl && (
            <SummaryRow label="Portfolio" value={application.portfolioUrl} />
          )}
        </dl>
        {application?.coverNote && (
          <p className="cover-note">“{application.coverNote}”</p>
        )}
      </SummarySection>
    </section>
  );
}

export function getEducationFieldNames(values: ApplicationValues) {
  return values.education.flatMap((_, index) => [
    `education.${index}.degree`,
    `education.${index}.institution`,
    `education.${index}.yearOfPassing`,
    `education.${index}.percentage`,
  ]) as FieldPath<ApplicationValues>[];
}

export function getExperienceFieldNames(
  experience: ExperienceValues,
): FieldPath<ApplicationValues>[] {
  if (experience.experienceType === "fresher") {
    return [
      "experience.experienceType",
      "experience.availabilityToJoin",
    ] as FieldPath<ApplicationValues>[];
  }

  return [
    "experience.experienceType",
    "experience.totalYears",
    "experience.noticePeriod",
    ...experience.previousCompanies.flatMap((_, index) => [
      `experience.previousCompanies.${index}.companyName`,
      `experience.previousCompanies.${index}.role`,
      `experience.previousCompanies.${index}.fromDate`,
      `experience.previousCompanies.${index}.toDate`,
    ]),
  ] as FieldPath<ApplicationValues>[];
}

export const applicationFieldNames: FieldPath<ApplicationValues>[] = [
  "application.position",
  "application.expectedJoiningDate",
  "application.portfolioUrl",
  "application.coverNote",
  "application.acceptedTerms",
];
