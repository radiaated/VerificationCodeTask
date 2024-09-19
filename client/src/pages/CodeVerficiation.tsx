import axios from "axios";
import {
  useRef,
  useState,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
  FormEvent,
} from "react";

import { Helmet } from "react-helmet-async";

import { useNavigate } from "react-router";

import VerificationInput from "../components/VerificationInput";

type TypeCodeVerficiation = {
  codeLength: number;
};

const CodeVerficiation = ({ codeLength }: TypeCodeVerficiation) => {
  const [code, setCode] = useState<string[]>(Array(codeLength).fill(""));

  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const inputRef = useRef<{ [key: string]: HTMLInputElement }>({});

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const targetName: string = event.target.name;
    const newValue: string =
      event.target.value.length > 0
        ? event.target.value[event.target.value.length - 1]
        : "";

    setCode((state: string[]) => {
      let tempState = [...state];

      tempState[parseInt(targetName)] = newValue;

      return tempState;
    });

    if (parseInt(event.target.name) + 1 < codeLength && newValue.length > 0) {
      inputRef.current[+event.target.name + 1].focus();
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === "Backspace" &&
      event.currentTarget.value.length === 0 &&
      +event.currentTarget.name > 0
    ) {
      inputRef.current[+event.currentTarget.name - 1].focus();
    }
  };

  const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const currentInputIndex: number = +event.currentTarget.name;

    const clipboardString: string = event.clipboardData.getData("text/plain");

    setCode((state: string[]) => {
      let tempState = [...state];

      let j: number = 0;

      for (
        let i: number = currentInputIndex;
        i < codeLength && j < clipboardString.length;
        i++
      ) {
        tempState[i] = clipboardString[j];
        j++;
      }

      return tempState;
    });
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
    axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/code/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        code: Array.from(Array(6).keys())
          .map((val) => code[val])
          .join(""),
      },
    })
      .then(() => {
        navigate("/success");
      })
      .catch((error) => {
        if (error.status === 400) {
          setErrorMessage(error.response.data.detail);
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>Verification</title>
      </Helmet>
      <div className="container">
        <div className="error-message">{errorMessage ?? errorMessage}</div>
        <h2>Verification code</h2>
        <form onSubmit={onSubmit} className="verifcation-code-form">
          <div className="verifcation-code-input-container">
            {code.map((item, ind) => (
              <VerificationInput
                key={ind}
                name={String(ind)}
                value={item}
                inpRef={inputRef}
                onChange={onChange}
                onPaste={onPaste}
                onKeyDown={onKeyDown}
              />
            ))}
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default CodeVerficiation;
