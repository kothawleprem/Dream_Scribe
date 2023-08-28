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

        <div className="my-10 text-sm text-center text-gray-600 ">
          Copyright © {new Date().getFullYear()}. Made with ♥ by{" Team Debug Thugs"}
         
       
        </div>
      </Container>
  
    </div>
  );
}


