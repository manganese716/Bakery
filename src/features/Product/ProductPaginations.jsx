import { FaAngleLeft, FaAngleRight, FaAnglesLeft } from "react-icons/fa6";
import ProductPaginationsBTN from "./ProductPaginationsBTN";

const ProductPaginations = ({ currentPage, hasNextPage }) => {
    return (
        <ul className="col-start-2 col-end-7 grid grid-cols-[repeat(6,4.2rem)] items-center justify-center gap-4 self-start text-4xl text-font-100">
            {currentPage > 1 && (
                <>
                    <ProductPaginationsBTN jumpPage={1}>
                        <FaAnglesLeft className="translate-y-[1px]" />
                    </ProductPaginationsBTN>

                    <ProductPaginationsBTN jumpPage={currentPage - 1}>
                        <FaAngleLeft className="translate-y-[1px]" />
                    </ProductPaginationsBTN>

                    <ProductPaginationsBTN jumpPage={currentPage - 1}>
                        <p className="-translate-y-[4px]">{currentPage - 1}</p>
                    </ProductPaginationsBTN>
                </>
            )}

            {/* 目前page */}
            <ProductPaginationsBTN
                jumpPage={currentPage}
                className="col-start-4 col-end-5"
                isActive={true}
            >
                <p className="-translate-y-[3px]">{currentPage}</p>
            </ProductPaginationsBTN>

            {/* 假設已經預先載入才顯示 */}
            {hasNextPage && (
                <>
                    <ProductPaginationsBTN jumpPage={currentPage + 1}>
                        <p className="-translate-y-[3px]">{currentPage + 1}</p>
                    </ProductPaginationsBTN>
                    <ProductPaginationsBTN jumpPage={currentPage + 1}>
                        <FaAngleRight className="translate-y-[1px]" />
                    </ProductPaginationsBTN>
                </>
            )}
        </ul>
    );
};

export default ProductPaginations;
