import { AxiosError } from 'axios';
import { useState } from 'react';
import { z } from 'zod';

export interface UserProfile {
  firstName: string;
  lastName?: string;
}

const createUserRequestSchema = z.object({
  firstName: z.string().min(2).max(40),
  lastName: z.string().min(2).max(40).optional(),
});

interface UserEntryProps {
  value: UserProfile;
  setValue: (newValue: UserProfile) => void;
  onSubmit: () => Promise<void>;
}

export default function Create({ value, setValue, onSubmit }: UserEntryProps) {
  const onFirstNameChange = (e: any) => {
    setValue({
      ...value,
      firstName: e.target.value,
    });
  };
  const onLastNameChange = (e: any) => {
    setValue({
      ...value,
      lastName: e.target.value,
    });
  };
  const [fetchState, setFetchState] = useState<{
    isLoading: boolean;
    isError: boolean;
    error?: string;
  }>({
    isLoading: false,
    isError: false,
  });

  const handleSubmit = async () => {
    const result = createUserRequestSchema.safeParse(value);
    if (!result.success) {
      setFetchState({
        isLoading: false,
        isError: true,
        error: result.error.issues[0].message,
      });
      return;
    }
    try {
      setFetchState({
        isLoading: true,
        isError: false,
      });
      // Sends axios request
      // On error will propogate to this
      await onSubmit();
    } catch (err: any) {
      const error: AxiosError = err;
      const errorResponse: string =
        (error?.response?.data as string) || 'Failed to create profile';
      setFetchState({
        isLoading: false,
        isError: true,
        error: errorResponse,
      });
    }
  };

  return (
    <div className="flex flex-col p-4 h-full">
      <div className="w-full font-bold font-sans flex flex-row gap-2 items-center justify-center text-xl">
        Continue with
        <p className="text-accent">WDCC</p>
      </div>
      <div className="divider" />
      <div className="flex flex-col gap-2">
        <p className="font-sans text-md">Enter your first name</p>
        <input
          className="input"
          value={value.firstName}
          onChange={onFirstNameChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-sans text-md">Enter your last name</p>
        <input
          className="input"
          value={value.lastName}
          onChange={onLastNameChange}
        />
        <p>{fetchState.error}</p>
      </div>
      <div className="h-full flex flex-col justify-end">
        <div className="w-full flex flex-row justify-end">
          <button
            className="btn"
            onClick={handleSubmit}
          >
            {fetchState.isLoading ? (
              <div className="loading loading-spinner loading-md"></div>
            ) : (
              'Next'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
