import { AxiosError } from 'axios';
import { useState } from 'react';

interface UserEntryProps {
  value: string;
  setValue: (newValue: string) => void;
  onSubmit: () => Promise<void>;
}

export default function VerifyCode({
  value,
  setValue,
  onSubmit,
}: UserEntryProps) {
  const onCodeChange = (e: any) => {
    setValue(e.target.value.replace(/\D/g, '').slice(0, 6));
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
    try {
      await onSubmit();
    } catch (err: any) {
      const error: AxiosError = err;
      console.error(error);
      const errorResponse = 'failed to submit code';
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
        <p className="font-sans text-md">Enter your Code</p>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            className="grow bg-transparent"
            value={value}
            onChange={onCodeChange}
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
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
