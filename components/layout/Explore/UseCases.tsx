import React from "react";
import Link from "next/link";

import { Heart, Users2, Building2, ArrowRight } from "lucide-react";

const useCasesData = [
  {
    icon: Heart,
    title: "For Individuals",
    description:
      "Get the support you need for personal causes — from medical care to education and creative pursuits.",
    link: "/how-it-works",
  },
  {
    icon: Users2,
    title: "For Communities",
    description:
      "Empower your community to come together, raise funds, and drive real local impact through collective action.",
    link: "/how-it-works",
  },
  {
    icon: Building2,
    title: "For Organizations",
    description:
      "Streamline your social impact projects — launch CSR initiatives and fund community programs seamlessly.",
    link: "/get-api",
  },
];

type UseCaseCardProp = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  title: string;
  description: string;
  link: string;
};

const UseCaseCard = ({
  icon: Icon,
  title,
  description,
  link,
}: UseCaseCardProp) => {
  return (
    <div className="flex flex-col p-6 sm:p-8 bg-white rounded-xl shadow-lg border border-gray-200 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="mb-6">
        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary-accent" />
      </div>

      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
        {title}
      </h3>

      <p className="text-sm md:text-base text-gray-600 mb-6 flex-grow min-h-[60px]">
        {description}
      </p>

      {/* Learn More Link  */}
      <Link
        href={link}
        className="flex items-center group w-fit"
        aria-label={`Learn more about ${title}`}
      >
        <p className="text-primary-accent font-medium hover:text-primary-accent">
          Learn More
        </p>
        <ArrowRight className="w-4 h-4 ml-2 text-primary-accent font-medium hover:text-primary-accent transform group-hover:rotate-45 transition-transform duration-300" />
      </Link>
    </div>
  );
};

const UseCases = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 mt-10 px-4 sm:px-10 lg:px-14 xl:px-20">
      <div className="w-full max-w-7xl">
        {/* Header Section */}
        <header className="text-center mb-12 sm:mb-16">
          <h1 className="text-[#1E1E1E] text-2xl md:text-3xl font-bold mb-3">
            Use Cases
          </h1>
          <p className="text-[#666666] text-sm md:text-lg font-medium ">
            Explore how ChainFundMe helps you make impact, your way.
          </p>
        </header>

        {/* Cards Wrapper (Responsive Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {useCasesData.map((useCase) => (
            <UseCaseCard
              key={useCase.title}
              icon={useCase.icon}
              title={useCase.title}
              description={useCase.description}
              link={useCase.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UseCases;
