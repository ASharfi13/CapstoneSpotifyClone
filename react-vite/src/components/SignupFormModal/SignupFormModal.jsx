import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        first_name: firstName,
        last_name: lastName,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="modalContainer">
      <form
        onSubmit={handleSubmit}
        className="modalForm"
      >
        <h1>Sign Up</h1>
        {errors.server && <p className="modalSignLogErrors">{errors.server}</p>}
        <label className="signUpModalInput">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="modalInfo"
          />
        </label>
        {errors.email && <p className="modalSignLogErrors">{errors.email}</p>}
        <label className="signUpModalInput">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="modalInfo"
          />
        </label>
        {errors.username && <p className="modalSignLogErrors">{errors.username}</p>}
        <label className="signUpModalInput">
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="modalInfo"
          />
        </label>
        {errors.first_name && <p className="modalSignLogErrors">{errors.first_name}</p>}
        <label className="signUpModalInput">
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="modalInfo"
          />
        </label>
        {errors.last_name && <p className="modalSignLogErrors">{errors.last_name}</p>}
        <label className="signUpModalInput">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="modalInfo"
          />
        </label>
        {errors.password && <p className="modalSignLogErrors">{errors.password}</p>}
        <label className="signUpModalInput">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="modalInfo"
          />
        </label>
        {errors.confirmPassword && <p className="modalSignLogErrors">{errors.confirmPassword}</p>}
        <button className="modalButton" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
