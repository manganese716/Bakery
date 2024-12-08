import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

// 設定解析 JSON 請求體
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization",
    );
    next();
});

// 處理 OPTIONS 預檢請求
app.options("/api/proxy", (req, res) => {
    res.sendStatus(200);
});

// 設定解析 JSON 請求體
app.use(express.json());

// 設置代理路由
app.post("/api/proxy", async (req, res) => {
    const { data, url, headers } = req.body;

    try {
        // 使用 Axios 轉發請求到目標 API
        const response = await axios.post(url, data, {
            headers,
        });

        console.log("Response Data:", response.data); // 後端打印響應數據

        // 將目標 API 的響應返回給前端
        res.status(response.status).json(response.data);
    } catch (error) {
        // 捕捉錯誤並返回錯誤信息
        console.error("Error in Proxy Request:", error.message);

        // 檢查是否有來自目標 API 的響應
        if (error.response) {
            // 目標 API 返回錯誤響應
            res.status(error.response.status).json({
                error: true,
                message: error.response.data || "Error from target API",
            });
        } else {
            // 其他類型的錯誤
            res.status(500).json({
                error: true,
                message: "Internal Server Error",
            });
        }
    }
});

// 啟動伺服器
app.listen(port, () => {
    console.log(`Proxy server running on http://localhost:${port}`);
});
