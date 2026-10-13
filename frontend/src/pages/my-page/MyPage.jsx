import React from 'react';
import { useAuth } from "../../context/AuthContext.jsx";

function MyPage() {
  const { user } = useAuth();

  console.log("login user: ", user);

  return (
    <div>MyPage</div>
  );
}

export default MyPage;
