interface InfoProps {
  value: string;
  onSubmit: () => void;
}

export default function EmailSent({ value, onSubmit }: InfoProps) {
  return (
    <div className="flex flex-col p-4 h-full">
      <div className="w-full font-bold font-sans flex flex-row gap-2 items-center justify-center text-xl">
        Continue with
        <p className="text-accent">WDCC</p>
      </div>
      <div className="divider" />
      <div className="flex flex-col justify-center items-center gap-4">
        <p className="text-center">
          We just sent an email to{' '}
          <b className="text-accent font-sans">{value}</b>
        </p>
        <p className="text-center">Check your email!</p>
      </div>
      <div className="h-full flex flex-col justify-end">
        <div className="w-full flex flex-row justify-end">
          <button
            className="btn"
            onClick={onSubmit}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
