import styles from "../styles/navbar.module.css";
import Link from "next/link";

interface NavbarProps {
  current: 'home' | 'user' | string; // Union type for specific values, or use 'string' for flexibility
}

export default function Navbar({ current }: NavbarProps) {
    return (
        <ul>
            <li>
                <Link href="/">Home page</Link>{" "}
                {current === "home" ? (
                    <span className={styles.current}>current page</span>
                ) : (
                    ""
                )}
            </li>
            <li>
                <Link href="/user">Products page</Link>{" "}
                {current === "user" ? (
                    <span className={styles.current}>current page</span>
                ) : (
                    ""
                )}
            </li>
        </ul>
    );
}