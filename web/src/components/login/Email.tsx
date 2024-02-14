import { useState } from 'react';
import { z } from 'zod';

interface UserEntryProps {
  value: string;
  setValue: (newValue: string) => void;
  onSubmit: () => Promise<void>;
}

const createAuthCodeRequestSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
});

export default function Email({ value, setValue, onSubmit }: UserEntryProps) {
  const onEmailChange = (e: any) => {
    setValue(e.target.value);
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
    const result = createAuthCodeRequestSchema.safeParse({
      email: value,
    });
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
      await onSubmit();
    } catch (err: any) {
      setFetchState({
        isLoading: false,
        isError: true,
        error: 'Failed to send email. Please try again.',
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
        <p className="font-sans text-md">Enter your Email</p>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            value={value}
            onChange={onEmailChange}
            className="grow bg-transparent"
            placeholder="Email"
          />
        </label>
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
