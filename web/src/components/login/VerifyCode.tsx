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
      const error: Error = err;
      setFetchState({
        isLoading: false,
        isError: true,
        error: error.name,
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
        <input
          className="input"
          value={value}
          onChange={onCodeChange}
        />
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
