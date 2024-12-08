import { useSearchParams } from "react-router-dom";
import LoginForm from "../features/Auth/LoginForm";
import RegisterForm from "../features/Auth/RegisterForm";

const Auth = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    let authMode = Object.fromEntries(searchParams.entries());
    if (Object.keys(authMode).length === 0) authMode = { mode: "login" };

    return (
        <div className="col-start-3 col-end-8 flex flex-col gap-14 py-32">
            <div className="grid grid-cols-2 overflow-hidden rounded-2xl text-4xl">
                <button
                    className={`flex items-center justify-center bg-bg_brown-300 py-2 text-font-100 transition-colors hover:bg-bg_brown-300/80 ${authMode.mode === "login" ? "bg-bg_brown-300" : "bg-card-100"}`}
                    onClick={() =>
                        setSearchParams({ mode: "login" }, { replace: true })
                    }
                >
                    登入
                </button>
                <button
                    className={`flex items-center justify-center bg-bg_brown-300 py-2 text-font-100 transition-colors hover:bg-bg_brown-300/80 ${authMode.mode === "register" ? "bg-bg_brown-300" : "bg-card-100"}`}
                    onClick={() =>
                        setSearchParams({ mode: "register" }, { replace: true })
                    }
                >
                    註冊
                </button>
            </div>

            {authMode.mode === "login" ? (
                <LoginForm />
            ) : (
                authMode.mode === "register" && <RegisterForm />
            )}
        </div>
    );
};

export default Auth;
