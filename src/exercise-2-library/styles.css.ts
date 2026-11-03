import {
  createTheme,
  createThemeContract,
  style,
  styleVariants,
} from "@vanilla-extract/css";

export const tokens = createThemeContract({
  color: {
    primary: null,
    primaryHover: null,
    onPrimary: null,
    secondary: null,
    secondaryHover: null,
    danger: null,
    dangerHover: null,
    onDanger: null,
    text: null,
    muted: null,
    surface: null,
    border: null,
    successBg: null,
    successText: null,
    warningBg: null,
    warningText: null,
    errorBg: null,
    errorText: null,
  },
  space: {
    small: null,
    medium: null,
    large: null,
  },
  radius: {
    control: null,
    card: null,
    pill: null,
  },
  shadow: {
    card: null,
  },
  font: {
    body: null,
  },
});

export const themeClass = createTheme(tokens, {
  color: {
    primary: "#087e72",
    primaryHover: "#06665d",
    onPrimary: "#ffffff",
    secondary: "#eef3f3",
    secondaryHover: "#e1eaea",
    danger: "#b42318",
    dangerHover: "#8f1d14",
    onDanger: "#ffffff",
    text: "#172b2a",
    muted: "#647577",
    surface: "#ffffff",
    border: "#e1e8e8",
    successBg: "#e8f7ef",
    successText: "#16734b",
    warningBg: "#fff4d6",
    warningText: "#8a5a00",
    errorBg: "#fde9e7",
    errorText: "#b42318",
  },
  space: {
    small: "0.5rem",
    medium: "1rem",
    large: "1.5rem",
  },
  radius: {
    control: "0.625rem",
    card: "1rem",
    pill: "999px",
  },
  shadow: {
    card: "0 8px 24px rgba(23, 43, 42, 0.06)",
  },
  font: {
    body: "Inter, ui-sans-serif, system-ui, sans-serif",
  },
});

export const librarySection = style({
  marginTop: "5rem",
  scrollMarginTop: "1.5rem",
});

export const sectionEyebrow = style({
  margin: 0,
  color: tokens.color.primary,
  fontSize: "0.875rem",
  fontWeight: 600,
  letterSpacing: "0.04em",
});

export const sectionTitle = style({
  margin: `${tokens.space.small} 0 0`,
  color: tokens.color.text,
  fontSize: "1.875rem",
  fontWeight: 600,
  letterSpacing: "-0.025em",
});

export const sectionDescription = style({
  margin: `${tokens.space.small} 0 0`,
  color: tokens.color.muted,
  lineHeight: 1.6,
});

export const componentGrid = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: tokens.space.large,
  marginTop: "1.5rem",
  "@media": {
    "screen and (min-width: 768px)": {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
  },
});

export const libraryCard = style({
  padding: tokens.space.large,
  border: `1px solid ${tokens.color.border}`,
  borderRadius: tokens.radius.card,
  background: tokens.color.surface,
  boxShadow: tokens.shadow.card,
  "@media": {
    "screen and (min-width: 768px)": {
      padding: "2rem",
    },
  },
});

export const cardHeading = style({
  margin: 0,
  color: tokens.color.text,
  fontSize: "1.125rem",
  fontWeight: 600,
});

export const cardDescription = style({
  margin: `${tokens.space.small} 0 0`,
  color: tokens.color.muted,
  fontSize: "0.875rem",
  lineHeight: 1.5,
});

export const exampleRow = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: tokens.space.small,
  marginTop: tokens.space.large,
});

export const buttonBase = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: tokens.space.small,
  border: "1px solid transparent",
  borderRadius: tokens.radius.control,
  fontFamily: tokens.font.body,
  fontWeight: 600,
  lineHeight: 1.25,
  cursor: "pointer",
  transition: "background-color 150ms ease, color 150ms ease, border-color 150ms ease",
  selectors: {
    "&:focus-visible": {
      outline: `3px solid ${tokens.color.primary}`,
      outlineOffset: "2px",
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },
});

export const buttonVariants = styleVariants({
  primary: {
    color: tokens.color.onPrimary,
    background: tokens.color.primary,
    selectors: {
      "&:hover:not(:disabled)": {
        background: tokens.color.primaryHover,
      },
    },
  },
  secondary: {
    color: tokens.color.text,
    background: tokens.color.secondary,
    borderColor: tokens.color.border,
    selectors: {
      "&:hover:not(:disabled)": {
        background: tokens.color.secondaryHover,
      },
    },
  },
  danger: {
    color: tokens.color.onDanger,
    background: tokens.color.danger,
    selectors: {
      "&:hover:not(:disabled)": {
        background: tokens.color.dangerHover,
      },
    },
  },
});

export const buttonSizes = styleVariants({
  small: {
    minHeight: "2rem",
    padding: "0.375rem 0.75rem",
    fontSize: "0.8125rem",
  },
  medium: {
    minHeight: "2.5rem",
    padding: "0.625rem 1rem",
    fontSize: "0.875rem",
  },
  large: {
    minHeight: "3rem",
    padding: "0.75rem 1.25rem",
    fontSize: "1rem",
  },
});

export const badgeBase = style({
  display: "inline-flex",
  alignItems: "center",
  borderRadius: tokens.radius.pill,
  padding: "0.375rem 0.75rem",
  fontSize: "0.8125rem",
  fontWeight: 600,
});

export const badgeVariants = styleVariants({
  success: {
    color: tokens.color.successText,
    background: tokens.color.successBg,
  },
  warning: {
    color: tokens.color.warningText,
    background: tokens.color.warningBg,
  },
  error: {
    color: tokens.color.errorText,
    background: tokens.color.errorBg,
  },
});
