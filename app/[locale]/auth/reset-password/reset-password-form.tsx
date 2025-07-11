'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft, CheckCircle, Shield } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from "next-intl";
import Link from 'next/link';

interface ResetPasswordFormProps {
  locale: string;
  token?: string;
}

export default function ResetPasswordForm({ locale, token }: ResetPasswordFormProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const t = useTranslations("auth.resetPassword");
  const tErrors = useTranslations("auth.errors");

  // 验证令牌
  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      setError(t('invalidToken'));
      return;
    }

    // 这里可以添加一个 API 调用来预验证令牌
    // 现在先假设有 token 就是有效的，在实际重置时验证
    setTokenValid(true);
  }, [token, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // 客户端验证
    if (!newPassword || !confirmPassword) {
      setError(tErrors('passwordRequired'));
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError(tErrors('passwordTooShort'));
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(tErrors('passwordMismatch'));
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          newPassword,
          locale,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        toast({
          title: t('successTitle'),
          description: t('successMessage'),
        });
      } else {
        if (data.error === 'Invalid or expired verification token') {
          setTokenValid(false);
          setError(t('tokenExpired'));
        } else {
          setError(data.error || tErrors('networkError'));
        }
      }
    } catch (error) {
      setError(tErrors('networkError'));
    } finally {
      setIsLoading(false);
    }
  };

  // 令牌无效状态
  if (tokenValid === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-red-100 dark:bg-red-900 p-3">
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              {t('invalidToken')}
            </CardTitle>
            <CardDescription>
              {t('tokenExpired')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-3">
              <Link
                href={`/${locale}/auth/forgot-password`}
                className="inline-flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {t('requestNewReset')}
              </Link>
              <Link
                href={`/${locale}/auth/login`}
                className="inline-flex items-center text-sm text-primary hover:underline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('backToLogin')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 成功状态
  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              {t('successTitle')}
            </CardTitle>
            <CardDescription>
              {t('successMessage')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-3">
              <Link
                href={`/${locale}/auth/login`}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {t('loginNow')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 重置密码表单
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {t('title')}
          </CardTitle>
          <CardDescription className="text-center">
            {t('subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">{t('newPassword')}</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder={t('newPasswordPlaceholder')}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={isLoading}
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder={t('confirmPasswordPlaceholder')}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !newPassword || !confirmPassword}
            >
              {isLoading ? t('resetting') : t('resetButton')}
            </Button>
          </form>

          <div className="text-center">
            <Link
              href={`/${locale}/auth/login`}
              className="inline-flex items-center text-sm text-primary hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('backToLogin')}
            </Link>
          </div>

          {/* 隐私政策和用户协议 */}
          <div className="text-center text-xs text-muted-foreground space-y-1">
            <p>{t('agreeToTerms')}</p>
            <div className="flex justify-center space-x-4">
              <Link
                href={`/${locale}/privacy`}
                className="text-primary hover:underline"
              >
                {t('privacyPolicy')}
              </Link>
              <span>•</span>
              <Link
                href={`/${locale}/terms`}
                className="text-primary hover:underline"
              >
                {t('termsOfService')}
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 