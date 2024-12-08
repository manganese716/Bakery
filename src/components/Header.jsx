import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
const Header = ({ onOpen }) => {
    return (
        <header className="fixed z-20 grid w-full grid-cols-[minmax(3rem,1fr)_repeat(7,minmax(auto,17rem))_minmax(3rem,1fr)] bg-bg_brown-200 py-4">
            <div className="col-span-7 col-start-2 flex items-center justify-between text-font-200">
                <div className="text-[3rem]">焙你幸福烘焙坊</div>
                <ul className="grid grid-cols-4 items-center gap-4 text-[2.3rem]">
                    <li>
                        <Link to={"/"}>首頁</Link>
                    </li>
                    <li>
                        <Link to={"/product"}>商品</Link>
                    </li>
                    <li className="justify-self-center">
                        <Link to={"/profile"}>
                            <FiUser />
                        </Link>
                    </li>
                    <li>
                        <BsCart3 onClick={onOpen} className="cursor-pointer" />
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
