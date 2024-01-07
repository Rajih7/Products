import React from "react";
import { Link } from "react-router-dom";

const Header = ({ user }) => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="space-x-4">
          <Link to="/Product/pro" className="hover:text-gray-300">
            Products
          </Link>
          <Link to="/counter" className="hover:text-gray-300">
            Counter
          </Link>
        </div>
          <div className="flex items-center">
            <p className="text-sm mr-4">Welcome, <b>{user.displayName}</b>!</p>
            <Link to="/" className="hover:text-red-500">
              Signout
            </Link>
          </div>
      </nav>
    </header>
  );
};

const Footer = ({ user }) => {
  const userEmail = user ? user.email : null;

  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
          <p className="text-sm">Logged in as: {userEmail}</p>
      </div>
    </footer>
  );
};

export { Header, Footer };
