
import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { TranscriptionDisplay } from "@/components/transcription-display";
import { mockTranscription } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showTranscription, setShowTranscription] = useState(false);

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsUploading(false);
    setShowTranscription(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-3">
            Audio Transcription
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your audio or video file and get an accurate transcription powered by AI.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6">
                <h2 className="text-2xl font-semibold leading-none tracking-tight mb-4">
                  Upload Your File
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Supported formats: MP3, MP4, WAV, M4A
                </p>
                <FileUpload
                  value={file}
                  onChange={setFile}
                  onUpload={handleUpload}
                  isUploading={isUploading}
                />
              </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="font-medium mb-2">How it works</h3>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>Upload your audio or video file (up to 100MB)</li>
                <li>Our AI will process and transcribe the content</li>
                <li>View and download your transcription</li>
              </ol>
            </div>
          </div>

          <div>
            {showTranscription ? (
              <TranscriptionDisplay 
                transcription={mockTranscription} 
                className="sticky top-4"
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                  <h3 className="mt-4 text-lg font-semibold">No transcription yet</h3>
                  <p className="mb-4 mt-2 text-sm text-muted-foreground">
                    Upload an audio or video file to see the transcription here.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      // For demo purposes, show the mock transcription
                      setShowTranscription(true);
                    }}
                  >
                    View Demo Transcription
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
