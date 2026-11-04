import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  CircleHelp,
  FileCheck2,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";
import {
  FormProvider,
  useForm,
  type FieldErrors,
  type FieldPath,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  applicationSchema,
  type ApplicationValues,
} from "./schema/applicationSchema";
import {
  ApplicationStep,
  applicationFieldNames,
  EducationStep,
  ExperienceStep,
  getEducationFieldNames,
  getExperienceFieldNames,
  PersonalStep,
  ReviewStep,
} from "./steps/FormSteps";
import {
  submitApplication,
  type MockApiScenario,
} from "./api/mockApplicationApi";

const steps = [
  { label: "Personal", description: "About you" },
  { label: "Education", description: "Qualifications" },
  { label: "Experience", description: "Your background" },
  { label: "Application", description: "Role details" },
  { label: "Review", description: "Check & submit" },
];

const initialValues: ApplicationValues = {
  personal: {
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    city: "",
  },
  education: [
    {
      degree: "",
      institution: "",
      yearOfPassing: new Date().getFullYear(),
      percentage: 0,
    },
  ],
  experience: {
    experienceType: "fresher",
    availabilityToJoin: "",
  },
  application: {
    position: "",
    expectedJoiningDate: "",
    portfolioUrl: "",
    coverNote: "",
    acceptedTerms: false,
  },
};

function findFirstErrorPath(
  node: unknown,
  parentPath = "",
): FieldPath<ApplicationValues> | undefined {
  if (typeof node !== "object" || node === null) return undefined;

  if (
    "type" in node &&
    typeof node.type === "string" &&
    "message" in node &&
    typeof node.message === "string"
  ) {
    return parentPath as FieldPath<ApplicationValues>;
  }

  for (const [key, value] of Object.entries(node)) {
    if (key === "ref") continue;
    const path = parentPath ? `${parentPath}.${key}` : key;
    const result = findFirstErrorPath(value, path);
    if (result) return result;
  }

  return undefined;
}

function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <nav className="stepper" aria-label="Application progress">
      {steps.map((step, index) => {
        const complete = index < currentStep;
        const active = index === currentStep;
        return (
          <div
            className={`stepper-item${active ? " is-active" : ""}${complete ? " is-complete" : ""}`}
            key={step.label}
            aria-current={active ? "step" : undefined}
          >
            <span className="stepper-marker" aria-hidden="true">
              {complete ? <Check size={15} /> : index + 1}
            </span>
            <span className="stepper-copy">
              <span className="stepper-label">{step.label}</span>
              <span className="stepper-description">{step.description}</span>
            </span>
          </div>
        );
      })}
    </nav>
  );
}

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scenario, setScenario] = useState<MockApiScenario>("success");
  const [serverError, setServerError] = useState("");
  const [successReference, setSuccessReference] = useState("");
  const [focusOnMount, setFocusOnMount] =
    useState<FieldPath<ApplicationValues> | null>(null);

  const methods = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: initialValues,
    mode: "onTouched",
    reValidateMode: "onChange",
    shouldUnregister: false,
    shouldFocusError: true,
  });
  const { handleSubmit, trigger, getValues, setError, setFocus, reset } = methods;

  useEffect(() => {
    if (!focusOnMount) return;
    const frame = window.requestAnimationFrame(() => {
      setFocus(focusOnMount);
      setFocusOnMount(null);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [focusOnMount, setFocus]);

  const getCurrentStepFields = (): FieldPath<ApplicationValues>[] => {
    switch (currentStep) {
      case 0:
        return [
          "personal.fullName",
          "personal.email",
          "personal.phone",
          "personal.dateOfBirth",
          "personal.city",
        ];
      case 1:
        return getEducationFieldNames(getValues());
      case 2:
        return getExperienceFieldNames(getValues().experience);
      case 3:
        return applicationFieldNames;
      default:
        return [];
    }
  };

  const goToStep = async (target: number) => {
    if (target < currentStep) {
      setServerError("");
      setCurrentStep(target);
      return;
    }
    if (target !== currentStep + 1) return;

    const isValid = await trigger(getCurrentStepFields(), {
      shouldFocus: true,
    });
    if (isValid) {
      setServerError("");
      setCurrentStep(target);
    }
  };

  const onValid = async (values: ApplicationValues) => {
    setServerError("");
    setSuccessReference("");
    const result = await submitApplication(values, scenario);

    if (result.kind === "validation") {
      setError("personal.email", {
        type: "server",
        message: result.message,
      });
      setCurrentStep(0);
      setFocusOnMount("personal.email");
      return;
    }

    if (result.kind === "server-error") {
      setServerError(result.message);
      return;
    }

    setSuccessReference(result.reference);
  };

  const onInvalid = (errors: FieldErrors<ApplicationValues>) => {
    const invalidSection = Object.keys(errors)[0];
    const sectionToStep: Record<string, number> = {
      personal: 0,
      education: 1,
      experience: 2,
      application: 3,
    };
    const step = sectionToStep[invalidSection];
    if (step !== undefined) {
      setCurrentStep(step);
      const firstInvalidField = findFirstErrorPath(errors);
      if (firstInvalidField) setFocusOnMount(firstInvalidField);
    }
  };

  const startOver = () => {
    reset(initialValues);
    setCurrentStep(0);
    setServerError("");
    setSuccessReference("");
  };

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Northstar careers home">
          <span className="brand-mark">R</span>
          <span>RSL</span>
        </a>
        <a className="help-link" href="mailto:careers@example.com">
          <CircleHelp size={17} aria-hidden="true" />
          Need help?
        </a>
      </header>

      <div className="application-layout">

        <div className="form-column">
          <div className="form-heading">
            <div>
              <span className="form-eyebrow">JOB APPLICATION</span>
              <h2>Let’s get to know you</h2>
            </div>
            <span className="time-estimate">About 5 minutes</span>
          </div>

          <Stepper currentStep={currentStep} />

          <FormProvider {...methods}>
            <form
              className="form-card"
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
                if (currentStep === steps.length - 1) {
                  void handleSubmit(onValid, onInvalid)(event);
                } else {
                  void goToStep(currentStep + 1);
                }
              }}
            >
              {currentStep === 0 && <PersonalStep />}
              {currentStep === 1 && <EducationStep />}
              {currentStep === 2 && <ExperienceStep />}
              {currentStep === 3 && <ApplicationStep />}
              {currentStep === 4 && (
                <>
                  <ReviewStep onEditStep={setCurrentStep} />
                  <div className="scenario-control">
                    <label className="field-label" htmlFor="demo-scenario">
                      Submission response
                    </label>
                    <select
                      id="demo-scenario"
                      className="field-control field-select"
                      value={scenario}
                      onChange={(event) =>
                        setScenario(event.target.value as MockApiScenario)
                      }
                    >
                      <option value="success">Success</option>
                      <option value="validation">Server field validation error</option>
                      <option value="server-error">Server failure</option>
                    </select>
                    <span className="field-hint">
                      Demo control for trying each mock API response.
                    </span>
                  </div>
                </>
              )}

              {serverError && (
                <div className="server-error" role="alert">
                  <span className="server-error-icon">!</span>
                  <span>{serverError}</span>
                </div>
              )}
              {successReference && (
                <div className="success-message" role="status">
                  <CheckCircle2 size={20} aria-hidden="true" />
                  <span>
                    <strong>Application submitted!</strong>
                    <small>
                      Your reference number is {successReference}. We’ll be in
                      touch soon.
                    </small>
                  </span>
                </div>
              )}

              <div className="form-footer">
                <span className="required-note">
                  <span className="required-mark">*</span> Required fields
                </span>
                <div className="form-actions">
                  {currentStep > 0 && (
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => void goToStep(currentStep - 1)}
                    >
                      <ArrowLeft size={17} aria-hidden="true" />
                      Back
                    </button>
                  )}
                  {currentStep < steps.length - 1 ? (
                    <button
                      type="button"
                      className="primary-button"
                      onClick={() => void goToStep(currentStep + 1)}
                    >
                      Continue
                      <ArrowRight size={17} aria-hidden="true" />
                    </button>
                  ) : successReference ? (
                    <button
                      type="button"
                      className="primary-button"
                      onClick={startOver}
                    >
                      Start a new application
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="primary-button"
                      disabled={methods.formState.isSubmitting}
                    >
                      {methods.formState.isSubmitting ? (
                        <>
                          <LoaderCircle
                            className="spinner"
                            size={17}
                            aria-hidden="true"
                          />
                          Submitting…
                        </>
                      ) : (
                        <>
                          Submit application
                          <ArrowRight size={17} aria-hidden="true" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </FormProvider>

          <p className="form-footnote">
            Questions?{" "}
            <a href="mailto:careers@example.com">Contact our hiring team</a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
