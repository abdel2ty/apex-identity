import type { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms of Service — Apex Identity",
  description: "Terms and conditions governing the use of Apex Identity services.",
};

export default function TermsPage() {
  return <TermsClient />;
}
