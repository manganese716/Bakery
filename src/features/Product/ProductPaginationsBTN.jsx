import { useSearchParams } from "react-router-dom";

const ProductPaginationsBTN = ({
    children,
    jumpPage,
    className = "",
    isActive = false,
}) => {
    const [_, setSearchParams] = useSearchParams();

    return (
        <li
            className={`flex aspect-square w-[4.3rem] cursor-pointer justify-center rounded-full p-4 transition-colors hover:bg-bg_brown-200 ${className} ${isActive ? "bg-bg_brown-200" : "bg-bg_brown-200/40"}`}
            onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });

                //等scrollTo完成在跳轉頁面
                setTimeout(() => {
                    setSearchParams((prev) => {
                        prev.set("page", jumpPage);
                        return prev;
                    });
                }, 170);
            }}
        >
            {children}
        </li>
    );
};

export default ProductPaginationsBTN;
