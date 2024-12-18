import { useSearchParams } from "react-router-dom";
import ProfileInfo from "../features/Profile/ProfileInfo";
import ProfileOrderList from "../features/Profile/ProfileOrderList";
import ProfileSidebar from "../features/Profile/ProfileSidebar";
import { Box } from "@mui/material";

const Profile = () => {
    const [searchParams] = useSearchParams();
    const tabMode = searchParams.get("tab") || "info";

    return (
        // <div className="col-start-2 col-end-9 grid grid-cols-subgrid gap-8 py-32">
        //     <ProfileSidebar tabMode={tabMode} />
        //     {tabMode === "info" && <ProfileInfo />}
        //     {tabMode === "order" && <ProfileOrderList />}
        // </div>

        <Box
            aria-label="Profile layout"
            sx={{
                gridColumn: "2/9",
                display: "grid",
                paddingTop: "12vh",
                paddingBottom: "5vh",
                gap: "1rem",

                gridTemplateColumns: "repeat(4,1fr)",
                gridTemplateRows: { sm: "auto", xs: "auto 1fr" },
            }}
        >
            <ProfileSidebar tabMode={tabMode} />
            {tabMode === "info" && <ProfileInfo />}
            {tabMode === "order" && <ProfileOrderList />}
        </Box>
    );
};

export default Profile;
