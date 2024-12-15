import { useSearchParams } from "react-router-dom";
import LoginForm from "../features/Auth/LoginForm";
import RegisterForm from "../features/Auth/RegisterForm";
import NavigateTabs from "../features/Auth/NavigateTabs";

const Auth = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const mode = searchParams.get("mode") || "login";
    const handleChange = (_, newValue) => {
        setSearchParams({ mode: newValue }, { replace: true });
    };

    return (
        <div className="col-start-3 col-end-8 flex flex-col gap-14 py-32">
            <NavigateTabs mode={mode} handleChange={handleChange} />

            {mode === "login" ? (
                <LoginForm />
            ) : (
                mode === "register" && <RegisterForm />
            )}
        </div>
    );
};

export default Auth;
