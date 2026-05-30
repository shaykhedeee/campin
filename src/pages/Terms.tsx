import LegalDoc from "../components/legal/LegalDoc";
import terms from "../content/legal/Terms_Of_Service.md?raw";

export default function Terms() {
  return <LegalDoc title="Terms of Service" updatedAt="2026-05-21" markdown={terms} />;
}

