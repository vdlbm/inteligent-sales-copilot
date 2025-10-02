import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Send, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EmailDraft } from "@/types/email";

interface ComposeEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ComposeEmailDialog({ open, onOpenChange }: ComposeEmailDialogProps) {
  const { toast } = useToast();
  const [showCcBcc, setShowCcBcc] = useState(false);
  const [confidential, setConfidential] = useState(false);
  const [showConfidentialWarning, setShowConfidentialWarning] = useState(false);
  const [showSendConfirmation, setShowSendConfirmation] = useState(false);
  const [draft, setDraft] = useState<Partial<EmailDraft>>({
    to: "",
    cc: "",
    bcc: "",
    subject: "",
    body: "",
    confidential: false,
    user_confirmation_for_confidential: false,
    audit_hash: "",
  });

  const handleConfidentialToggle = (checked: boolean) => {
    if (checked) {
      setShowConfidentialWarning(true);
    } else {
      setConfidential(false);
      setDraft({ ...draft, confidential: false, user_confirmation_for_confidential: false });
    }
  };

  const handleConfidentialConfirm = () => {
    setConfidential(true);
    setDraft({ 
      ...draft, 
      confidential: true, 
      user_confirmation_for_confidential: true,
      audit_hash: generateAuditHash()
    });
    setShowConfidentialWarning(false);
    toast({
      title: "Confidential mode enabled",
      description: "This email will be marked as confidential.",
    });
  };

  const handleConfidentialCancel = () => {
    setConfidential(false);
    setDraft({ ...draft, confidential: false, user_confirmation_for_confidential: false });
    setShowConfidentialWarning(false);
  };

  const generateAuditHash = () => {
    const timestamp = Date.now();
    const draftId = `draft_${timestamp}`;
    const hashInput = `${draftId}_${timestamp}`;
    return btoa(hashInput).substring(0, 32);
  };

  const handleSend = () => {
    if (confidential) {
      setShowSendConfirmation(true);
    } else {
      sendEmail();
    }
  };

  const sendEmail = () => {
    // Simulate sending
    const finalDraft: EmailDraft = {
      ...draft as EmailDraft,
      audit_hash: draft.audit_hash || generateAuditHash()
    };

    console.log("Sending email:", {
      ...finalDraft,
      body: confidential ? "[REDACTED - CONFIDENTIAL]" : finalDraft.body
    });

    toast({
      title: "Email sent",
      description: confidential ? "Confidential email sent securely." : "Email sent successfully.",
    });

    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setDraft({
      to: "",
      cc: "",
      bcc: "",
      subject: "",
      body: "",
      confidential: false,
      user_confirmation_for_confidential: false,
      audit_hash: "",
    });
    setConfidential(false);
    setShowCcBcc(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Compose Email</DialogTitle>
              <div className="flex items-center gap-3">
                {confidential && (
                  <Badge variant="destructive" className="gap-1">
                    <Shield className="h-3 w-3" />
                    CONFIDENTIAL
                  </Badge>
                )}
                <div className="flex items-center gap-2">
                  <Label htmlFor="confidential" className="text-sm cursor-pointer">
                    Confidential
                  </Label>
                  <Switch
                    id="confidential"
                    checked={confidential}
                    onCheckedChange={handleConfidentialToggle}
                    title="Confidential emails are encrypted and limited in visibility. In case of security or legal review, authorized access may be performed."
                  />
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                type="email"
                placeholder="recipient@example.com"
                value={draft.to}
                onChange={(e) => setDraft({ ...draft, to: e.target.value })}
              />
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCcBcc(!showCcBcc)}
              className="gap-2"
            >
              {showCcBcc ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              {showCcBcc ? "Hide" : "Show"} Cc/Bcc
            </Button>

            {showCcBcc && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="cc">Cc</Label>
                  <Input
                    id="cc"
                    type="email"
                    placeholder="cc@example.com"
                    value={draft.cc}
                    onChange={(e) => setDraft({ ...draft, cc: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bcc">Bcc</Label>
                  <Input
                    id="bcc"
                    type="email"
                    placeholder="bcc@example.com"
                    value={draft.bcc}
                    onChange={(e) => setDraft({ ...draft, bcc: e.target.value })}
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Email subject"
                value={draft.subject}
                onChange={(e) => setDraft({ ...draft, subject: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="body">Body</Label>
              <Textarea
                id="body"
                placeholder="Write your message..."
                className="min-h-[300px]"
                value={draft.body}
                onChange={(e) => setDraft({ ...draft, body: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSend} className="gap-2">
                <Send className="h-4 w-4" />
                Send
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confidential Warning Modal */}
      <AlertDialog open={showConfidentialWarning} onOpenChange={setShowConfidentialWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confidential mode enabled</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              Note: marking this email as confidential prevents most users from reading its contents 
              within the app, but in the event of a data leak, breach, or authorized forensic review, 
              access to confidential emails may be required to investigate. Do you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleConfidentialCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfidentialConfirm}>
              Proceed (Mark Confidential)
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Send Confirmation for Confidential Emails */}
      <AlertDialog open={showSendConfirmation} onOpenChange={setShowSendConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm send</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to send a confidential email. Confirm send.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={sendEmail}>Confirm Send</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
