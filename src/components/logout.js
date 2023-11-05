import React from "react";

const clearJWTFromCookies = () => {
  document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

export default function Logout({ onToken }) {

  const handleLogout = () => {
    clearJWTFromCookies();
    onToken();
  };

  return (
    <section className="ml-5 py-4 flex">
      <button onClick={handleLogout}>Logout</button>
    </section>
  );
}
