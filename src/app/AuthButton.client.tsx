"use client";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "@/auth/helpers";

export default function AuthButton() {
  const session = useSession();

  async function clickSignIn() {
    await signIn();
  }

  async function clickSignOut() {
    await signOut();
  }

  return session.data?.user ? (
    <button onClick={clickSignOut}>Sign Out {session.data.user.email}</button>
  ) : (
    <button onClick={clickSignIn}>Sign In</button>
  );
}
