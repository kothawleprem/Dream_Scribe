import React from "react";
import Container from "./container";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-indigo-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300">
                    {item.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
}

const faqdata = [
  {
    question: "What is DreamScribe?",
    answer: "DreamScribe is an AI-powered platform that transforms your dream experiences into captivating narratives, stories, and more. It merges the world of dreams with creative content creation.",
  },
  {
    question: "How does DreamScribe work?",
    answer: "DreamScribe uses advanced AI models to expand and enrich your dream descriptions. You can then modify and personalize the AI-generated content to create unique stories and art.    ",
  },
  {
    question: "What types of content can I create?",
    answer:
      "With DreamScribe, you can create various forms of content, including short stories, movie scripts, poems, and visual art, all inspired by your dreams. ",
  },
  {
    question: "How do I get started on DreamScribe? ",
    answer:
      "To get started, sign up for an account on our platform, record your dream descriptions, and let AI and your creativity do the rest.  ",
  },
];

export default Faq;