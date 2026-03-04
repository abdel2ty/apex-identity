import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy — Apex Identity",
  description: "How Apex Identity collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
