import { useOkto } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import Button from "./button/button";

export default function Header({ text }: { text?: string | React.ReactNode }) {
  const { authenticate, showWidgetModal } = useOkto();
  const [authToken, setAuthToken] = useState(null);

  const handleGoogleLogin = async (credentialResponse: any) => {
    const idToken = credentialResponse.credential;
    authenticate(idToken, (authResponse: any, error: any) => {
      if (authResponse) {
        setAuthToken(authResponse.auth_token);
        console.log(
          "Authenticated successfully, auth token:",
          authResponse.auth_token
        );
      } else if (error) {
        console.error("Authentication error:", error);
      }
    });
  };

  const open = async () => {
    try {
      await showWidgetModal();
    } catch (error) {
      console.error("Failed to open widget modal", error);
    }
  };
  return (
    <div className="flex items-center gap-4">
      <Button
        className="!font-light !text-sm !bg-gradient-to-b !from-[#26262a] !to-[#16151a] !border !border-[#1e1e21] !min-w-16"
        label="Show Modal"
        onClick={open}
      />
      {!authToken ? (
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => console.error("Login Failed")}
        />
      ) : (
        <button onClick={showWidgetModal}>Show Widget Modal</button>
      )}
    </div>
  );
}
