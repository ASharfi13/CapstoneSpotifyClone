import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      window.location.reload()
    }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault()

    const serverResponse = await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password"
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      window.location.reload()
    }
  }

  return (
    <div className="modalContainer">
      <form onSubmit={handleSubmit}
        className="modalForm"
      >
        <h1>Log In</h1>
        <div className="modalInput">
          <label className="modalLabel">
            Email
            <input
              className="modalInfo"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p className="errorMessages">{errors.email}</p>}
        </div>
        <div className="modalInput">
          <label className="modalLabel">
            Password
            <input
              className="modalInfo"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p className="errorMessages">{errors.password}</p>}
        </div>
        <button className="modalButton" onClick={handleDemoLogin}>Demo User</button>
        <button className="modalButton" type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
