import type { Metadata } from 'next';
import '@/styles/global.css';
import { LoaderProvider } from '@/layout/loader-provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Orisuun',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <LoaderProvider>{children}</LoaderProvider>
      </body>
    </html>
  );
}