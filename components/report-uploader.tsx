"use client"

import type React from "react"

import { useState } from "react"
import { Upload, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function ReportUploader() {
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [fileName, setFileName] = useState("")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setUploadStatus("uploading")
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploadStatus("success")
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <div className="space-y-4">
      {uploadStatus === "idle" && (
        <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center hover:border-primary/40 transition-colors">
          <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" id="csv-upload" />
          <label htmlFor="csv-upload" className="cursor-pointer">
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 rounded-full bg-primary/10">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Click to upload CSV file</p>
                <p className="text-xs text-muted-foreground">Supports CSV files up to 100MB</p>
              </div>
              <Button type="button" variant="outline" className="mt-2 bg-transparent">
                Select File
              </Button>
            </div>
          </label>
        </div>
      )}

      {uploadStatus === "uploading" && (
        <div className="space-y-3 p-4 rounded-lg bg-muted/50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground font-medium">{fileName}</span>
            <span className="text-muted-foreground">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-xs text-muted-foreground">Processing trip records...</p>
        </div>
      )}

      {uploadStatus === "success" && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{fileName}</p>
            <p className="text-xs text-muted-foreground">Upload complete - Generating report...</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setUploadStatus("idle")
              setFileName("")
              setUploadProgress(0)
            }}
          >
            Upload New
          </Button>
        </div>
      )}

      {uploadStatus === "error" && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Upload failed</p>
            <p className="text-xs text-muted-foreground">Please check file format and try again</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setUploadStatus("idle")}>
            Retry
          </Button>
        </div>
      )}
    </div>
  )
}
