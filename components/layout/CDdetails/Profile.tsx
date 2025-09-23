import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
        <div className="">
          <h2 className="font-semibold">Kareem Benzema</h2>
          <p>Campaign Creator</p>
        </div>
      </div>
      <Button
        variant="outline"
        className="font-semibold text-xs py-2 px-6 rounded-2xl cursor-pointer"
      >
        Check Profile
      </Button>
    </div>
  );
}
export default Profile;
