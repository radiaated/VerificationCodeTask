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

// Type for the component's props
type TypeCodeVerficiation = {
  codeLength: number;
};

const CodeVerficiation = ({ codeLength }: TypeCodeVerficiation) => {
  // Code is stored using an array size of code's length where each code digit is stored at an index location of the array
  const [code, setCode] = useState<string[]>(Array(codeLength).fill(""));

  // Displays error message
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Stores the loading state of the form submission
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  // References each input elements

  const inputRef = useRef<{ [key: string]: HTMLInputElement }>({});

  // Handles the onChange event of each input element

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const targetName: string = event.target.name;

    // Sets the input's value to the last character of the original input value
    const newValue: string =
      event.target.value.length > 0
        ? event.target.value[event.target.value.length - 1]
        : "";

    setCode((state: string[]) => {
      let tempState = [...state];

      tempState[parseInt(targetName)] = newValue;

      return tempState;
    });

    // Focuses the next input element only if the currently focused element is not the last one and the value of the currently focuesed element is not empty

    if (parseInt(event.target.name) + 1 < codeLength && newValue.length > 0) {
      inputRef.current[+event.target.name + 1].focus();
    }
  };
  // Handles the onKeyDown event of each input element

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // When the "Backspace" key is pressed, and if the value of the currently focused elment is not empty and currently focused elment is not the first one then focus the previous element

    if (
      event.key === "Backspace" &&
      event.currentTarget.value.length === 0 &&
      +event.currentTarget.name > 0
    ) {
      inputRef.current[+event.currentTarget.name - 1].focus();
    }
  };

  // Handles the onPaste event of each input element

  const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    // Gets the currently focused element
    const currentInputIndex: number = +event.currentTarget.name;

    // Gets the clipboard data

    const clipboardString: string = event.clipboardData.getData("text/plain");

    // Set the input's code values
    setCode((state: string[]) => {
      let tempState = [...state];

      let j: number = 0;
      let i: number = currentInputIndex;

      // Sets the value from clipboard to each input element
      while (i < codeLength && j < clipboardString.length) {
        tempState[i] = clipboardString[j];
        j++;
        i++;
      }

      inputRef.current[i < codeLength ? i : codeLength - 1].focus();

      return tempState;
    });
  };

  // Handles the onSubmit event of each input element

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // Sends POST request to verify code
    await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/code/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        // Appending the code on the body of the POST request
        code: Array.from(Array(6).keys())
          .map((val) => code[val])
          .join(""),
      },
    })
      .then(() => {
        // On success response, redirects to "/success"
        navigate("/success");
      })
      .catch((error) => {
        // On error response, display error message
        if (error.status === 400) {
          setErrorMessage(error.response.data.detail);
        }
      });
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Verification</title>
      </Helmet>
      <div className="container">
        <div className="message">
          {errorMessage && (
            <span className="error-message">{errorMessage}</span>
          )}
          {loading && "Loading..."}
        </div>
        <h2>Verification code</h2>
        <form onSubmit={onSubmit} className="verifcation-code-form">
          <div className="verifcation-code-input-container">
            {code.map((item, ind) => (
              <VerificationInput
                key={ind}
                name={String(ind)}
                value={item}
                ref_={inputRef}
                onChange={onChange}
                onPaste={onPaste}
                onKeyDown={onKeyDown}
              />
            ))}
          </div>

          <input type="submit" value="Submit" disabled={loading} />
        </form>
      </div>
    </>
  );
};

export default CodeVerficiation;
