"use client";

import LegalPageShell from "@/components/LegalPageShell";
import { useLanguage } from "@/hooks/useLanguage";

export default function TermsClient() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <LegalPageShell
      titleAr="شروط الخدمة"
      titleEn="Terms of Service"
      lastUpdatedAr="آخر تحديث: مارس 2026"
      lastUpdatedEn="Last updated: March 2026"
    >
      <div className={`space-y-10 text-apex-silver`}>
        <Section headingAr="قبول الشروط" headingEn="Acceptance of Terms" isAr={isAr}>
          {isAr
            ? "باستخدام خدمات Apex Identity، فإنك توافق على هذه الشروط والأحكام. إذا كنت لا توافق على أي جزء منها، يُرجى عدم استخدام خدماتنا."
            : "By using Apex Identity's services, you agree to these terms and conditions. If you do not agree with any part of them, please do not use our services."}
        </Section>

        <Section headingAr="وصف الخدمات" headingEn="Description of Services" isAr={isAr}>
          {isAr
            ? "تقدم Apex Identity خدمات هندسة الهوية المهنية والتموضع في السوق. تشمل خدماتنا: مراجعة الهوية المهنية، تحسين السيرة الذاتية، تطوير ملف LinkedIn، إنشاء المواقع المهنية، واستراتيجية النمو المهني."
            : "Apex Identity provides professional identity engineering and market positioning services. Our services include: career identity audits, CV optimization, LinkedIn profile development, professional website creation, and career growth strategy."}
        </Section>

        <Section headingAr="الدفع والاسترداد" headingEn="Payment & Refunds" isAr={isAr}>
          {isAr
            ? "تُحدَّد الأسعار وفق الباقة المختارة ويُتفق عليها قبل بدء العمل. المدفوعات نهائية بعد بدء تقديم الخدمة. في حالة عدم رضاك، نلتزم بمراجعة العمل لضمان جودته وفق المعايير المتفق عليها."
            : "Pricing is package-based and agreed upon before work commences. Payments are final once service delivery has begun. In the event of dissatisfaction, we commit to reviewing the work to ensure it meets the agreed standards."}
        </Section>

        <Section headingAr="حقوق الملكية الفكرية" headingEn="Intellectual Property" isAr={isAr}>
          {isAr
            ? "جميع المخرجات المُقدَّمة لك (السيرة الذاتية، الموقع، المحتوى) هي ملكيتك الكاملة بعد إتمام الدفع. تحتفظ Apex Identity بالحق في استخدام مخرجات مجهولة الهوية كأمثلة في محفظة أعمالها ما لم تطلب خلاف ذلك."
            : "All deliverables provided to you (CV, website, content) are your full property upon payment completion. Apex Identity retains the right to use anonymized deliverables as portfolio examples unless you request otherwise."}
        </Section>

        <Section headingAr="حدود المسؤولية" headingEn="Limitation of Liability" isAr={isAr}>
          {isAr
            ? "لا تضمن Apex Identity الحصول على وظيفة أو ترقية محددة نتيجة خدماتها. نلتزم بتقديم أعلى جودة ممكنة من الاستراتيجية والتنفيذ، لكن النتائج تعتمد على عوامل متعددة خارج نطاق سيطرتنا."
            : "Apex Identity does not guarantee a specific job offer or promotion as a result of its services. We commit to delivering the highest possible quality of strategy and execution, but outcomes depend on multiple factors outside our control."}
        </Section>

        <Section headingAr="تعديل الشروط" headingEn="Amendments" isAr={isAr}>
          {isAr
            ? "تحتفظ Apex Identity بالحق في تعديل هذه الشروط في أي وقت. سيُخطَر العملاء الحاليون بأي تغييرات جوهرية. استمرار استخدام الخدمات بعد التغيير يُعدّ موافقة على الشروط المحدَّثة."
            : "Apex Identity reserves the right to modify these terms at any time. Current clients will be notified of any material changes. Continued use of services following a change constitutes acceptance of the updated terms."}
        </Section>
      </div>
    </LegalPageShell>
  );
}

function Section({
  headingAr,
  headingEn,
  isAr,
  children,
}: {
  headingAr: string;
  headingEn: string;
  isAr: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-5 bg-apex-gold/60 flex-shrink-0" />
        <h2 className={`text-apex-white ${isAr ? "text-lg font-bold" : "font-serif text-xl font-medium"}`}>
          {isAr ? headingAr : headingEn}
        </h2>
      </div>
      <p className={`text-apex-silver ${isAr ? "leading-loose" : "leading-relaxed"}`}>{children}</p>
    </div>
  );
}
