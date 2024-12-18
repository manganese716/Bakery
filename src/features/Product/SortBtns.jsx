import { Button, ButtonGroup } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const sortArr = [
    { text: "所有商品", params: "all" },
    { text: "麵包", params: "bread" },
    { text: "點心", params: "dessert" },
    { text: "餅乾", params: "cookies" },
];

const SortBtns = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentSort = searchParams.get("sort") || "all";

    const handleSortChange = (params) => {
        setSearchParams((prev) => {
            prev.set("sort", params);
            prev.set("page", 1);
            return prev;
        });
    };

    return (
        <ButtonGroup
            sx={{
                gridColumn: { md: "2/7", xs: "1/-1" },
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                justifyContent: "center",
                columnGap: { sm: "2rem", xs: "1rem" },
                marginTop: "4rem",
                alignSelf: "start",
                "& .MuiButton-root": {
                    border: "none",
                },
            }}
        >
            {sortArr.map((sort) => {
                return (
                    <Button
                        key={`sort_${sort.text}`}
                        sx={{
                            color: "font.main",
                            backgroundColor:
                                sort.params === currentSort
                                    ? "primary.dark"
                                    : "primary.main",
                            fontSize: "2.5rem",
                            padding: "0",
                            "&:hover": {
                                backgroundColor: "primary.dark",
                            },
                        }}
                        onClick={() => handleSortChange(sort.params)}
                    >
                        {sort.text}
                    </Button>
                );
            })}
        </ButtonGroup>
    );
};

export default SortBtns;
