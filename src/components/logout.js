import React from "react";

export default function Logout() {

  const handleLogout = () => {
    clearJWTFromCookies();
    window.location.reload();
  };

  const clearJWTFromCookies = () => {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  return (
    <div className="ml-5 py-4 flex">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
