
"use client";
import { useState } from "react";
import { UploadCloud, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


interface GerberUploadProps {
  onFileSelect: (file: File) => void;
  onFileReset: () => void;
  fileName?: string;
}

export function GerberUpload({ onFileSelect, onFileReset, fileName }: GerberUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileSelect(event.target.files[0]);
    }
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      onFileSelect(event.dataTransfer.files[0]);
    }
  };
  
  const handleResetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onFileReset();
  }


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
              className={cn(
                "flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card transition-colors",
                isDragging ? "border-primary bg-primary/10" : "hover:bg-muted/50"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center text-center pb-6 pt-5">
                <UploadCloud className="mb-3 h-10 w-10 text-muted-foreground" />
                {fileName ? (
                  <div className="flex flex-col items-center gap-2">
                    <p className="font-semibold text-primary">{fileName}</p>
                     <Button variant="outline" size="sm" onClick={handleResetClick}>
                        <X className="mr-2 h-4 w-4" />
                        Reset
                     </Button>
                  </div>
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
                accept=".zip,.rar,.7z,.gbr,.ger,.pho,.drl,.xln,.txt"
                disabled={!!fileName}
              />
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
