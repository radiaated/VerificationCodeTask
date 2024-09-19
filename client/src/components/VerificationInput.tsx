import React, { ChangeEvent, ClipboardEvent, KeyboardEvent } from "react";

type InputProps = {
  value: string;
  name: string;
  inpRef: React.MutableRefObject<{}>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPaste: (event: ClipboardEvent<HTMLInputElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
};
const VerificationInput = ({
  value,
  name,
  inpRef,
  onChange,
  onPaste,
  onKeyDown,
}: InputProps) => {
  return (
    <div>
      <input
        type="text"
        style={
          /^\d+$/.test(value)
            ? { borderColor: "initial" }
            : { borderColor: "#dc3545" }
        }
        value={value}
        name={name}
        ref={(el) => {
          inpRef.current = { ...inpRef.current, [name]: el };
        }}
        onChange={onChange}
        onPaste={onPaste}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default VerificationInput;
