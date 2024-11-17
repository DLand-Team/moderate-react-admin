'use client';

import { lazy, Suspense, useEffect, useState } from 'react';
export const EditorCom = lazy(() => import('./editor'));

export default (props: any) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <Suspense>
      <div>{isClient && <EditorCom {...props} />}</div>
    </Suspense>
  );
};
