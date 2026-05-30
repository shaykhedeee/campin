import LegalDoc from "../components/legal/LegalDoc";
import privacy from "../content/legal/Privacy_Notice.md?raw";

export default function Privacy() {
  return <LegalDoc title="Privacy Notice" updatedAt="2026-05-21" markdown={privacy} />;
}

