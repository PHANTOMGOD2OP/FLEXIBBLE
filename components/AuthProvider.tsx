"use client";
import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";
import Button from "./Button";
type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string>;
};
type Providers = Record<string, Provider>;
const AuthProvider = () => {
  const [providers, setProviders] = useState<Providers | null>(null);
  useEffect(() => {
    const fetchProvider = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProvider();
  }, []);
  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider: Provider, i) => (
          <Button
            key={i}
            title="sign in"
            handleClick={() => signIn(provider.id)}
          />
          // <button key={i} onClick={() => signIn(provider.id)}>
          //   {provider.id}
          // </button>
        ))}
      </div>
    );
  }
};

export default AuthProvider;
