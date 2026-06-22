import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useLayout } from "@/hooks/useLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { BadgeInfo, Copy, Users, Building } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency, handleError } from "@/lib/utils";
import { APP_NAME } from "@/lib/constant";
import { toast } from "sonner";
import { useFetch } from "@/hooks/useFetch";
import Banner from "@/components/Banner";
import * as z from "zod";

const PayoutMethodSchema = z.object({
  bankName: z.string(),
  accountHolderName: z.string(),
  accountNumber: z.string(),
  routingNumber: z.string().optional(),
});

const ReferralSchema = z.object({
  referralEnabled: z.boolean(),
  referralLink: z.string(),
  totalReferrals: z.number(),
  activeReferrals: z.number(),
  totalEarnings: z.number(),
  payout: z.number(),
  currency: z.string(),
  payoutMethod: PayoutMethodSchema.nullable(),
});

type Referral = z.infer<typeof ReferralSchema>;

const defaultReferral: Referral = {
  referralEnabled: false,
  referralLink: "",
  totalReferrals: 0,
  activeReferrals: 0,
  totalEarnings: 0,
  payout: 0,
  currency: "NGN",
  payoutMethod: null,
};

function RouteComponent() {
  const [referral, setReferral] = useState<Referral>(defaultReferral);
  const [showPayoutForm, setShowPayoutForm] = useState(false);
  const [payoutForm, setPayoutForm] = useState<{
    bankName: string;
    accountHolderName: string;
    accountNumber: string;
    routingNumber?: string;
  }>({
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    routingNumber: "",
  });

  const { setTitle } = useLayout();
  const { doGET, doPOST } = useFetch();

  useEffect(() => {
    setTitle("Referrals");
  }, [setTitle]);

  useEffect(() => {
    (async () => {
      try {
        const response = await doGET("/api/v1/invoice/referral/details");
        if (response instanceof Error) throw response;

        const result = await response.json();
        if (!response.ok) throw new Error(result.message);

        const parsedData = ReferralSchema.parse(result.data);
        setReferral(parsedData);
        if (parsedData.payoutMethod) {
          setPayoutForm(parsedData.payoutMethod);
        }
      } catch (error: unknown) {
        handleError(error);
      }
    })();
  }, [doGET]);

  const handleCopy = async (text: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
      } finally {
        document.body.removeChild(textarea);
      }
    }
    toast.success("Copied to clipboard");
  };

  const handleReferralStatus = async () => {
    try {
      const response = await doPOST("/api/v1/invoice/referral/toggle", { referralEnabled: !referral.referralEnabled });
      if (response instanceof Error) throw response;

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setReferral({ ...referral, referralEnabled: !referral.referralEnabled });
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const handleSavePayoutMethod = async () => {
    try {
      const response = await doPOST("/api/v1/invoice/referral/payout-method", payoutForm);
      if (response instanceof Error) throw response;

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      toast.success("Payout method saved");
      setReferral({
        ...referral,
        payoutMethod: payoutForm,
      });
      setShowPayoutForm(false);
    } catch (error: unknown) {
      handleError(error);
    }
  };

  return (
    <div className="space-y-8 mb-8">
      <Banner backgroundColor={"bg-sky-100"} icon={<BadgeInfo />} text={"Coming soon!"} />
      <Card>
        <CardHeader>
          <CardTitle>Join Our Referral Program</CardTitle>
          <CardDescription>Earn rewards by referring your friends to join {APP_NAME} </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Checkbox
              checked={referral.referralEnabled}
              onCheckedChange={handleReferralStatus}
              id="referral-checkbox"
              name="referral-checkbox"
            />
            <Label htmlFor="referral-checkbox">{referral.referralEnabled ? "Leave" : "Join Now"}</Label>
          </div>
        </CardContent>
      </Card>
      {referral.referralEnabled && (
        <>
          <div className="grid gap-4 grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Total Referrals</CardTitle>
                <CardDescription>The total number of users you have referred.</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="flex gap-4 items-center">
                  <Users className="text-sky-700" />
                  <h1 className="text-2xl md:text-4xl">{referral.totalReferrals}</h1>
                </span>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Referrals</CardTitle>
                <CardDescription>The number of referred users with an active subscription.</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="flex gap-4 items-center">
                  <Users className="text-green-700" />
                  <h1 className="text-2xl md:text-4xl">{referral.activeReferrals}</h1>
                </span>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Earnings</CardTitle>
                <CardDescription>The total earnings from your referrals.</CardDescription>
              </CardHeader>
              <CardContent>
                <h1 className="text-xl md:text-2xl">{formatCurrency(referral.totalEarnings, referral.currency)}</h1>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payout</CardTitle>
                <CardDescription>The potential payout for your referrals this month.</CardDescription>
              </CardHeader>
              <CardContent>
                <h1 className="text-xl md:text-2xl">{formatCurrency(referral.payout, referral.currency)}</h1>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Your Referral Link</CardTitle>
              <CardDescription>Share this link to earn rewards when your friends subscribe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Input type="text" value={referral.referralLink} readOnly className="w-90" />
                <Copy
                  className="ml-2 text-gray-600 hover:cursor-pointer hover:text-gray-800"
                  onClick={() => handleCopy(referral.referralLink)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Payout Method
              </CardTitle>
              <CardDescription>Add your bank account details to receive referral payouts.</CardDescription>
            </CardHeader>
            <CardContent>
              {showPayoutForm ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bank-name">Bank Name</Label>
                    <Input
                      id="bank-name"
                      value={payoutForm.bankName}
                      onChange={(e) => setPayoutForm({ ...payoutForm, bankName: e.target.value })}
                      placeholder="Enter bank name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="account-holder">Account Holder Name</Label>
                    <Input
                      id="account-holder"
                      value={payoutForm.accountHolderName}
                      onChange={(e) => setPayoutForm({ ...payoutForm, accountHolderName: e.target.value })}
                      placeholder="Enter account holder name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="account-number">Account Number</Label>
                    <Input
                      id="account-number"
                      value={payoutForm.accountNumber}
                      onChange={(e) => setPayoutForm({ ...payoutForm, accountNumber: e.target.value })}
                      placeholder="Enter account number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="routing-number">Routing / Sort Code (optional)</Label>
                    <Input
                      id="routing-number"
                      value={payoutForm.routingNumber}
                      onChange={(e) => setPayoutForm({ ...payoutForm, routingNumber: e.target.value })}
                      placeholder="Enter routing number"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSavePayoutMethod}>Save</Button>
                    <Button variant="outline" onClick={() => setShowPayoutForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  {referral.payoutMethod ? (
                    <div className="space-y-2">
                      <p>
                        <strong>Bank:</strong> {referral.payoutMethod.bankName}
                      </p>
                      <p>
                        <strong>Account Holder:</strong> {referral.payoutMethod.accountHolderName}
                      </p>
                      <p>
                        <strong>Account Number:</strong> {referral.payoutMethod.accountNumber}
                      </p>
                      {referral.payoutMethod.routingNumber && (
                        <p>
                          <strong>Routing Number:</strong> {referral.payoutMethod.routingNumber}
                        </p>
                      )}
                      <Button variant="outline" onClick={() => setShowPayoutForm(true)}>
                        Edit
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-muted-foreground mb-4">
                        No payout method set. Please add your bank details to receive payouts.
                      </p>
                      <Button onClick={() => setShowPayoutForm(true)}>Add Bank Details</Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h1>1. Share Your Referral Link</h1>
                <p className="text-muted-foreground">
                  Share your referral link with your friends to earn rewards when they subscribe.
                </p>
              </div>
              <div>
                <h1>2. Your Friend Subscribe</h1>
                <p className="text-muted-foreground">Your friend creates an account, and purchases a subscription.</p>
              </div>
              <div>
                <h1>3. Earn Rewards</h1>
                <p className="text-muted-foreground">
                  You get 5% of each friend's subscription amount for as long as they are subscribed.
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

export const Route = createFileRoute("/_authenticated/settings/referral")({
  component: RouteComponent,
});
