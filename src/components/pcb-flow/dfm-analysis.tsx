import type { AnalyzeGerberForDfmIssuesOutput } from "@/ai/flows/dfm-analysis";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Bot } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface DfmAnalysisProps {
  isLoading: boolean;
  result: AnalyzeGerberForDfmIssuesOutput | null;
  error: string | null;
}

export function DfmAnalysis({ isLoading, result, error }: DfmAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          AI DFM Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Analyzing your design for manufacturability issues...</p>
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Analysis Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {result && (
          <Alert>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertTitle>Analysis Complete</AlertTitle>
            <AlertDescription>
              <p className="whitespace-pre-wrap font-mono text-sm">
                {result.dfmAnalysisReport}
              </p>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
