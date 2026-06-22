import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clapperboard, ImagePlus, Share2, Download } from "lucide-react";
import { isNativePlatform, pickImage, shareText, saveBlob } from "@shared/mobile";

export const Route = createFileRoute("/_authenticated/home")({
  component: RouteComponent,
});

function RouteComponent() {
  const [logo, setLogo] = useState<string | null>(null);

  const handlePickLogo = async () => {
    const photo = await pickImage();
    if (photo?.dataUrl) {
      setLogo(photo.dataUrl);
    }
  };

  const handleExportVideo = async () => {
    // Export a demo MP4 blob. In production this would be the rendered project.
    const blob = new Blob([], { type: "video/mp4" });
    await saveBlob(blob, `lumina-export-${Date.now()}.mp4`, "video/mp4");
  };

  const handleShareVideo = async () => {
    await shareText("Check out my latest Lumina video.", "Lumina video");
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto p-4">
      <div>
        <h1 className="text-2xl font-bold">Lumina</h1>
        <p className="text-sm text-muted-foreground">AI-powered video creation studio.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Brand kit logo</CardTitle>
          <CardDescription>Upload your brand logo from the camera or gallery.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-xl bg-muted flex items-center justify-center overflow-hidden border">
              {logo ? (
                <img src={logo} alt="Brand logo" className="size-full object-cover" />
              ) : (
                <ImagePlus className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            {isNativePlatform() && (
              <Button variant="outline" onClick={handlePickLogo}>
                <ImagePlus className="mr-2 h-4 w-4" />
                Pick logo
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Export video</CardTitle>
          <CardDescription>Share or download your rendered project.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video rounded-xl bg-muted flex items-center justify-center border">
            <Clapperboard className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleExportVideo}>
              <Download className="mr-2 h-4 w-4" />
              Export MP4
            </Button>
            <Button variant="outline" onClick={handleShareVideo}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
