import { z } from "zod";

const today = () => {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
};

const validDate = z.string().date("Enter a valid date.");

const personalDetailsSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(100, "Name must be 100 characters or fewer.")
    .regex(/^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]*$/u, "Enter a valid name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s().-]{7,20}$/, "Enter a valid phone number."),
  dateOfBirth: validDate.refine((value) => {
    const birthDate = new Date(`${value}T00:00:00`);
    const cutoff = new Date();
    cutoff.setHours(0, 0, 0, 0);
    cutoff.setFullYear(cutoff.getFullYear() - 18);
    return birthDate <= cutoff;
  }, "You must be at least 18 years old."),
  city: z
    .string()
    .trim()
    .min(2, "Enter your current city.")
    .max(80, "City must be 80 characters or fewer."),
});

const educationSchema = z.object({
  degree: z.string().trim().min(2, "Enter your degree or qualification."),
  institution: z.string().trim().min(2, "Enter your institution."),
  yearOfPassing: z
    .number({ error: "Enter a year of passing." })
    .int("Enter a whole year.")
    .min(1950, "Year must be 1950 or later.")
    .max(new Date().getFullYear(), "Year cannot be in the future."),
  percentage: z
    .number({ error: "Enter your percentage." })
    .min(0, "Percentage cannot be below 0.")
    .max(100, "Percentage cannot be above 100."),
});

const previousCompanySchema = z
  .object({
    companyName: z.string().trim().min(2, "Enter the company name."),
    role: z.string().trim().min(2, "Enter your role."),
    fromDate: validDate,
    toDate: validDate,
  })
  .refine((company) => company.toDate > company.fromDate, {
    message: "End date must be after the start date.",
    path: ["toDate"],
  });

const experienceSchema = z.discriminatedUnion("experienceType", [
  z.object({
    experienceType: z.literal("fresher"),
    availabilityToJoin: z.string().min(1, "Choose when you can join."),
  }),
  z.object({
    experienceType: z.literal("experienced"),
    totalYears: z
      .number({ error: "Enter your total experience." })
      .min(0.1, "Enter at least 0.1 years.")
      .max(50, "Experience must be 50 years or less."),
    noticePeriod: z.string().min(1, "Choose your notice period."),
    previousCompanies: z
      .array(previousCompanySchema)
      .min(1, "Add at least one previous company."),
  }),
]);

const applicationDetailsSchema = z.object({
  position: z.string().min(1, "Choose a position."),
  expectedJoiningDate: validDate.refine((value) => value > today(), {
    message: "Expected joining date must be in the future.",
  }),
  portfolioUrl: z
    .string()
    .trim()
    .max(2048, "Portfolio link must be 2048 characters or fewer.")
    .refine(
      (value) => value === "" || z.string().url().safeParse(value).success,
      "Enter a valid URL, including https://.",
    ),
  coverNote: z
    .string()
    .trim()
    .max(1000, "Cover note must be 1000 characters or fewer."),
  acceptedTerms: z.boolean().refine((accepted) => accepted, {
    message: "You must accept the terms to apply.",
  }),
});

export const applicationSchema = z.object({
  personal: personalDetailsSchema,
  education: z.array(educationSchema).min(1, "Add at least one qualification."),
  experience: experienceSchema,
  application: applicationDetailsSchema,
});

export type ApplicationValues = z.infer<typeof applicationSchema>;
export type ExperienceValues = ApplicationValues["experience"];

export const positionOptions = [
  "Frontend Engineer",
  "Backend Engineer",
  "Product Designer",
  "Quality Assurance Engineer",
  "Data Analyst",
];
