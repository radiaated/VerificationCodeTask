# Engineering Test - 2.0 Verification Code Task

Live demo:
https://verification-code-task-app.vercel.app/

---

The project is a submission for an assignment.

##### Description

- Users can both manully enter the digits and paste the code from the clipboard.
- Only one digit is allowed per input, entering a digit should automatically focuses the browser on the next input.
- After entering the code and clicking submit, the application sends a POST request to the server and handles a success/error response.
- If the request results in an error, it displays a “Verification Error” message on the page
- If the request is successful, it redirects the user to /success route.
- Server rule: If the received code is not 6 digits long OR the last digit is 7, it returns an error. Otherwise, it treats the request as a success.

- Client-side validation: If any of the inputs is empty or contains a non-numeric value, the input is highlighted else the input highlight is removed.

#### Setup the project

The project is a mono-repo and can be set up using following steps:

Clone this repository

```shell
git clone https://github.com/radiaated/VerificationCodeTask
```

Go to the project root directory

```shell
cd VerificationCodeTask
```

Install the dependencies

```shell
npm i
```

Run the project

```shell
npm run app:dev
```

> **NOTE:** Client runs on localhost at port 5173 and server runs on localhost at port 8080.

#### Technology used:

- Frontend libraries
  - React with Vite
  - Typescript
  - React Router
  - Axios
- Backend libraries
  - Express
  - Nodemon
- Other node libraries: concurrently

---

THE END
