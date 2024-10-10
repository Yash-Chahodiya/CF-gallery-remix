interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="flex justify-between items-center pt-1 text-red-400">
      <p className="text-xs">{message}</p>
    </div>
  );
};

export default ErrorMessage;
