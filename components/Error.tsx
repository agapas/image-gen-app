interface Props {
  errorMessage: string;
  className?: string;
}

export const Error = ({ errorMessage, className = "" }: Props) => {
  return <div className={`error ${className}`}>{errorMessage}</div>;
};
