import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useLayout } from "@/hooks/useLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Copy, Users, BadgeInfo } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { APP_NAME } from "@/lib/constant";
import Banner from "@/components/Banner";
import { toast } from "sonner";
import { useFetch } from "@/hooks/useFetch";
import * as z from "zod";

const ReferralSchema = z.object({
  referralEnabled: z.boolean(),
  referralLink: z.string(),
  totalReferrals: z.number(),
  activeReferrals: z.number(),
  totalEarnings: z.number(),
  payout: z.number(),
});

type Referral = z.infer<typeof ReferralSchema>;

const defaultReferral: Referral = {
  referralEnabled: false,
  referralLink: "",
  totalReferrals: 0,
  activeReferrals: 0,
  totalEarnings: 0,
  payout: 0,
};

function RouteComponent() {
  const [referral, setReferral] = useState<Referral>(defaultReferral);

  const { setTitle } = useLayout();
  const { doGET } = useFetch();

  useEffect(() => {
    setTitle("Referrals");
  }, [setTitle]);

  useEffect(() => {
    (async () => {
      try {
        const response = await doGET("/api/v1/referral/details");
        if (response instanceof Error) throw response;

        const result = await response.json();
        if (!response.ok) throw new Error(result.message);

        const parsedData = ReferralSchema.parse(result.data);
        setReferral(parsedData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [doGET]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleReferralStatus = () => {
    setReferral({ ...referral, referralEnabled: !referral.referralEnabled });
  };

  return (
    <div className="space-y-8 mb-8">
      <Banner backgroundColor="bg-sky-100" icon={<BadgeInfo />} text="Coming soon!" />
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
                <h1 className="text-xl md:text-2xl">{formatCurrency(referral.totalEarnings, "NGN")}</h1>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payout</CardTitle>
                <CardDescription>The potential payout for your referrals this month.</CardDescription>
              </CardHeader>
              <CardContent>
                <h1 className="text-xl md:text-2xl">{formatCurrency(referral.payout, "NGN")}</h1>
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
