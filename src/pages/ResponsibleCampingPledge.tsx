import LegalDoc from "../components/legal/LegalDoc";
import pledge from "../content/legal/Responsible_Camping_Pledge.md?raw";

export default function ResponsibleCampingPledge() {
  return <LegalDoc title="Responsible Camping Pledge" updatedAt="2026-05-21" markdown={pledge} />;
}

