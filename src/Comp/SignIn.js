import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/actions";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const authInstance = getAuth();

  const handleSignIn = async () => {
    try {
      setError(null); 
      const response = await signInWithEmailAndPassword(
        authInstance,
        email,
        password
      );

      dispatch(setUser(response.user));
      navigate("/Product/pro");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setError("Invalid email or password");
      } else {
        setError("Please fill the boxes");
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-96 mx-auto p-6 bg-slate-50 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        
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
        {error && (
          <div className="mb-4 text-red-500">
            <p>{error}</p>
          </div>
        )}
        <button
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handleSignIn}
        >
          Sign In
        </button>
        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/SignUp" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
