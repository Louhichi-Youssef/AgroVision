import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const PlantScanner = () => {
  const [previewUrl, setPreviewUrl] = useState(null)
  const [fileName, setFileName] = useState('')
  const { user } = useAuth()

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      setPreviewUrl(null)
      setFileName('')
      return
    }

    setFileName(file.name)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result)
    }
    reader.readAsDataURL(file)

    const scanOwner = user?.id || user?.email || 'guest'
    const scanKey = `agrovision_scan_count_${scanOwner}`
    const previousCount = Number(localStorage.getItem(scanKey) || 0)
    localStorage.setItem(scanKey, String(previousCount + 1))
  }

  return (
    <main className="min-h-[calc(100vh-6rem)] px-6 md:px-20 py-6 md:py-20">
      <div className="w-full max-w-none mx-auto bg-white/95 backdrop-blur-md rounded-xl md:rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
        {/* Header row */}
        <div className="px-3 md:px-5 pt-4 md:pt-5 pb-3 md:pb-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight">
              Plant Scanner
            </h1>
            <p className="mt-1 text-base md:text-xl text-gray-600 max-w-3xl">
              Upload a clear photo of a plant leaf to preview it before sending it for analysis.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs md:text-sm">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 border border-emerald-100">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              Ready to scan
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-3 py-1 text-gray-500 border border-gray-100">
              Beta
            </span>
          </div>
        </div>

        {/* Main content */}
        <div className="px-3 md:px-5 py-4 md:py-5 grid md:grid-cols-2 gap-5 md:gap-6 items-start">
          {/* Left column: upload */}
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-600 mb-2">
                Step 1
              </p>
              <h2 className="text-lg md:text-2xl font-semibold text-gray-900 mb-2">
                Upload a plant photo
              </h2>
              <p className="text-sm md:text-lg text-gray-500">
                Use a bright, in-focus photo of a single leaf for the best results.
              </p>
            </div>

            <div className="relative rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 p-4 md:p-5 flex flex-col gap-3">
              <input
                id="plant-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              <label
                htmlFor="plant-image"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-base font-medium cursor-pointer shadow-md hover:shadow-lg hover:brightness-105 transition-all w-fit"
              >
                <span className="text-base">⬆</span>
                <span>Choose an image</span>
              </label>

              <div className="text-xs md:text-sm text-gray-500 space-y-1">
                <p>Supported: JPG, PNG, HEIC — up to 10 MB.</p>
                <p>Tip: Fill the frame with the leaf and avoid strong shadows.</p>
              </div>

              {fileName && (
                <div className="mt-1 rounded-xl bg-white/70 border border-emerald-100 px-3 py-2 text-xs md:text-sm text-gray-700 flex items-center justify-between gap-3">
                  <span className="truncate max-w-[220px] md:max-w-[320px]">
                    {fileName}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-emerald-600 font-semibold">
                    Selected
                  </span>
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-gray-50 border border-gray-100 p-3.5 md:p-4">
              <p className="text-xs md:text-sm font-semibold text-gray-700 mb-1.5">
                Best practices
              </p>
              <ul className="space-y-1.5 text-[11px] md:text-sm text-gray-500 list-disc list-inside">
                <li>Center a single leaf in the frame.</li>
                <li>Avoid blurry photos and backlight.</li>
                <li>Keep the background simple when possible.</li>
              </ul>
            </div>
          </div>

          {/* Right column: preview */}
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-600 mb-2">
                Step 2
              </p>
              <h2 className="text-lg md:text-2xl font-semibold text-gray-900 mb-2">
                Review the preview
              </h2>
              <p className="text-sm md:text-lg text-gray-500">
                Make sure the leaf is clearly visible before you continue to the analysis step.
              </p>
            </div>

            <div className="relative rounded-2xl border border-gray-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50 shadow-inner overflow-hidden min-h-[220px] md:min-h-[260px] flex items-center justify-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Plant preview"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center px-6 py-8">
                  <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-white/80 border border-dashed border-emerald-200 flex items-center justify-center text-emerald-500 text-2xl">
                    🌿
                  </div>
                  <p className="text-sm md:text-base text-gray-600 mb-1">
                    No image selected yet
                  </p>
                  <p className="text-xs md:text-sm text-gray-400">
                    Once you upload an image, it will appear here so you can verify it looks correct.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default PlantScanner

