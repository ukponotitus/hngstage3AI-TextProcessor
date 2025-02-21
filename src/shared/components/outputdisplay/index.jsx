import { FileText, Languages } from "lucide-react"

const LANGUAGES = [
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "en", name: "English" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "tr", name: "Turkish" },
]

export default function DisplayTextComponent({
  targetLang,
  setTargetLang,
  handleSummarize,
  handleTranslate,
  output,
  canSummarize,
  isSummarizing,
  isTranslating,
  error,
  consoleMessage,
  detectedLanguage,
}) {
  return (
    <div className="space-y-4 mt-6">
      <div className="p-3 border rounded min-h-[100px] bg-white">
        <p className="whitespace-pre-wrap break-words">{output || "Output will be displayed here..."}</p>
      </div>
      {detectedLanguage && (
        <p className="text-sm text-gray-600">
          Detected Language: {LANGUAGES.find((lang) => lang.code === detectedLanguage)?.name || detectedLanguage}
        </p>
      )}
      {error && <div className="p-2 text-red-600 bg-red-100 border border-red-400 rounded">{error}</div>}

      {consoleMessage && <p className="text-sm text-blue-500">{consoleMessage}</p>}
      {output && (
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center">
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-full sm:w-[180px] p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select Language
            </option>
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleSummarize}
            disabled={!canSummarize || isSummarizing}
            className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
          >
            <FileText className="mr-2 h-4 w-4" />
            {isSummarizing ? "Processing..." : "Summarize"}
          </button>
          <button
            onClick={handleTranslate}
            disabled={isTranslating}
            className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            <Languages className="mr-2 h-4 w-4" />
            {isTranslating ? "Processing..." : "Translate"}
          </button>
        </div>
      )}
    </div>
  )
}

