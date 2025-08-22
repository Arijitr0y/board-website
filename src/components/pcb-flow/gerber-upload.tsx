"use client";

import { UploadCloud } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GerberUploadProps {
  onFileSelect: (file: File) => void;
  fileName?: string;
}

export function GerberUpload({ onFileSelect, fileName }: GerberUploadProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileSelect(event.target.files[0]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>1. Upload Gerber File</CardTitle>
        <CardDescription>
          Upload your PCB design in Gerber (ZIP) format to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="gerber-file" className="sr-only">
            Gerber File
          </Label>
          <div className="flex w-full items-center justify-center">
            <label
              htmlFor="gerber-file"
              className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card transition-colors hover:bg-muted/50"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <UploadCloud className="mb-3 h-10 w-10 text-muted-foreground" />
                {fileName ? (
                  <p className="font-semibold text-primary">{fileName}</p>
                ) : (
                  <>
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ZIP, .rar, .7z (MAX. 10MB)
                    </p>
                  </>
                )}
              </div>
              <Input
                id="gerber-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".zip,.rar,.7z"
              />
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
