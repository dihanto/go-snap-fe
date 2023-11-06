import React from "react";

const clearJWTFromCookies = () => {
  document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

export default function Logout({ onToken, onProfilePicture }) {

  const handleLogout = () => {
    clearJWTFromCookies();
    onToken();
    onProfilePicture(null);
  };

  return (
    <section className="ml-5 py-4 flex">
      <button onClick={handleLogout}>Logout</button>
    </section>
  );
}
