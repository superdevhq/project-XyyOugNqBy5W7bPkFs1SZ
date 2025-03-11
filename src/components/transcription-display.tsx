
import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

export interface TranscriptionResult {
  id: string
  filename: string
  duration: number
  createdAt: string
  text: string
  segments: {
    id: number
    start: number
    end: number
    text: string
  }[]
}

interface TranscriptionDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  transcription: TranscriptionResult | null
  isLoading?: boolean
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export function TranscriptionDisplay({
  transcription,
  isLoading = false,
  className,
  ...props
}: TranscriptionDisplayProps) {
  if (isLoading) {
    return (
      <Card className={cn("w-full", className)} {...props}>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    )
  }

  if (!transcription) {
    return null
  }

  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{transcription.filename}</span>
          <span className="text-sm font-normal text-muted-foreground">
            {formatTime(transcription.duration)}
          </span>
        </CardTitle>
        <CardDescription>
          Transcribed on {new Date(transcription.createdAt).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="full">
          <TabsList className="mb-4">
            <TabsTrigger value="full">Full Text</TabsTrigger>
            <TabsTrigger value="segments">Segments</TabsTrigger>
          </TabsList>
          <TabsContent value="full" className="space-y-4">
            <div className="whitespace-pre-wrap text-sm">
              {transcription.text}
            </div>
          </TabsContent>
          <TabsContent value="segments" className="space-y-4">
            <div className="space-y-2">
              {transcription.segments.map((segment) => (
                <div key={segment.id} className="border-b pb-2">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{formatTime(segment.start)}</span>
                    <span>{formatTime(segment.end)}</span>
                  </div>
                  <p className="text-sm">{segment.text}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
