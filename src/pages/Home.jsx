import BreakLine from "../components/BreakLine";
import Btn from "../features/Home/Btn";
import Card from "../features/Home/Card";
import Gallery from "../features/Home/Gallery";
import ProductCards from "../features/Home/ProductCards";

export const Home = () => {
    return (
        <div className="col-span-full grid grid-cols-subgrid">
            <div className="col-span-full grid h-[calc(100vh-6rem)] grid-cols-subgrid items-center bg-banner bg-cover">
                <div className="col-start-2 col-end-9 flex flex-col items-start gap-32">
                    <h2 className="text-5xl leading-relaxed text-font-200">
                        新鮮出爐的香氣，溫暖你的每一天
                        <br />
                        用心烘焙，只為你停下的那一口
                    </h2>
                    <p className="cursor-pointer text-4xl text-font-200 underline">
                        立即選購
                    </p>
                </div>
            </div>

            <div className="col-start-2 col-end-9 flex flex-col items-center gap-32 py-32">
                <h3 className="text-5xl">精選商品</h3>
                <ProductCards />
                <Btn />
            </div>

            <div className="col-start-2 col-end-9">
                <BreakLine />
            </div>

            <div className="col-start-2 col-end-9 grid grid-cols-[repeat(auto-fit,minmax(25rem,1fr))] gap-24 py-32">
                <Card bg_img={"bg-card_1"} text="聯絡我們" />
                <Card bg_img={"bg-card_2"} text="立即購買" />
            </div>

            <div className="col-start-2 col-end-9">
                <BreakLine />
            </div>

            <Gallery />
        </div>
    );
};
