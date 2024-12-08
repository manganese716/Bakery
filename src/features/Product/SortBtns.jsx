import { useSearchParams } from "react-router-dom";

const sortArr = [
    { text: "所有商品", params: "all" },
    { text: "麵包", params: "bread" },
    { text: "點心", params: "dessert" },
    { text: "餅乾", params: "cookies" },
];

const SortBtns = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortParams = searchParams.get("sort") || "all";

    return (
        <div className="col-start-2 col-end-7 grid grid-cols-4 gap-4 self-start">
            {sortArr.map((sort) => {
                const bg_color =
                    sort.params === sortParams
                        ? "bg-bg_brown-300"
                        : "bg-bg_brown-100";

                return (
                    <button
                        key={`sort_${sort.text}`}
                        className={`cursor-pointer py-5 text-center text-4xl text-font-100 hover:bg-bg_brown-300 ${bg_color}`}
                        onClick={() => {
                            setSearchParams((prev) => {
                                prev.set("sort", sort.params);
                                prev.set("page", 1);
                                return prev;
                            });
                        }}
                    >
                        {sort.text}
                    </button>
                );
            })}
        </div>
    );
};

export default SortBtns;
