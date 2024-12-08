import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import Layout from "./pages/Layout";
import Product from "./pages/Product";
import Order from "./pages/Order";
import OrderPreview from "./features/Order/OrderPreview";
import Auth from "./pages/Auth";
import ProtectRoute from "./features/Auth/ProtectRoute";
import Profile from "./pages/Profile";
import OrderDetail from "./features/Order/OrderDetail";
import OrderConfirmLinePay from "./features/Order/OrderConfirmLinePay";
import OrderErrorPage from "./features/Order/OrderErrorPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/product" element={<Product />} />
                <Route path="/auth" element={<Auth />} />
                <Route
                    element={
                        <ProtectRoute>
                            <Outlet />
                        </ProtectRoute>
                    }
                >
                    <Route path="/order" element={<Order />}>
                        <Route index element={<OrderPreview />} />
                        <Route path=":orderId" element={<OrderDetail />} />
                        <Route
                            path="confirm"
                            element={<OrderConfirmLinePay />}
                        />
                        <Route path="error" element={<OrderErrorPage />} />
                    </Route>
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
