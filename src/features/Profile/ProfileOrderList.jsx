import { useQuery } from "@tanstack/react-query";
import {
    fetchCommodityById,
    fetchOrderProductsByOrderId,
    fetchRecentOrderByUserId,
    getUserAPI,
} from "../../SupabaseAPI";
import OrderStatusIcon from "../Order/OrderStatusIcon";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { BeatLoader } from "react-spinners";

const ProfileOrderList = () => {
    const { data: orderList, isLoading } = useQuery({
        queryKey: ["userOrder", 0],
        queryFn: async () => {
            const { id } = await getUserAPI();
            let orderDatas = await fetchRecentOrderByUserId({ userId: id });
            orderDatas = await Promise.all(
                orderDatas.map(async (orderData) => {
                    let products = await fetchOrderProductsByOrderId({
                        orderId: orderData.id,
                    });

                    products = await Promise.all(
                        products.map(async (product) => {
                            const commodity = await fetchCommodityById({
                                commodityId: product.commodity_id,
                            });
                            return { ...product, ...commodity };
                        }),
                    );

                    return {
                        ...orderData,
                        products,
                    };
                }),
            );
            return orderDatas.slice().reverse();
        },
    });

    return (
        <TableContainer
            component={Paper}
            aria-label="tableContainer"
            sx={{
                gridColumn: { sm: "2/-1", xs: "1/-1" },
                backgroundColor: "primary.main",
                padding: "2rem",
            }}
        >
            <Table
                sx={{
                    "& .MuiTableCell-root": {
                        fontSize: "1.8rem",
                        paddingX: "0",
                        textAlign: "center",
                    },
                    minWidth: { sm: "540px", xs: "460px" },
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell>訂單編號</TableCell>
                        <TableCell>訂單成立日期</TableCell>
                        <TableCell sx={{ width: "18%" }}>狀態</TableCell>
                        <TableCell sx={{ width: "20%" }}>品項</TableCell>
                        <TableCell>金額</TableCell>
                    </TableRow>
                </TableHead>
                {isLoading ? (
                    <TableRow>
                        <TableCell colSpan={5} sx={{ border: "0" }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",

                                    height: "100px", // 根據需要調整高度
                                }}
                            >
                                <BeatLoader color="#8B5E34" />
                            </Box>
                        </TableCell>
                    </TableRow>
                ) : (
                    <TableBody>
                        {orderList?.map((order) => {
                            const {
                                id,
                                created_at,
                                status,
                                products,
                                total_amount,
                            } = order;

                            const formattedDate = new Date(created_at)
                                .toLocaleDateString("zh-TW", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                })
                                .replace(/\//g, "/");

                            return (
                                <TableRow key={`orderList${id}`}>
                                    <TableCell>{id}</TableCell>
                                    <TableCell>{formattedDate}</TableCell>
                                    <TableCell>
                                        <OrderStatusIcon orderStatus={status} />
                                    </TableCell>
                                    <TableCell>
                                        {products.slice(0, 2).map((product) => {
                                            const {
                                                commodity_id,
                                                name,
                                                quantity,
                                            } = product;
                                            return (
                                                <Typography
                                                    key={`orderList${id}Items${commodity_id}`}
                                                    // className="flex justify-center"
                                                    sx={{ fontSize: "1.5rem" }}
                                                >
                                                    {name} X {quantity}
                                                </Typography>
                                            );
                                        })}
                                        {products.length > 2 && (
                                            <Typography
                                                // className="flex justify-center"
                                                sx={{ fontSize: "1.5rem" }}
                                            >
                                                ...
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>NT${total_amount}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                )}
            </Table>
        </TableContainer>
    );
};

export default ProfileOrderList;
