import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PopupProfile from "../profile/PopupProfile";
import { UserDocument } from "@/types/api";

function Profile({ owner }: { owner: UserDocument }) {
  return (
    <div className="">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-3">
        <div className="flex items-center space-x-3 mb-2 md:mb-0">
          <Avatar className="w-12 h-12 md:w-10 md:h-10">
            <AvatarImage src={owner.profilePicture} />
            <AvatarFallback>
              <p>K</p>
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-base md:text-sm">{owner.name}</h2>
            <p className="text-xs md:text-sm text-gray-500">Campaign Creator</p>
          </div>
        </div>
      </div>

      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="font-semibold text-xs py-2 px-6 max-w-[180px] md:max-w-[200px] rounded-2xl cursor-pointer w-full md:w-auto"
            >
              Check Profile
            </Button>
          </PopoverTrigger>

          <PopoverContent
            side="bottom"
            align="center"
            sideOffset={8}
            className="bg-white rounded-xl shadow-lg p-6 w-[90vw] max-w-[310px] md:max-w-[350px] ml-3"
          >
            <PopupProfile owner={owner} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
export default Profile;
