import React, {
  ChangeEvent,
  ClipboardEvent,
  KeyboardEvent,
  InputHTMLAttributes,
} from "react";

// Type for the component's props
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  value: string;
  name: string;
  ref_: React.MutableRefObject<{}>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPaste: (event: ClipboardEvent<HTMLInputElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
};
const VerificationInput = ({
  value,
  name,
  ref_,
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
          ref_.current = { ...ref_.current, [name]: el };
        }}
        onChange={onChange}
        onPaste={onPaste}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default VerificationInput;
