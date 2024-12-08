import { useNavigate } from "react-router-dom";
import { logOutAPI } from "../../SupabaseAPI";

const ProfileSidebar = ({ params }) => {
    const navigate = useNavigate();

    return (
        <div className="col-start-1 col-end-3 flex flex-col justify-between rounded-2xl bg-bg_brown-100 px-6 py-12 shadow-[4px_4px_2px] shadow-black/20">
            <ul className={`flex flex-col gap-4 text-4xl text-bg_brown-400`}>
                <li
                    className={`cursor-pointer px-8 py-3 ${params.tab === "info" && "bg-bg_brown-200"}`}
                    onClick={() => navigate("/profile?tab=info")}
                >
                    個人訂單
                </li>
                <li
                    className={`cursor-pointer px-8 py-3 ${params.tab === "order" && "bg-bg_brown-200"}`}
                    onClick={() => navigate("/profile?tab=order")}
                >
                    訂單
                </li>
            </ul>
            <button
                className="rounded-2xl bg-btn-100 py-4 text-4xl text-font-100"
                onClick={() => {
                    logOutAPI();
                    navigate("/");
                }}
            >
                登出
            </button>
        </div>
    );
};

export default ProfileSidebar;
