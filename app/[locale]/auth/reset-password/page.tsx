import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import ResetPasswordForm from "./reset-password-form";

interface ResetPasswordPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
}

export async function generateMetadata({ params }: ResetPasswordPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth.resetPassword" });
  
  return {
    title: t('pageTitle'),
  };
}

export default async function ResetPasswordPage({ params, searchParams }: ResetPasswordPageProps) {
  const { locale } = await params;
  const { token } = await searchParams;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm locale={locale} token={token} />
    </Suspense>
  );
} 