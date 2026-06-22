import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clapperboard, Share2, Download } from "lucide-react";

export const Route = createFileRoute("/_authenticated/home")({
  component: RouteComponent,
});

function RouteComponent() {
  const handleExportVideo = () => {
    // Export a demo MP4 blob. In production this would be the rendered project.
    const blob = new Blob([], { type: "video/mp4" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lumina-export-${Date.now()}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShareVideo = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Lumina video",
        text: "Check out my latest Lumina video.",
      });
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto p-4">
      <div>
        <h1 className="text-2xl font-bold">Lumina</h1>
        <p className="text-sm text-muted-foreground">AI-powered video creation studio.</p>
      </div>

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
