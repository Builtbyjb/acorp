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

function RouteComponent() {
  const [referralEnabled, setReferralEnabled] = useState(true);
  const { setTitle } = useLayout();

  useEffect(() => {
    setTitle("Referrals");
  }, [setTitle]);

  const referralLink = "https://invoice.acorp.app/ref/USER12345";

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
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
              checked={referralEnabled}
              onCheckedChange={setReferralEnabled}
              id="referral-checkbox"
              name="referral-checkbox"
            />
            <Label htmlFor="referral-checkbox">Join Now</Label>
          </div>
        </CardContent>
      </Card>
      {referralEnabled && (
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
                  <h1 className="text-2xl md:text-4xl">1578</h1>
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
                  <h1 className="text-2xl md:text-4xl">127</h1>
                </span>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Earnings</CardTitle>
                <CardDescription>The total earnings from your referrals.</CardDescription>
              </CardHeader>
              <CardContent>
                <h1 className="text-xl md:text-2xl">{formatCurrency(350_542, "NGN")}</h1>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payout</CardTitle>
                <CardDescription>The potential payout for your referrals this month.</CardDescription>
              </CardHeader>
              <CardContent>
                <h1 className="text-xl md:text-2xl">{formatCurrency(35_420, "NGN")}</h1>
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
                <Input type="text" value={referralLink} readOnly className="w-90" />
                <Copy
                  className="ml-2 text-gray-600 hover:cursor-pointer hover:text-gray-800"
                  onClick={() => handleCopy(referralLink)}
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
