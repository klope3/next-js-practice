import Link from "next/link";
import AuthButton from "./AuthButton.server";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/new">New</Link>
        </li>
        <li>
          <Link href="/categories">Categories</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
        <li>
          <Link href="/users">Users</Link>
        </li>
      </ul>
      <AuthButton />
    </nav>
  );
}
