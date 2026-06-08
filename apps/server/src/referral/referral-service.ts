export function generateReferralCode(name: string): string {
    return name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

export function generateReferralLink(env: string | null = null, code: string | null): string {
    if (!code) return "No referral code";

    if (env && env === "dev") return `http://localhost:5173/signup?referral=${code}`;
    else return `https://invoice.acorp.app/signup?referral=${code}`;
}
