import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProducts } from "../SupabaseAPI";

import ProductCards from "../features/Product/ProductCards";
import ProductPaginations from "../features/Product/ProductPaginations";
import SortBtns from "../features/Product/SortBtns";
import { useEffect } from "react";
import { SyncLoader } from "react-spinners";

const Product = () => {
    const [searchParams] = useSearchParams();

    const queryClient = useQueryClient();

    const page = parseInt(searchParams.get("page")) || 1;
    const category = searchParams.get("sort") || "all";

    const {
        data: commodities,
        isLoading,
        isSuccess,
    } = useQuery({
        queryKey: ["sort", category, "page", page],
        queryFn: () => fetchProducts(page, category),
    });

    const hasNextPage = commodities?.length >= 7;

    // prefetch
    useEffect(() => {
        if (!isLoading && isSuccess && hasNextPage) {
            queryClient.prefetchQuery({
                queryKey: ["sort", category, "page", page + 1],
                queryFn: () => fetchProducts(page, category),
            });
        }
    }, [isSuccess, isLoading, page, queryClient, hasNextPage, category]);

    return (
        <div className="col-start-2 col-end-9 grid min-h-[78rem] grid-cols-subgrid grid-rows-[6rem_1fr] gap-16 py-32">
            <SortBtns />
            {isLoading ? (
                <div className="col-start-2 col-end-7 flex justify-center">
                    <SyncLoader color="#C48A4A" />
                </div>
            ) : (
                <>
                    <ProductCards commodities={commodities} />
                    <ProductPaginations
                        currentPage={page}
                        hasNextPage={hasNextPage}
                    />
                </>
            )}
        </div>
    );
};

export default Product;
