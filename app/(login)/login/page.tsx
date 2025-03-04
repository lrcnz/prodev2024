'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Label } from '@radix-ui/react-label';
import { CircleX, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import * as yup from 'yup';

import { useUserLogin } from '@/hooks/useUserLogin';
import { Button } from '@/ui-components/Button';
import { Card, CardContent, CardFooter } from '@/ui-components/Card';
import { ErrorAlert } from '@/ui-components/ErrorAlert';
import { Input } from '@/ui-components/Input';
import { Loading } from '@/ui-components/Loading';

const formSchema = yup.object({
  email: yup.string().email('Please enter a valid email.').required('Email required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password required'),
});

type FormType = yup.InferType<typeof formSchema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(formSchema),
  });
  const { loginMutation } = useUserLogin();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (data: FormType) => {
    if (loginMutation.isPending) return;

    try {
      const res = await loginMutation.mutateAsync(data);

      if (res.error) {
        setErrorMsg(res.error?.message || 'Unknown error');
        return;
      }

      router.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Loading open={loginMutation.isPending} />
      <ErrorAlert message={errorMsg} open={!!errorMsg} onClose={() => setErrorMsg(null)} />
      <header className="h-14 flex justify-center items-center ">
        <div className="text-lg font-semibold relative w-full flex items-center justify-center">
          <div className="absolute left-4">
            <Link href="/">
              <X />
            </Link>
          </div>
        </div>
      </header>
      <div className="px-4 text-2xl font-medium">Log in</div>
      <div className="flex justify-center mt-4">
        <Card className="w-full rounded-none border-none shadow-none space-y-1.5">
          <CardContent>
            <form className="space-y-4">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label className="text-base" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    className="text-lg h-12 rounded-xl"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register('email')}
                  />
                  {errors.email?.message && (
                    <div className="text-red-600 text-xs flex items-center gap-1 ml-1">
                      <CircleX size="14" className="translate-y-[-1px]" />
                      {errors.email?.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label className="text-base" htmlFor="Password">
                    Password
                  </Label>
                  <Input
                    className="text-lg h-12 rounded-xl"
                    id="Password"
                    type="password"
                    placeholder="Enter your password"
                    {...register('password')}
                  />
                  {errors.password?.message && (
                    <div className="text-red-600 text-xs flex items-center gap-1 ml-1">
                      <CircleX size="14" className="translate-y-[-1px]" />
                      {errors.password?.message}
                    </div>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="w-full">
              <Button onClick={handleSubmit(onSubmit)} type="submit" className="w-full h-10 rounded-xl">
                Log in
              </Button>
            </div>
            <div className="mt-4 text-muted-foreground">
              Don&apos;t have an account?
              <Link className="ml-2 text-secondary underline" href="/addaccount">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
