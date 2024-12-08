import { supabase } from "./SupabaseAPI";

// 定義產品資料
const breadProducts = [
    {
        name: "法國麵包",
        description: "外酥內軟的傳統法國麵包",
        price: 50,
        category: "bread",
        image_url: "/Bread/Baguette.jpg",
    },
    {
        name: "奶油餐包",
        description: "奶香濃郁，口感柔軟的餐包",
        price: 60,
        category: "bread",
        image_url: "/Bread/ButterRoll.jpg",
    },
    {
        name: "可頌",
        description: "層次分明的法式酥皮麵包",
        price: 70,
        category: "bread",
        image_url: "/Bread/Croissant.jpg",
    },
    {
        name: "鬆餅",
        description: "軟嫩可口的美式鬆餅",
        price: 55,
        category: "bread",
        image_url: "/Bread/Muffins.jpg",
    },
    {
        name: "波羅麵包",
        description: "香甜的波羅麵包，表皮酥脆",
        price: 45,
        category: "bread",
        image_url: "/Bread/PineappleBun.jpg",
    },
    {
        name: "白吐司",
        description: "柔軟可口的白吐司",
        price: 40,
        category: "bread",
        image_url: "/Bread/WhiteBread.jpg",
    },
    {
        name: "全麥土司",
        description: "健康的全麥土司，營養滿點",
        price: 50,
        category: "bread",
        image_url: "/Bread/WholeWheatBread.jpg",
    },
];

const cookieProducts = [
    {
        name: "阿法霍雷斯餅乾",
        description: "南美經典餅乾，夾有奶油和甜美的糖霜",
        price: 45,
        category: "cookies",
        image_url: "/Cookie/Alfajores.jpg",
    },
    {
        name: "杏仁瓦片",
        description: "香脆的杏仁餅乾，口感獨特",
        price: 55,
        category: "cookies",
        image_url: "/Cookie/AlmondTuiles.jpg",
    },
    {
        name: "巧克力杏仁",
        description: "巧克力與杏仁的完美結合",
        price: 50,
        category: "cookies",
        image_url: "/Cookie/ChocolateAlmond.jpg",
    },
    {
        name: "巧克力餅乾",
        description: "濃郁的巧克力餅乾，帶來滿滿的幸福感",
        price: 60,
        category: "cookies",
        image_url: "/Cookie/ChocolateChips.jpg",
    },
    {
        name: "巧克力核桃",
        description: "巧克力與核桃的絕佳搭配",
        price: 65,
        category: "cookies",
        image_url: "/Cookie/ChocolateWalnut.jpg",
    },
    {
        name: "檸檬藍莓餅乾",
        description: "清新的檸檬與藍莓餅乾",
        price: 55,
        category: "cookies",
        image_url: "/Cookie/LemonBlueberryCookies.jpg",
    },
    {
        name: "蝴蝶酥",
        description: "酥脆的法式蝴蝶酥，風味獨特",
        price: 50,
        category: "cookies",
        image_url: "/Cookie/Palmier.jpg",
    },
];

const dessertProducts = [
    {
        name: "乳酪蛋糕",
        description: "濃郁的乳酪口感，滑順細緻",
        price: 120,
        category: "dessert",
        image_url: "/Dessert/Cheesecake.jpg",
    },
    {
        name: "巧克力泡芙",
        description: "外酥內軟的巧克力泡芙",
        price: 75,
        category: "dessert",
        image_url: "/Dessert/ChocolatePuff.jpg",
    },
    {
        name: "奶油泡芙",
        description: "柔軟奶油餡料的泡芙",
        price: 70,
        category: "dessert",
        image_url: "/Dessert/CreamPuff.jpg",
    },
    {
        name: "蛋塔",
        description: "濃郁奶香，完美搭配酥皮",
        price: 45,
        category: "dessert",
        image_url: "/Dessert/EggTart.jpg",
    },
    {
        name: "水果塔",
        description: "新鮮水果與奶油塔的組合",
        price: 90,
        category: "dessert",
        image_url: "/Dessert/FruitTarts.jpg",
    },
    {
        name: "鳳梨酥",
        description: "酥皮包裹鳳梨餡，甜而不膩",
        price: 60,
        category: "dessert",
        image_url: "/Dessert/PineappleCake.jpg",
    },
    {
        name: "司康",
        description: "傳統英式司康，外脆內軟",
        price: 50,
        category: "dessert",
        image_url: "/Dessert/Scone.jpg",
    },
    {
        name: "提拉米蘇",
        description: "綿密的意式經典甜點",
        price: 110,
        category: "dessert",
        image_url: "/Dessert/Tiramisu.jpg",
    },
];

// 合併所有產品資料
const allProducts = [...breadProducts, ...cookieProducts, ...dessertProducts];

// 插入資料到 Supabase
export async function insertProducts() {
    const { data, error } = await supabase
        .from("commodity")
        .insert(allProducts);

    if (error) {
        console.error("插入資料錯誤:", error);
    } else {
        console.log("資料成功插入:", data);
    }
}
