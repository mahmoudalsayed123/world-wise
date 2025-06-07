import styles from "./LoginPage.module.css";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { useContext, useEffect, useState } from "react";
import { AuthCotext } from "../App";
import { useNavigate } from "react-router-dom";

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

export default function Login() {
    const navigate = useNavigate();

    const { isAuth, login,user } = useContext(AuthCotext);
    // PRE-FILL FOR DEV PURPOSES
    const [email, setEmail] = useState(FAKE_USER.email);
    const [password, setPassword] = useState(FAKE_USER.password);

    function handleSubmit(e) {
        e.preventDefault();
        if (email && password) login(email, password);
    }

    useEffect(
        function () {
            if (isAuth) navigate("/app/cities", { replace: true });
        },
        [isAuth, navigate]
    );

    return (
        <main className={styles.login}>
            <Navbar />
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className={styles.row}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <div>
                    <Button
                        type="primary"
                        className={styles.ctaLink}
                        onClick={handleSubmit}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </main>
    );
}
