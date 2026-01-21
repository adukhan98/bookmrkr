"use client"

import { useState, type ChangeEvent } from "react"
import { validateUrl } from "@/lib/validators/url"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function QuickSaveForm() {
  const [url, setUrl] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value
    setUrl(nextValue)

    if (!nextValue.trim()) {
      setError(null)
      return
    }

    const result = validateUrl(nextValue)
    setError(result.valid ? null : result.error ?? "Invalid URL")
  }

  const isValid = url.trim().length > 0 && !error

  return (
    <div className="w-full max-w-2xl rounded-2xl border bg-card p-6 shadow-sm md:p-10">
      <h1 className="text-2xl font-semibold md:text-3xl">
        Save a link in seconds
      </h1>
      <p className="mt-2 text-sm text-muted-foreground md:text-base">
        Paste a URL to capture it for later. We will fetch details and keep it
        organized in your library.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex-1">
          <Input
            type="url"
            value={url}
            onChange={handleChange}
            placeholder="https://example.com/reading"
            className="h-12 text-base"
            aria-invalid={Boolean(error)}
          />
          {error ? (
            <p className="mt-2 text-sm text-destructive">{error}</p>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              Tip: include the full https:// URL for the best results.
            </p>
          )}
        </div>
        <Button className="h-12 px-6" disabled={!isValid}>
          Quick Save
        </Button>
      </div>
    </div>
  )
}
