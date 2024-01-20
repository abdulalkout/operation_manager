import { React, useState } from "react";
import "./AuthPage.css";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <main className="signup-login">
      <div>
        <h3 onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? (
            <>
              <i class="fa-solid fa-user-plus"></i> SignUp
            </>
          ) : (
            <>
              <i class="fa-solid fa-right-to-bracket"></i> LOG IN
            </>
          )}
        </h3>
      </div>
      {showLogin ? (
        <LoginForm setUser={setUser} />
      ) : (
        <SignUpForm setUser={setUser} />
      )}
    </main>
  );
}
