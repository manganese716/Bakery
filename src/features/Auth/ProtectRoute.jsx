import { useNavigate } from "react-router-dom";
import { supabase } from "../../SupabaseAPI";
import { useEffect, useState } from "react";

const ProtectRoute = ({ children }) => {
    const navigate = useNavigate();

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
            if (!session) {
                navigate("/auth");
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [navigate]);

    if (isLoading) return <div>Loading...</div>;

    return children;
};

export default ProtectRoute;
