// src/app/not-found.tsx
'use client'; // Đảm bảo sử dụng client-side

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Chuyển hướng đến trang /error khi gặp lỗi 404
    router.push('/error');
  }, [router]);

  return null; // Không cần render gì, chỉ cần chuyển hướng
};

export default NotFoundPage;
