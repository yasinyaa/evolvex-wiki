// EditableTitle.tsx
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Input } from './input';

type EditableTitleProps = {
  name: string;
};

const EditableTitle: React.FC<EditableTitleProps> = ({ name }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div>
      <Input
            {...register(name)}
            autoComplete="off"
            placeholder="untitled document"
            className={cn("text-lg font-bold placeholder-black uppercase bg-transparent outline-none w-full cursor-text shadow-none", error ? "border-1 border-red-900" : "border-none" )}
          />
      {error && (
        <p className='text-red-900 text-xs mt-2'>{error}</p>
      )}
    </div>
  );
};

export default EditableTitle;
