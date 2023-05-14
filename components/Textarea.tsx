interface Props {
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  error?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea = ({
  disabled,
  label = "Write something:",
  placeholder,
  error,
  value = "",
  onChange,
}: Props) => {
  return (
    <div className="textarea-with-label">
      <label htmlFor="prompt-input">{label}</label>
      <textarea
        id="prompt-input"
        className={error ? "has-error" : ""}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
      {error ? <div className="value-error">{error}</div> : null}
    </div>
  );
};
