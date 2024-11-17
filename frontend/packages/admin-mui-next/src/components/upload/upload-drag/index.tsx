import { UploadProps } from '../types';
import { UploadDragMul } from './upload-drag-mul';
import { UploadDragSingle } from './upload-drag-single';
// ----------------------------------------------------------------------

export function UploadDrag({ multiple = false, ...rest }: UploadProps) {
  return <>{multiple ? <UploadDragMul {...rest} /> : <UploadDragSingle {...rest} />}</>;
}
