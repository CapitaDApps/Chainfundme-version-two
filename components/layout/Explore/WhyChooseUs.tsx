import Image from "next/image";
export default function WhyChooseUse() {
  const features = [
    {
      title: "0% Donor Fees",
      desc: "Donors don’t pay any fees, so more goes to the cause.",
      image: "/explore/streamline.png",
    },
    {
      title: "Low Platform Fees",
      desc: "Creators pay only 5%.",
      image: "/explore/Group.png",
    },
    {
      title: "Global Donations",
      desc: "Receive donations worldwide using stablecoins & tokens.",
      image: "/explore/americas.png",
    },
    {
      title: "Frictionless Flat Donations",
      desc: "No gateway fees for USD, NGN, GBP, EUR, Cedis, KSH, Rands.",
      image: "/explore/card.png",
    },
    {
      title: "Multi-Chain & Multi-Fiat",
      desc: "Deploy campaigns on multiple blockchains & currencies.",
      image: "/explore/cryptocurrency.png",
    },
  ];

  return (
    <section className="py-16 bg-white text-center px-4 md:px-10 relative">
      <h2 className="text-[#1E1E1E] text-2xl md:text-3xl font-bold mb-4">
        WHY CHOOSE CHAINFUNDME
      </h2>
      <p className="text-[#666666] text-sm md:text-lg font-medium max-w-3xl mx-auto mb-10">
        Chainfundme is built for Individuals, Charities, DAOs, Creators,
        Startups, Communities & Religious Organizations
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-6">
        {features.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="bg-[#F8F9FC] rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col items-center text-center"
          >
            <Image src={item.image} alt="" width="70" height="70" />

            <h3 className="text-[#1E1E1E] font-semibold text-lg mb-2">
              {item.title}
            </h3>
            <p className="text-[#666666] text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
        {features.slice(3).map((item, index) => (
          <div
            key={index}
            className="bg-[#F8F9FC] rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 w-full sm:w-[370px] flex flex-col items-center text-center"
          >
            <Image src={item.image} alt="" width="70" height="70" />
            <h3 className="text-[#1E1E1E] font-semibold text-lg mb-2">
              {item.title}
            </h3>
            <p className="text-[#666666] text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
