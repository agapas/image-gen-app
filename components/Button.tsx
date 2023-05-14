import { PropsWithChildren } from "react";

interface Props {
  disabled: boolean;
  onClick: () => Promise<void>;
}

export const Button = ({
  disabled,
  onClick,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <button type="button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
