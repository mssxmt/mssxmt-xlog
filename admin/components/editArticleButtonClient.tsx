'use client';

import dynamic from 'next/dynamic';

const EditArticleButton = dynamic(() => import('./editArticleButton'), {
  ssr: false,
});

export default EditArticleButton;
