import AMI from '../Assets/images/AMI.png';
import CarouselSlide from '../Components/CarouselSlide';
import { celebrities } from '../Constants/CelebrityData';
import HomeLayout from '../Layouts/HomeLayout';

function AboutUs() {
    return (
        <HomeLayout>
            <div className="pl-20 pt-20 flex flex-col text-white h-[90vh] w-[90%] mx-auto  max-w-[1400px]">
                <div className="flex items-center justify-center gap-5 mx-10 h-[40vh]">
                    <section className="w-1/2 space-y-10">
                        <h1 className="text-5xl text-yellow-500 font-semibold">
                            {' '}
                            Affordable and quality education
                        </h1>
                        <p className="text-xl text-gray-200">
                            {' '}
                            Our goal is to provide the afoordable and quality
                            education to the world. We are providing the
                            platform for the aspiring teachers and students to
                            share their skills, creativity and knowledge to each
                            other to empower and contribute in the growth and
                            wellness of mankind.{' '}
                        </p>
                    </section>
                    <div className="w-1/2 flex items-center justify-center ">
                        <img
                            src={AMI}
                            alt="AMI"
                            className="object-fit drop-shadow-2xl"
                        />
                    </div>
                </div>
                <div className="carousel w-full my-16 m-auto h-[45vh]">
                    {celebrities &&
                        celebrities.map((celebrity) => (
                            <CarouselSlide
                                {...celebrity}
                                key={celebrity.slideNumber}
                                totalSlides={celebrities.length}
                            />
                        ))}
                </div>
            </div>
        </HomeLayout>
    );
}
export default AboutUs;
