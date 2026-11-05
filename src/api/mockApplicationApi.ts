import type { ApplicationValues } from "../schema/applicationSchema";

export type MockApiScenario = "success" | "validation" | "server-error";

export type MockApiResult =
  | { kind: "success"; reference: string }
  | { kind: "validation"; message: string }
  | { kind: "server-error"; message: string };

export async function submitApplication(
  _application: ApplicationValues,
  scenario: MockApiScenario,
): Promise<MockApiResult> {
  await new Promise((resolve) => window.setTimeout(resolve, 1500));

  switch (scenario) {
    case "validation":
      return {
        kind: "validation",
        message: "That email address is already associated with an application.",
      };
    case "server-error":
      return {
        kind: "server-error",
        message:
          "We could not submit your application right now. Your information is saved; please try again.",
      };
    case "success":
      return {
        kind: "success",
        reference: `APP-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      };
  }
}
