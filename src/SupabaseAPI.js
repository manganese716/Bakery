import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://zrlmurvbeqkkbdtykccu.supabase.co";
export const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const signUpAPI = async ({ formData }) => {
    const { email, password, phone, name } = formData;
    let { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                phone,
                name,
            },
        },
    });
    return { data, error };
};

export const signInAPI = async ({ formData }) => {
    const { email, password } = formData;
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error("登入發生錯誤");
        throw error;
    }

    return { data, error };
};

export const getSessionAPI = async () => {
    const {
        data: { session },
    } = await supabase.auth.getSession();

    return session;
};

export const changeProfileAPI = async ({ formData }) => {
    const { name, password, address } = formData;

    const updateData = {
        data: {
            name,
            password,
            address,
        },
    };

    // 有要改密碼
    if (password) {
        updateData.password = password;
    }

    const { error } = await supabase.auth.updateUser(updateData);

    if (error) throw "更改個人資訊時發生錯誤";

    return;
};

export const logOutAPI = async () => {
    let { error } = await supabase.auth.signOut();

    if (error) throw error;
};

export const fetchProducts = async (pageNumber, category) => {
    //一次只顯示6個
    const start = (pageNumber - 1) * 6;
    const end = start + 6;

    if (category === "all") category = undefined;

    let { data: commodity, error } = category
        ? await supabase
              .from("commodity")
              .select("*")
              .eq("category", category)
              .range(start, end)
        : await supabase.from("commodity").select("*").range(start, end);

    if (error) throw error;

    return commodity;
};

export const getUserAPI = async () => {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user;
};

export const sendOrderAPI = async ({
    user_id,
    payment_method,
    total_amount,
    shipping_address = "",
    shipping_method,
}) => {
    console.log(shipping_method);

    const { data, error } = await supabase
        .from("order")
        .insert([
            {
                user_id,
                updated_at: new Date(),
                status: 0,
                payment_status: 0,
                payment_method,
                total_amount,
                shipping_address,
                shipping_method,
            },
        ])
        .select("id");

    if (error) throw error;

    return data;
};

export const insertOrderItemsAPI = async ({ orderItems }) => {
    const { error } = await supabase
        .from("order items")
        .insert([...orderItems]);

    if (error) throw error;
};

export const fetchOrderById = async ({ orderId }) => {
    if (!orderId) throw new Error("fetchOrderById Error Order ID is required");

    const { data, error } = await supabase
        .from("order")
        .select(
            "payment_method,shipping_address,total_amount,payment_status,shipping_method,status,linePayTransactionId",
        )
        .eq("id", orderId)
        .single();

    if (error) {
        console.error("Failed to fetch order:", error);
        throw error;
    }

    return data;
};

export const fetchRecentOrderByUserId = async ({ userId }) => {
    if (!userId) throw new Error("fetchOrderById Error Order ID is required");

    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const { data, error } = await supabase
        .from("order")
        .select(
            "id,payment_method, shipping_address, total_amount, payment_status, shipping_method, status, linePayTransactionId, created_at",
        )
        .eq("user_id", userId)
        .gte("created_at", threeMonthsAgo.toISOString())
        .range(0, 19);

    if (error) {
        console.error("Failed to fetch order:", error);
        throw error;
    }

    return data;
};

export const fetchOrderProductsByOrderId = async ({ orderId }) => {
    if (!orderId)
        throw new Error(
            "fetchOrderProductsByOrderId Error Order ID is required",
        );

    const { data, error } = await supabase
        .from("order items")
        .select("commodity_id, quantity")
        .eq("order_id", parseInt(orderId));

    if (error) {
        console.error("Failed to fetch order:", error);
        throw error;
    }

    return data;
};

export const fetchCommodityById = async ({ commodityId }) => {
    if (!commodityId) throw new Error("commodityId ID is required");

    const { data, error } = await supabase
        .from("commodity")
        .select("*")
        .eq("id", parseInt(commodityId))
        .single();

    if (error) throw error;

    return data;
};

export const updateOrderById = async ({ orderId, updateFields }) => {
    if (!orderId || !updateFields || typeof updateFields !== "object") {
        throw new Error("updateOrderById error: Invalid input");
    }

    const { data, error } = await supabase
        .from("order")
        .update(updateFields)
        .eq("id", orderId);

    if (error) throw error;

    return data; // 回傳更新後的資料
};

export const fetchOrderByUserId = async () => {};
