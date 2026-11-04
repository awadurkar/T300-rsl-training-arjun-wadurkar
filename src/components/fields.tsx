import { useId } from "react";
import {
  Controller,
  useFormContext,
  useFormState,
  type FieldPath,
} from "react-hook-form";
import type { ApplicationValues } from "../schema/applicationSchema";

type FieldName = FieldPath<ApplicationValues>;

type SharedFieldProps = {
  name: FieldName;
  label: string;
  hint?: string;
  required?: boolean;
};

type InputFieldProps = SharedFieldProps & {
  type?: "text" | "email" | "tel" | "date" | "url";
  placeholder?: string;
  autoComplete?: string;
};

function useFieldError(name: FieldName) {
  const { control, getFieldState } = useFormContext<ApplicationValues>();
  const formState = useFormState({ control, name });
  return getFieldState(name, formState).error;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <span className="field-error" id={id} role="alert">
      {message}
    </span>
  );
}

export function InputField({
  name,
  label,
  hint,
  required = false,
  type = "text",
  placeholder,
  autoComplete,
}: InputFieldProps) {
  const id = useId();
  const fieldError = useFieldError(name);
  const error = fieldError?.message;
  const { clearErrors, register } = useFormContext<ApplicationValues>();
  const registration = register(name);

  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>
        {label}
        {required && <span className="required-mark"> *</span>}
      </label>
      {hint && <span className="field-hint">{hint}</span>}
      <input
        {...registration}
        onChange={(event) => {
          if (fieldError) clearErrors(name);
          void registration.onChange(event);
        }}
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`field-control${error ? " field-control-error" : ""}`}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

type NumberFieldName =
  | `education.${number}.yearOfPassing`
  | `education.${number}.percentage`
  | "experience.totalYears";

type NumberFieldProps = Omit<SharedFieldProps, "name"> & {
  name: NumberFieldName;
  min?: number;
  max?: number;
  step?: number;
};

export function NumberField({
  name,
  label,
  hint,
  required = false,
  min,
  max,
  step,
}: NumberFieldProps) {
  const id = useId();
  const error = useFieldError(name)?.message;
  const { control } = useFormContext<ApplicationValues>();

  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>
        {label}
        {required && <span className="required-mark"> *</span>}
      </label>
      {hint && <span className="field-hint">{hint}</span>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            ref={field.ref}
            name={field.name}
            value={field.value ?? ""}
            onBlur={field.onBlur}
            onChange={(event) =>
              field.onChange(
                event.currentTarget.value === ""
                  ? Number.NaN
                  : event.currentTarget.valueAsNumber,
              )
            }
            id={id}
            type="number"
            min={min}
            max={max}
            step={step}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`field-control${error ? " field-control-error" : ""}`}
          />
        )}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

type SelectFieldProps = SharedFieldProps & {
  options: { value: string; label: string }[];
  placeholder?: string;
};

export function SelectField({
  name,
  label,
  hint,
  required = false,
  options,
  placeholder = "Select an option",
}: SelectFieldProps) {
  const id = useId();
  const error = useFieldError(name)?.message;
  const { register } = useFormContext<ApplicationValues>();

  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>
        {label}
        {required && <span className="required-mark"> *</span>}
      </label>
      {hint && <span className="field-hint">{hint}</span>}
      <select
        {...register(name)}
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`field-control field-select${error ? " field-control-error" : ""}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

type TextareaFieldProps = SharedFieldProps & {
  placeholder?: string;
  rows?: number;
  maxLength?: number;
};

export function TextareaField({
  name,
  label,
  hint,
  required = false,
  placeholder,
  rows = 4,
  maxLength,
}: TextareaFieldProps) {
  const id = useId();
  const error = useFieldError(name)?.message;
  const { register } = useFormContext<ApplicationValues>();

  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>
        {label}
        {required && <span className="required-mark"> *</span>}
      </label>
      {hint && <span className="field-hint">{hint}</span>}
      <textarea
        {...register(name)}
        id={id}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`field-control field-textarea${error ? " field-control-error" : ""}`}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function CheckboxField({ name, label }: SharedFieldProps) {
  const id = useId();
  const error = useFieldError(name)?.message;
  const { register } = useFormContext<ApplicationValues>();

  return (
    <div className="checkbox-field">
      <input
        {...register(name)}
        id={id}
        type="checkbox"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <div>
        <label htmlFor={id}>{label}</label>
        <FieldError id={`${id}-error`} message={error} />
      </div>
    </div>
  );
}
