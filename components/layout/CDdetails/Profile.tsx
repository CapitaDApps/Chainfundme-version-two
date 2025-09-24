import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PopupProfile from "../profile/PopupProfile";

function Profile() {
  return (
    <div className="mt-6 mb-6">
      <div className="flex flex-row space-x-4 items-center mb-2">
        <Avatar className="w-10 h-10 mr-1">
          <AvatarImage src="/layout/dp.png" />
          <AvatarFallback>
            <p>K</p>
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">Kareem Benzema</h2>
          <p className="text-sm text-gray-500">Campaign Creator</p>
        </div>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="font-semibold text-xs py-2 px-6 rounded-2xl cursor-pointer"
          >
            Check Profile
          </Button>
        </PopoverTrigger>

        <PopoverContent
          side="left"
          align="center"
          sideOffset={10}
          className="bg-white rounded-xl shadow-md p-6 w-[400px] md:w-[350px]"
        >
          <PopupProfile />
        </PopoverContent>
      </Popover>
    </div>
  );
}
export default Profile;
