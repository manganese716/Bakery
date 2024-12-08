import { useNavigate } from "react-router-dom";

const Card = ({ bg_img, text }) => {
    const navigate = useNavigate();
    return (
        <div
            className={`group relative py-72 ${bg_img} flex cursor-pointer items-center justify-center rounded-3xl bg-black/30 bg-cover bg-blend-overlay hover:bg-black/50`}
            onClick={() => navigate("/product")}
        >
            <div className="absolute left-1/2 top-1/2 h-[85%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-3xl border-bg_brown-100 transition-all group-hover:border-2" />
            <p className="text-5xl text-bg_brown-100">{text}</p>
        </div>
    );
};

export default Card;
