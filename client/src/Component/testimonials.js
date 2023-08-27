import React from "react";
import Container from "./container";



const Testimonials  = () => {
  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        <div className="lg:col-span-2 xl:col-auto">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14">
            <p className="text-2xl leading-normal ">
              Dream Entry:
Users can record their <Mark>dream descriptions   </Mark> 
 using text or voice input, capturing the essence of their dreamscapes.
            </p>

          
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 ">
            <p className="text-2xl leading-normal ">

              <Mark>AI-Powered Dream Expansion:</Mark>
Incorporate advanced AI models to expand 
and enrich the user's dream descriptions, 
infusing them with intricate details and emotions.
            </p>

          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 ">
            <p className="text-2xl leading-normal ">
         
            <Mark> Character Extraction</Mark>
Automatically identify characters and entities within the
 dream descriptions, generating a character list for further use.
            </p>

           
          </div>
        </div>
      </div>
    </Container>
  );
}

function Avatar(props) {
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
        {/* <Image
          src={props.image}
          width="40"
          height="40"
          alt="Avatar"
          placeholder="blur"
        /> */}
      </div>
      <div>
        <div className="text-lg font-medium">{props.name}</div>
        <div className="text-gray-600">{props.title}</div>
      </div>
    </div>
  );
}

function Mark(props) {
  return (
    <>
      {" "}
      <mark className="text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4">
        {props.children}
      </mark>{" "}
    </>
  );
}

export default Testimonials;