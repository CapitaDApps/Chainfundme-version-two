import CreateCamBtn from "@/components/layout/CreateCamBtn";
import Image from "next/image";

function HowItWorksPage() {
  return (
    <div className="relative mb-20 mt-8 md:mt-0">
      <div className="h-[100dvh] sm:min-h-fit px-4 md:px-0 py-24 md:py-18 md:mt-8">
        <div className="flex flex-col md:flex-row items-center md:justify-between md:gap-10 lg:gap-24 md:px-0 md:pl-14 lg:pl-20 text-center md:text-left ">
          <div className="">
            <h1 className="text-[#1038A2] text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold pb-6">
              Your Step-by-Step Guide to Fundraising on ChainFundMe
            </h1>
            <p className="max-w-md mx-auto md:mx-0 pb-8 text-sm md:text-base md:px-0 px-4">
              ChainFundMe — a new way to make a bigger impact on the causes you
              care about.
            </p>
            <CreateCamBtn />
          </div>

          <div className="hidden md:block w-fit">
            <Image
              src="/layout/iPhone.png"
              alt="iPhone"
              width={1000}
              height={1000}
              className="w-4xl h-4xl"
            />
          </div>

          <div className="block md:hidden mt-8">
            <Image src="/layout/m.png" alt="iPhone" width={300} height={300} />
          </div>
        </div>
      </div>
      <div className="px-4 md:px-14 lg:px-20 py-10 text-lg">
        <h1 className="font-semibold">
          Here’s what to expect when fundraising on ChainFundMe:
        </h1>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="order-1 md:order-2">
            <div className="bg-[#A9EEFF] rounded-xl p-8 max-w-[37rem] flex justify-center items-center mt-6">
              <Image
                src="/layout/prof.png"
                alt="Profile"
                width={400}
                height={400}
              />
            </div>
          </div>
          <div className="order-2 md:order-1">
            <p className="font-semibold mb-4">1. Create Your Profile</p>
            <p className="mt-2 max-w-xl text-[16px]">
              Before launching your first campaign, you’ll set up your profile
              in minutes:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-4 text-sm max-w-[25rem]">
              <li>Connect your wallet securely to receive contributions.</li>
              <li>
                Upload a profile picture and add your name or a chosen display
                name.
              </li>
              <li>
                Optionally link your Twitter account to boost credibility.
              </li>
              <li>
                Write a short bio so contributors know who they’re supporting.
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="order-1 md:order-2">
            <div className="bg-[#FFEAA9] rounded-xl p-8 max-w-[37rem] flex justify-center items-center mt-6">
              <Image
                src="/layout/ho1.png"
                alt="Campaign"
                width={400}
                height={400}
              />
            </div>
          </div>
          <div className="order-2 md:order-1">
            <p className="font-semibold mb-4">2. Launch Your Campaign</p>
            <p className="mt-2 max-w-xl text-[16px]">
              Once your profile is ready, it’s time to create your campaign:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-4 text-sm max-w-[25rem]">
              <li>Set your funding goal based on what you need to raise.</li>
              <li>
                Choose up to three tokens from supported networks like Base,
                Solana, and BNB.
              </li>
              <li>
                In your fundraiser description, share the reason you are
                fundraising in 1–3 paragraphs.
              </li>
              <li>
                Add details such as:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Who or what you’re fundraising for</li>
                  <li>How funds will be used</li>
                </ul>
              </li>
              <li>
                Pick your campaign duration — you control how long it runs.
              </li>
            </ul>
          </div>
        </div>

        {/* Step 3 */}
        <div className="pt-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="order-1 md:order-2">
            <div className="bg-[#C9FFA9] rounded-xl p-8 max-w-[37rem] flex justify-center items-center mt-6">
              <Image
                src="/layout/ho2.png"
                alt="Share Campaign"
                width={400}
                height={400}
              />
            </div>
          </div>
          <div className="order-2 md:order-1">
            <p className="font-semibold mb-4">3. Share Your Campaign</p>
            <p className="mt-2 max-w-xl text-[16px]">
              After launch, sharing is key to gaining momentum:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-4 text-sm max-w-[25rem]">
              <li>
                Copy your unique campaign link and share it with friends,
                family, or your community.
              </li>
              <li>
                Spread the word on social media to reach more contributors.
              </li>
              <li>
                Get a verified badge to be featured in the Explore section and
                receive social media promotion from ChainFundMe.
              </li>
              <li>
                Keep sharing consistently throughout the campaign to increase
                your chances of success.
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="order-1 md:order-2">
            <div className="bg-[#F2A9FF] rounded-xl p-8 max-w-[37rem] flex justify-center items-center mt-6">
              <Image
                src="/layout/ho3.png"
                alt="Track Contributions"
                width={400}
                height={400}
              />
            </div>
          </div>
          <div className="order-2 md:order-1">
            <p className="font-semibold mb-4">
              4. Track Contributions in Real Time
            </p>
            <p className="mt-2 max-w-xl text-[16px]">
              We make it easy to monitor your campaign’s progress:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-4 text-sm max-w-[25rem]">
              <li>
                See a live progress bar that tracks total contributions toward
                your goal.
              </li>
              <li>
                Receive funds directly to your connected wallet — no need to hit
                your goal first.
              </li>
              <li>
                View detailed contribution history so you know exactly where
                support is coming from.
              </li>
              <li>
                Appreciate your supporters by thanking them when they
                contribute.
              </li>
              <li>
                Post updates using the Highlight feature to keep backers
                informed and engaged.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorksPage;
