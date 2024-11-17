import { lazy } from 'react';
import { EditorType } from './editor';
export * from './types';
export const Editor: EditorType = lazy(() => import('./lazy')) as EditorType;
