import { Send } from "lucide-react";

export default function TextProcessor({
  inputText,
  setInputText,
  isProcessing,
  handleSubmit,
}) {
  return (
    <div className="w-full">
      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your text here..."
            rows={3}
            className="w-full p-3 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="absolute right-2 bottom-2 p-2 m-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            onClick={handleSubmit}
            disabled={isProcessing || !inputText.trim()}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
