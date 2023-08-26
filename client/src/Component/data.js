import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,

} from "@heroicons/react/24/solid";

import benefitOneImg from "../Assets/benefit-one.jpg";

const benefitOne = {
  title: "Highlight your benefits",
  desc: "With DreamScribe, you have the tools to turn your dreamscapes into captivating content that sparks creativity, connects communities, and unlocks new dimensions of storytelling.  ",
  image:benefitOneImg,
  bullets: [
    {
      title: "Unleash Creative Imagination",
      desc: "Unleash your creative imagination by turning your dreams into captivating stories, art, and more.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Insights into Dream Symbolism",
      desc: "Gain deeper insights into the symbolism and meanings of your dreams with AI-powered dream analysis tools. Discover hidden layers and emotions behind your dream experiences.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Personal Growth and Exploration",
      desc: "DreamScribe encourages you to explore the world of lucid dreaming and self-expression.",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};




export {benefitOne};
