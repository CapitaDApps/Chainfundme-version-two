// "use client";

// import { useCampaign } from "@/services/api/hooks/campaign/useCampaign";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft, Clock, User, MapPin } from "lucide-react";
// import Image from "next/image";
// import { Progress } from "@/components/ui/progress";

// interface CampaignDetailsClientProps {
//   campaignId: string;
// }

// export default function CampaignDetailsClient({
//   campaignId,
// }: CampaignDetailsClientProps) {
//   const { campaign, retrievingCampaign, error } = useCampaign(campaignId);
//   const router = useRouter();

//   if (retrievingCampaign) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2379BC] mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading campaign details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-600 mb-4">Failed to load campaign details</p>
//           <p className="text-gray-600 mb-4">{error.message}</p>
//           <Button onClick={() => router.back()}>Go Back</Button>
//         </div>
//       </div>
//     );
//   }

//   if (!campaign) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-gray-600 mb-4">Campaign not found</p>
//           <Button onClick={() => router.back()}>Go Back</Button>
//         </div>
//       </div>
//     );
//   }

//   // Calculate time left
//   const endDate = new Date(campaign.endDate);
//   const now = new Date();
//   const timeLeft =
//     endDate > now
//       ? Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
//       : 0;

//   // Calculate progress percentage
//   const progressPercentage =
//     (campaign.currentAmount / campaign.targetAmount) * 100;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Back Button */}
//         <Button
//           variant="ghost"
//           onClick={() => router.back()}
//           className="mb-6 flex items-center gap-2"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           Back to Explore
//         </Button>

//         {/* Campaign Header */}
//         <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Campaign Image */}
//             <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden">
//               <Image
//                 src={
//                   campaign.image || campaign.coverImage || "/layout/Frame.png"
//                 }
//                 alt={campaign.title}
//                 fill
//                 className="object-cover"
//               />
//             </div>

//             {/* Campaign Info */}
//             <div className="space-y-6">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900 mb-4">
//                   {campaign.title}
//                 </h1>
//                 <p className="text-gray-600 text-lg leading-relaxed">
//                   {campaign.description}
//                 </p>
//               </div>

//               {/* Creator Info */}
//               <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
//                 <div className="relative w-12 h-12 rounded-full overflow-hidden">
//                   <Image
//                     src={
//                       campaign.owner?.profilePicture || "/layout/Ellipse.png"
//                     }
//                     alt={campaign.owner?.name || "Creator"}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-900">
//                     {campaign.owner?.name || "Anonymous"}
//                   </p>
//                   <p className="text-sm text-gray-600">Campaign Creator</p>
//                 </div>
//               </div>

//               {/* Campaign Stats */}
//               <div className="space-y-4">
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <Clock className="w-5 h-5" />
//                   <span>
//                     {timeLeft > 0 ? `${timeLeft} days left` : "Campaign ended"}
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2 text-gray-600">
//                   <MapPin className="w-5 h-5" />
//                   <span>{campaign.chain?.chain || "Blockchain"}</span>
//                 </div>

//                 <div className="flex items-center gap-2 text-gray-600">
//                   <User className="w-5 h-5" />
//                   <span>{campaign.likes} supporters</span>
//                 </div>
//               </div>

//               {/* Progress */}
//               <div className="space-y-3">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Progress</span>
//                   <span className="font-semibold">
//                     {progressPercentage.toFixed(1)}%
//                   </span>
//                 </div>
//                 <Progress value={progressPercentage} className="h-3" />
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">
//                     ${campaign.currentAmount.toLocaleString()} raised
//                   </span>
//                   <span className="text-gray-600">
//                     of ${campaign.targetAmount.toLocaleString()}
//                   </span>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-4">
//                 <Button className="flex-1 bg-[#2379BC] hover:bg-[#1e6ba8]">
//                   Donate Now
//                 </Button>
//                 <Button variant="outline" className="flex-1">
//                   Share Campaign
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Campaign Details */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Campaign Story */}
//           <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">
//               Campaign Story
//             </h2>
//             <div className="prose max-w-none">
//               <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
//                 {campaign.description}
//               </p>
//             </div>
//           </div>

//           {/* Campaign Info Sidebar */}
//           <div className="space-y-6">
//             {/* Campaign Details */}
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Campaign Details
//               </h3>
//               <div className="space-y-3 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Category:</span>
//                   <span className="font-medium capitalize">
//                     {campaign.category}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Start Date:</span>
//                   <span className="font-medium">
//                     {new Date(campaign.startDate).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">End Date:</span>
//                   <span className="font-medium">
//                     {new Date(campaign.endDate).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Status:</span>
//                   <span
//                     className={`font-medium ${
//                       campaign.published ? "text-green-600" : "text-yellow-600"
//                     }`}
//                   >
//                     {campaign.published ? "Published" : "Draft"}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Recent Activity */}
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Recent Activity
//               </h3>
//               <div className="space-y-3 text-sm text-gray-600">
//                 <p>• {campaign.seen} people viewed this campaign</p>
//                 <p>• {campaign.comments?.length || 0} comments</p>
//                 <p>• {campaign.likes} likes</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
