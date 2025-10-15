import { Button } from "@/components/ui/button";
import CreateAccountForm from "@/features/accountManagement/CreateAccountForm";
import ProfileCard from "@/features/accountManagement/ProfileCard";
import InviteLinkModal from "@/components/InviteLinkModal";
import { Plus, UserPlus } from 'lucide-react';
import { useState, useEffect } from "react";

function AccountManagement() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false);
  const [invitationToken, setInvitationToken] = useState<string | null>(null);

  // Check for invitation token in URL on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      setInvitationToken(token);
      setShowForm(true);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  function handleToggleForm() {
    setShowForm(!showForm);
    setInvitationToken(null); // Clear invitation token when manually opening form
  }

  function handleShowInviteModal() {
    setShowInviteModal(true);
  }

  return (
    <div>
      <p className="text-2xl font-semibold pt-2 p-2">Account Management</p>
      <div className="pt-4 pl-8 pb-8 flex justify-between items-center">
        <div className="flex gap-3">
          <Button
            onClick={handleToggleForm}
            disabled={showForm}
            variant="outline"
            size="lg"
            className="w-full md:w-auto cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Staff Directly
          </Button>
          
          <Button
            onClick={handleShowInviteModal}
            disabled={showForm}
            variant="default"
            size="lg"
            className="w-full md:w-auto cursor-pointer"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Generate Invite Link
          </Button>
        </div>
      </div>
      
      {showForm && (
        <CreateAccountForm 
          setShowForm={setShowForm} 
          invitationToken={invitationToken || undefined}
        />
      )}
      {!showForm && <ProfileCard />}
      
      <InviteLinkModal 
        isOpen={showInviteModal} 
        onClose={() => setShowInviteModal(false)} 
      />
    </div>
  );
}

export default AccountManagement;
