import { BASE_PATH, auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import AuthButtonClient from "./AuthButton.client";

export default async function AuthButton() {
  const session = await auth();
  if (session && session.user) {
    //trim the data down to only email
    session.user = {
      email: session.user.email,
    };
  }

  return (
    <SessionProvider basePath={BASE_PATH} session={session}>
      <AuthButtonClient />
    </SessionProvider>
  );
}
