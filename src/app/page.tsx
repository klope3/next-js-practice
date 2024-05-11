import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <>
      <h1>Home</h1>
      <p>Welcome {session?.user?.email}</p>
    </>
  );
}
