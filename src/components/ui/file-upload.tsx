
import * as React from "react"
import { cn } from "@/lib/utils"
import { Upload, X, FileAudio, FileVideo, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: File | null
  onChange?: (file: File | null) => void
  onUpload?: (file: File) => Promise<void>
  accept?: string
  maxSize?: number
  isUploading?: boolean
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  ({ className, value, onChange, onUpload, accept = "audio/*,video/*", maxSize = 100 * 1024 * 1024, isUploading = false, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [isDragging, setIsDragging] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    const handleFileChange = (file: File | null) => {
      setError(null)
      
      if (file) {
        if (file.size > maxSize) {
          setError(`File size exceeds ${maxSize / (1024 * 1024)}MB limit`)
          return
        }
        
        const fileType = file.type.split('/')[0]
        if (fileType !== 'audio' && fileType !== 'video') {
          setError('Please upload an audio or video file')
          return
        }
      }
      
      if (onChange) {
        onChange(file)
      }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileChange(e.dataTransfer.files[0])
      }
    }

    const handleUploadClick = async () => {
      if (value && onUpload) {
        await onUpload(value)
      }
    }

    const getFileIcon = () => {
      if (!value) return null
      
      const fileType = value.type.split('/')[0]
      return fileType === 'audio' ? <FileAudio className="h-8 w-8 text-primary" /> : <FileVideo className="h-8 w-8 text-primary" />
    }

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        <div
          className={cn(
            "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center transition-colors",
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
            value ? "bg-muted/50" : "bg-background",
            isUploading && "opacity-50 cursor-not-allowed"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFileChange(e.target.files[0])
              }
            }}
            className="sr-only"
            disabled={isUploading}
          />

          {value ? (
            <div className="flex flex-col items-center gap-2">
              {getFileIcon()}
              <div className="text-sm font-medium">{value.name}</div>
              <div className="text-xs text-muted-foreground">
                {(value.size / (1024 * 1024)).toFixed(2)}MB
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() => handleFileChange(null)}
                disabled={isUploading}
              >
                <X className="mr-2 h-4 w-4" />
                Remove file
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <Upload className="h-10 w-10 text-muted-foreground" />
              <div className="mt-4 text-lg font-medium">
                Drag & drop your file here
              </div>
              <div className="text-sm text-muted-foreground">
                or click to browse
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 relative"
                onClick={() => inputRef.current?.click()}
                disabled={isUploading}
              >
                Select File
              </Button>
            </div>
          )}
        </div>

        {error && (
          <div className="text-sm text-destructive text-center">{error}</div>
        )}

        {value && !isUploading && (
          <Button 
            className="w-full" 
            onClick={handleUploadClick}
            disabled={isUploading}
          >
            Transcribe Now
          </Button>
        )}

        {isUploading && (
          <Button className="w-full" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Transcribing...
          </Button>
        )}
      </div>
    )
  }
)

FileUpload.displayName = "FileUpload"

export { FileUpload }
