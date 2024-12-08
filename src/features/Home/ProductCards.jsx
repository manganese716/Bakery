const FeatureProductArr = [
    {
        productName: "馬卡龍",
        image: "/img/馬卡龍.jpg",
        price: 80,
    },
    {
        productName: "杯子蛋糕 1個",
        image: "/img/小蛋糕.jpg",
        price: 30,
    },
    {
        productName: "星形餅乾 1包（8片）",
        image: "/img/星型餅乾.jpg",
        price: 40,
    },
    {
        productName: "可頌 1個",
        image: "/img/可頌.jpg",
        price: 45,
    },
];

const FeatureProducts = () => {
    return (
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(24rem,1fr))] gap-14">
            {FeatureProductArr.map((product) => {
                return (
                    <div key={product.productName}>
                        <FeatureProduct product={product} />
                    </div>
                );
            })}
        </div>
    );
};

const FeatureProduct = ({ product }) => {
    return (
        <div className="flex flex-col items-center gap-5">
            <div className="relative aspect-square w-96 overflow-hidden rounded-xl shadow-[3px_3px_5px] shadow-black/20">
                <img
                    src={product.image}
                    className="absolute block h-full w-full object-cover object-[60%_70%] transition-all hover:scale-110 hover:transition-transform"
                />
            </div>
            <p className="cursor-pointer text-4xl hover:underline">
                {product.productName}
            </p>
            <p className="text-3xl text-bg_brown-300">NT$50</p>
        </div>
    );
};

export default FeatureProducts;
