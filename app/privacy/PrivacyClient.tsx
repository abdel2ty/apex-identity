"use client";

import LegalPageShell from "@/components/LegalPageShell";
import { useLanguage } from "@/hooks/useLanguage";

export default function PrivacyClient() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <LegalPageShell
      titleAr="سياسة الخصوصية"
      titleEn="Privacy Policy"
      lastUpdatedAr="آخر تحديث: مارس 2026"
      lastUpdatedEn="Last updated: March 2026"
    >
      <div className={`space-y-10 text-apex-silver ${isAr ? "leading-loose" : "leading-relaxed"}`}>
        <Section
          headingAr="المعلومات التي نجمعها"
          headingEn="Information We Collect"
          isAr={isAr}
        >
          {isAr
            ? "نجمع المعلومات التي تقدمها طوعاً عند التسجيل في خدماتنا، التواصل معنا، أو التقدم لجلسة استراتيجية. تشمل هذه المعلومات: الاسم، البريد الإلكتروني، المسمى الوظيفي، ومعلومات مسيرتك المهنية."
            : "We collect information you voluntarily provide when registering for our services, contacting us, or applying for a strategy session. This includes: your name, email address, job title, and career background information."}
        </Section>

        <Section
          headingAr="حماية البيانات"
          headingEn="Data Protection"
          isAr={isAr}
        >
          {isAr
            ? "نطبق معايير أمان صارمة لحماية بياناتك. تُخزَّن معلوماتك على خوادم مؤمَّنة ونقيد الوصول إليها للموظفين المخولين فقط."
            : "We apply rigorous security standards to protect your data. Your information is stored on secured servers and access is restricted to authorized personnel only."}
        </Section>

        <Section
          headingAr="ملفات تعريف الارتباط"
          headingEn="Cookies"
          isAr={isAr}
        >
          {isAr
            ? "يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربتك وحفظ تفضيلاتك (مثل تفضيل اللغة). يمكنك تعطيل ملفات الارتباط في إعدادات متصفحك في أي وقت."
            : "Our website uses cookies to improve your experience and save your preferences (such as language preference). You may disable cookies in your browser settings at any time."}
        </Section>

        <Section
          headingAr="حقوقك"
          headingEn="Your Rights"
          isAr={isAr}
        >
          {isAr
            ? "لديك الحق في الوصول إلى بياناتك الشخصية، تصحيحها، أو طلب حذفها في أي وقت. للتواصل بشأن أي من هذه الطلبات، تفضل بالتواصل عبر صفحة الاتصال."
            : "You have the right to access, correct, or request deletion of your personal data at any time. To submit any such request, please reach out via our Contact page."}
        </Section>

        <Section
          headingAr="التواصل معنا"
          headingEn="Contact Us"
          isAr={isAr}
        >
          {isAr
            ? "لأي استفسارات تتعلق بسياسة الخصوصية، تواصل معنا عبر: ٠١٠٦٧٣٩٤٩٤٢ "
            : "For any privacy-related inquiries, contact us at: (+20) 01067394942"}
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
