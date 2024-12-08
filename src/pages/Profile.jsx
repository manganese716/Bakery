import { useSearchParams } from "react-router-dom";
import ProfileInfo from "../features/Profile/ProfileInfo";
import ProfileOrderList from "../features/Profile/ProfileOrderList";
import ProfileSidebar from "../features/Profile/ProfileSidebar";

const Profile = () => {
    const [searchParams] = useSearchParams();

    const params = {
        tab: "info",
        ...Object.fromEntries(searchParams.entries()),
    };

    return (
        <div className="col-start-2 col-end-9 grid grid-cols-subgrid gap-8 py-32">
            <ProfileSidebar params={params} />
            {params.tab === "info" && <ProfileInfo />}
            {params.tab === "order" && <ProfileOrderList />}
        </div>
    );
};

export default Profile;
