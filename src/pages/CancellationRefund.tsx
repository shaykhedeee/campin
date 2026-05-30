import LegalDoc from "../components/legal/LegalDoc";
import policy from "../content/legal/Cancellation_And_Refund_Policy.md?raw";

export default function CancellationRefund() {
  return <LegalDoc title="Cancellation & Refund Policy" updatedAt="2026-05-21" markdown={policy} />;
}

