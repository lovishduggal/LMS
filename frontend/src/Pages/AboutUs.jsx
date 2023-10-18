import AMI from '../Assets/images/AMI.png';
import Apj from '../Assets/images/apj.png';
import HomeLayout from '../Layouts/HomeLayout';
function AboutUs() {
    return (
        <HomeLayout>
            <div className="pt-16 h-[90vh] w-[90%] m-auto flex flex-col items-center justify-center gap-8 space-y-8">
                <div className="w-full h-[60vh] flex flex-col items-center justify-between gap-8">
                    <section className="w-full  space-y-2 flex flex-col justify-center items-center">
                        <h1 className="text-2xl text-semibold text-yellow-500">
                            {' '}
                            Affordable and quality education
                        </h1>
                        <p className="text-sm ">
                            {' '}
                            Our goal is to provide the afoordable and quality
                            education to the world. We are providing the
                            platform for the aspiring teachers and students to
                            share their skills, creativity and knowledge to each
                            other to empower and contribute in the growth and
                            wellness of mankind.{' '}
                        </p>
                    </section>
                    <div className="w-full flex items-center justify-center">
                        <img src={AMI} alt="AMI" className="object-fit" />
                    </div>
                </div>
                <div className="carousel w-full  h-[30vh]">
                    <div
                        id="slide1"
                        className="carousel-item relative w-full flex items-center justify-center">
                        <img src={Apj} className="w-ful h-full" />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide4" className="btn btn-circle">
                                ❮
                            </a>
                            <a href="#slide2" className="btn btn-circle">
                                ❯
                            </a>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                        <img
                            src="/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
                            className="w-full"
                        />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide1" className="btn btn-circle">
                                ❮
                            </a>
                            <a href="#slide3" className="btn btn-circle">
                                ❯
                            </a>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <img
                            src="/images/stock/photo-1414694762283-acccc27bca85.jpg"
                            className="w-full"
                        />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide2" className="btn btn-circle">
                                ❮
                            </a>
                            <a href="#slide4" className="btn btn-circle">
                                ❯
                            </a>
                        </div>
                    </div>
                    <div id="slide4" className="carousel-item relative w-full">
                        <img
                            src="/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
                            className="w-full"
                        />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide3" className="btn btn-circle">
                                ❮
                            </a>
                            <a href="#slide1" className="btn btn-circle">
                                ❯
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}
export default AboutUs;
