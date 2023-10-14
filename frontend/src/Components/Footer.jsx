import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';

function Footer() {
    const year = new Date().getFullYear();
    return (
        <>
            <footer className=" bg-gray-800">
                <div className="relative left-0 right-0 w-[90%] m-auto space-y-4 py-5 flex  flex-col justify-between items-center  sm:flex-row  sm:space-y-0 text-white">
                    <section className="text-lg">
                        Copyright {year} | All Rights Reserved
                    </section>
                    <section className="flex  justify-center items-center gap-5 text-2xl text-white">
                        <a
                            className="hover:text-yellow-500 transition-all ease-in-out duration-300"
                            href="#">
                            <BsFacebook />{' '}
                        </a>
                        <a
                            className="hover:text-yellow-500 transition-all ease-in-out duration-300"
                            href="#">
                            <BsInstagram />{' '}
                        </a>
                        <a
                            className="hover:text-yellow-500 transition-all ease-in-out duration-300"
                            href="#">
                            <BsLinkedin />{' '}
                        </a>
                        <a
                            className="hover:text-yellow-500 transition-all ease-in-out duration-300"
                            href="#">
                            <BsTwitter />{' '}
                        </a>
                    </section>
                </div>
            </footer>
        </>
    );
}
export default Footer;
