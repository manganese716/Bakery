import { useNavigate } from "react-router-dom";

const Btn = () => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => {
                navigate("/product");
            }}
            className="rounded-lg bg-bg_brown-300 px-16 py-6 text-4xl text-font-200 shadow-[2px_2px_2px] shadow-black/25 transition-all hover:translate-y-2"
        >
            更多商品
        </button>
    );
};

export default Btn;
