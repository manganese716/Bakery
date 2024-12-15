const Gallery = () => {
    return (
        <div className="col-start-1 col-end-9 grid grid-cols-6 grid-rows-[repeat(5,10vw)] gap-[0.9vw]">
            <div className="col-start-1 col-end-3 row-start-1 row-end-3 overflow-hidden">
                <img
                    src="/img/gallery-1.jpg"
                    className="h-full w-full translate-x-8 scale-110 object-cover"
                />
            </div>

            <div className="col-start-3 col-end-5 row-start-1 row-end-2 overflow-hidden">
                <img
                    src="/img/gallery-2.jpg"
                    className="h-full w-full scale-110 object-cover"
                />
            </div>

            <div className="col-start-5 col-end-7 row-start-1 row-end-3 overflow-hidden">
                <img
                    src="/img/gallery-3.jpg"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="col-start-3 col-end-4 row-start-2 row-end-4 overflow-hidden">
                <img
                    src="/img/gallery-4.jpg"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="col-start-4 col-end-5 row-start-2 row-end-3 overflow-hidden">
                <img
                    src="/img/gallery-5.jpg"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="col-start-1 col-end-2 row-start-3 row-end-5 overflow-hidden">
                <img
                    src="/img/gallery-6.jpg"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="col-start-2 col-end-3 row-start-3 row-end-4 overflow-hidden">
                <img
                    src="/img/gallery-7.jpg"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="col-start-4 col-end-6 row-start-3 row-end-5 overflow-hidden">
                <img
                    src="/img/gallery-8.jpg"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="col-start-6 col-end-7 row-start-3 row-end-5 overflow-hidden">
                <img
                    src="/img/gallery-9.jpg"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="col-start-1 col-end-2 row-start-5 row-end-6 overflow-hidden">
                <img
                    src="/img/gallery-10.jpg"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="col-start-2 col-end-4 row-start-4 row-end-6 overflow-hidden">
                <img
                    src="/img/gallery-11.jpg"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="col-start-4 col-end-5 row-start-5 row-end-6 overflow-hidden">
                <img
                    src="/img/gallery-12.jpg"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="col-start-5 col-end-7 row-start-5 row-end-6 overflow-hidden">
                <img
                    src="/img/gallery-13.jpg"
                    className="h-full w-full object-cover"
                />
            </div>
        </div>
    );
};

export default Gallery;
