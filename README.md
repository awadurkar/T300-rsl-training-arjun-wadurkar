# Northstar Job Application

A five-step, accessible job-application wizard built with React, TypeScript,
React Hook Form, and Zod.

## Run locally

```bash
npm install
npm run dev
```

## Form architecture

- **Schema and types:** `src/schema/applicationSchema.ts` is the validation
  source of truth. It exports the complete Zod schema, the fresher/experienced
  discriminated union, and `ApplicationValues` inferred using `z.infer`.
- **Reusable fields:** `src/components/fields.tsx` provides shared text, select,
  textarea, and checkbox fields. Each field reads its own validation state
  through `useFormContext` and `useFormState`.
- **Wizard steps:** `src/steps/FormSteps.tsx` contains the step sections,
  `useFieldArray` lists, and review summary. Array rows use React Hook Form's
  stable `field.id` as their key.
- **Form state:** One `useForm` instance is created in `src/App.tsx` and shared
  with all mounted steps through `FormProvider`. `shouldUnregister: false`
  preserves values while steps and conditional experience fields are changed;
  values stay in React Hook Form and are not copied to another state store.
- **Mock API:** `src/api/mockApplicationApi.ts` waits 1.5 seconds and returns a
  success, field-validation error, or server error. The review step's
  “Submission response” selector makes each response easy to test.

## Validation and rendering decisions

The form uses `mode: "onTouched"` so errors do not crowd an untouched form, and
`reValidateMode: "onChange"` so a field responds immediately after its first
validation. Each Continue action validates only the current step with
`trigger` before advancing. The schema also validates relationships across
fields: applicants must be at least 18, a previous-company end date must follow
its start date, and the expected joining date must be in the future.

Re-rendering is kept local in several places:

1. Reusable inputs subscribe to their own field with `useFormState({ name })`,
   rather than subscribing to all form values.
2. The experience branch uses `useWatch` in a small step component, isolating
   fresher/experienced conditional rendering.
3. The review summary subscribes to values inside the review component; the
   entire wizard does not subscribe to `watch()` or re-render for every keystroke.

Validation errors are linked to controls, announced with `role="alert"`, and
invalid fields are focused on step validation and server-side field failure.
The wizard can be completed using the keyboard.

# Summary
Implements a responsive, keyboard-accessible job application flow with five steps: personal details, education, experience, application details, and review.

- Adds a Zod schema as the source of validation rules and inferred TypeScript types, including age, employment-date, and future joining-date checks.
- Uses one React Hook Form instance with step-by-step validation and preserved values when navigating between steps.
- Adds reusable field components and `useFieldArray` support for education and previous companies.
- Models fresher and experienced candidates as a discriminated union.
- Implements a 1.5-second mock API with distinct success, server validation, and server failure outcomes.

# Verification
- `npm run dev` 
- Browser-checked both experience paths, validation and correction, server failure, and successful submission.

# Denomstration