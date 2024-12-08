import { useNavigate } from "react-router-dom";
import { supabase } from "../../SupabaseAPI";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetUserData, saveUserData } from "./userSlice";

const ProtectRoute = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            setIsLoading(true);
            const { data, error } = await supabase.auth.getSession();
            if (error || !data.session) {
                navigate("/auth");
            }
            setIsLoading(false);
        };

        checkSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_OUT") dispatch(resetUserData());
            else if (session) dispatch(saveUserData(session));
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [navigate, dispatch]);

    if (isLoading) return <div>Loading...</div>;

    return children;
};

export default ProtectRoute;
