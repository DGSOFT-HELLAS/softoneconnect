'use client';
import { useEffect } from 'react';
import ErrorTemplate from '@/app/_components/ErrorTemplate';
export default function Error({
  error,reset,}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service\
   
  }, [error]);
 
  return (
        <ErrorTemplate error={error} reset={reset} />
  );
}