import { Link } from "react-router-dom";
// import Container from "./container";
import { Container } from "react-bootstrap";


const Hero = () => {
  const imageUrl = 'https://img.freepik.com/free-vector/man-workplace-thinking-about-sailing-yacht-imagines-future-rest_575670-279.jpg?w=740&t=st=1693073065~exp=1693073665~hmac=76366646a96c9191e6744c8388a16eb8529b7a8b14b22073ba9bee9d749ef8af';

  return (

    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1  class="font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
>
            DreamScribe:AI-Powered Dream Content Creation
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl">
            Transform your dream experiences into captivating narratives, stories, and more.
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <Link
                to="/input"
                rel="noopener"
                className="px-12 py-3  text-lg font-bold text-center text-white no-underline bg-indigo-600 rounded-md ">
                Get started
              </Link>
              
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
           <img 
            src={imageUrl}
            width="616"
            height="617"
            className={"object-cover"}
            alt="Hero Illustration"
            loading="eager"
            placeholder="blur"/>
            {/* <Image
              src={heroImg}
              width="616"
              height="617"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            /> */}
          </div>
        </div>
      </Container>
     
    </>
  );
}



export default Hero;