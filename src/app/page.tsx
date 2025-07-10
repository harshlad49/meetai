"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
 const onSubmit = () => {
  authClient.signUp.email(
    { email, password, name },
    {
      onError: (error) => {
        if (error?.response?.status === 422) {
          window.alert('This email is already registered. Please use a different one or log in.');
        } else {
          window.alert('Failed to create user');
        }
      },
      onSuccess: () => {
        window.alert('User created successfully');
        setEmail('');
        setPassword('');
        setName('');
      },
    }
  );
};
const onLogin = () => {
  authClient.signIn.email(
    { email, password },
    {
      onError: () => {
        window.alert('some thing went wrong');
      },
      onSuccess: () => {
        window.alert('Login successfully');
        setEmail('');
        setPassword('');
      },
    }
  );
};


    
  return (
    <div className="flex flex-col gap-y-10">
    <div className="p-4 flex flex-col gap-y-4">
      <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <Button onClick={onLogin}>
        Login
      </Button>
    </div>

    <div className="p-4 flex flex-col gap-y-4">
      <Input placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
      <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <Button onClick={onSubmit}>
       Create user
      </Button>
    </div>

    </div>
  );
}
