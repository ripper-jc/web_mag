import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");

  const [pwd, setPwd] = useState("");

  const [email, setEmail] = useState("");

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/registration", {
        name: user,
        login: email,
        password: pwd,
        isBlacklist: false,
      });
      console.log(response);
      if (response.status === 200) {
        setSuccess(true);
      } else if (response.status === 202) {
        console.log("User already exists");
        setSuccess(true);
      }
    } catch (error) {
      if (!error) {
        console.log("WOOHOOOO");
      }
      console.error(error);
      errRef.current.textContent = "Registration failed. Please try again.";
    }
  };

  return (
    <>
      {success ? (
        <section className="form flex items-center">
          <h1>Success!</h1>
          <Link to="/">Main Page</Link>
        </section>
      ) : (
        <section className="form">
          <h1>Confirm account</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-describedby="uidnote"
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoComplete="off"
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              autoComplete="off"
              required
              aria-describedby="pwdnote"
            />

            <button>Confirm</button>
          </form>
        </section>
      )}
    </>
  );
};

export default Register;
