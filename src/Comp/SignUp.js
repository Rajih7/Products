import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { setUser } from "../Redux/actions";
import { authInstance } from "../firebase";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const authInstance = getAuth();

  const handleSignUp = async () => {
    try {
      setError(null);

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      const response = await createUserWithEmailAndPassword(
        authInstance,
        email,
        password
      );
      const user = response.user;
      await updateProfile(user, { displayName });
      dispatch(setUser(user));
      navigate("/SignIn");
    } catch (error) {
      console.log(error.code)
      if (error.code === "auth/email-already-in-use") {
        setError("Email is already in use. Please sign in instead.");
      }
      else if (error.code ==="auth/weak-password") {
        setError("Password is too weak")
      } 
      else{
        setError("Fill all the boxes before sign up")
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-96 mx-auto p-6 bg-slate-50 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="mb-4 text-red-500">
          <p>{error}</p>
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
