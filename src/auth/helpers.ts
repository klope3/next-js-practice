"use server";
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "./index";

export async function signIn() {
  await nextAuthSignIn();
}

export async function signOut() {
  await nextAuthSignOut();
}
