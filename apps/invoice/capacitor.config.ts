import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "app.acorp.invoice",
    appName: "Invoice",
    webDir: "dist",
    server: {
        androidScheme: "https",
        iosScheme: "https",
        hostname: "app.acorp.invoice",
    },
    plugins: {
        SplashScreen: {
            launchAutoHide: false,
        },
        StatusBar: {
            style: "dark",
        },
    },
};

export default config;
