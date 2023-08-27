import { Link } from "react-router-dom";
// import Image from "next/image";
import React from "react";
import Container from "./container";

export default function Footer() {
  const navigation = [
    "Product",
    "Features",
    "Pricing",
    "Company",
    "Blog",
  ];
  const legal = ["Terms", "Privacy", "Legal"];
  return (
    <div className="relative">
      <Container>
        <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-gray-100 dark:border-trueGray-700 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div>
              {" "}
              <Link href="/" className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 ">
                    {/* <Image
                      src="/img/logo.svg"
                      alt="N"
                      width="32"
                      height="32"
                      className="w-8"
                    /> */}
                  <span>DreamScribe:AI Reverie Forge</span>
              </Link>
            </div>

            <div className="max-w-md mt-4 text-gray-500 ">
            "Dream Scribe" is an innovative content creation platform that merges the realms of dreams and storytelling through AI-powered dream expansion and content generation. 
            Users can transform their dream experiences into captivating narratives
              
            </div>

         
          </div>

          <div>
          
          </div>
          <div>
           
          </div>
         
        </div>

        <div className="my-10 text-sm text-center text-gray-600 ">
          Copyright © {new Date().getFullYear()}. Made with ♥ by{" Team Debug Thugs"}
         
       
        </div>
      </Container>
  
    </div>
  );
}


