import { Badge, Button, Card } from "./Components";
import {
  cardDescription,
  cardHeading,
  componentGrid,
  exampleRow,
  librarySection,
  sectionDescription,
  sectionEyebrow,
  sectionTitle,
  themeClass,
} from "./styles.css";

export function ComponentLibraryDemo() {
  return (
    <section
      id="component-library"
      className={`${themeClass} ${librarySection}`}
    >
      <p className={sectionEyebrow}>EXERCISE 2 · VANILLA EXTRACT</p>
      <h2 className={sectionTitle}>Reusable component library</h2>
      <p className={sectionDescription}>
        Typed style variants and shared theme tokens, compiled to CSS at build
        time.
      </p>

      <div className={componentGrid}>
        <Card>
          <h3 className={cardHeading}>Button</h3>
          <p className={cardDescription}>
            Primary, secondary, and danger variants with small, medium, and
            large sizes.
          </p>
          <div className={exampleRow}>
            <Button size="small">Small</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger" size="large">
              Danger
            </Button>
            <Button disabled>Disabled</Button>
          </div>
        </Card>

        <Card>
          <h3 className={cardHeading}>Badge</h3>
          <p className={cardDescription}>
            Three clear status styles composed from a shared base.
          </p>
          <div className={exampleRow}>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </div>
        </Card>
      </div>
    </section>
  );
}
