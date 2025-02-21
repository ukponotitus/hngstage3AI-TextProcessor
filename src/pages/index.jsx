import { useState, useEffect } from "react"
import TextProcessor from "../shared/components/input"
import DisplayTextComponent from "../shared/components/outputdisplay"
import UserLayout from "../shared/layout"

export default function HomePage() {
  const [inputText, setInputText] = useState("")
  const [output, setOutput] = useState("")
  const [targetLang, setTargetLang] = useState("en")
  const [isProcessing, setIsProcessing] = useState(false)
  const [canSummarize, setCanSummarize] = useState(false)
  const [error, setError] = useState(null)
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [consoleMessage, setConsoleMessage] = useState(null)
  const [detectedLanguage, setDetectedLanguage] = useState(null)

  useEffect(() => {
    setCanSummarize(output?.length > 150)
  }, [output])

  const detectLanguage = async (text) => {
    try {
      const languageDetectorCapabilities = await self.ai.languageDetector.capabilities()
      const canDetect = languageDetectorCapabilities.capabilities
      let detector

      if (canDetect === "no") {
        setError("Language detection is not available in this browser.")
      }

      if (canDetect === "readily") {
        detector = await self.ai.languageDetector.create()
      } else {
        detector = await self.ai.languageDetector.create({
          monitor(m) {
            m.addEventListener("downloadprogress", (e) => {
              setConsoleMessage(`Downloaded ${e.loaded} of ${e.total} bytes for language detection.`)
            })
          },
        })
        await detector.ready
      }

      const result = await detector.detect(text)
      return result.language
    } catch (error) {
      console.error("Language detection failed:", error)
      throw error
    }
  }

  const handleSubmit = async () => {
    setIsProcessing(true)
    setError(null)
    setConsoleMessage(null)
    try {
      if (!inputText.trim()) {
        setError("Please enter some text before submitting.")
      }
      setOutput(inputText)
      const detectedLang = await detectLanguage(inputText)
      setDetectedLanguage(detectedLang)
    } catch (error) {
      console.error("Error processing text:", error)
      setError(error.message)
    } finally {
      setIsProcessing(false)
      setInputText("")
    }
  }

  // Function to handle text translation
  const handleTranslate = async () => {
    setIsTranslating(true)
    setError(null)
    setConsoleMessage(null)
    try {
      if (!output || !targetLang) {
        throw new Error("Please ensure there's text to translate and a target language is selected.")
      }

      const translatorCapabilities = await self.ai.translator?.capabilities()
      const result = translatorCapabilities?.languagePairAvailable(detectedLanguage || "en", targetLang)

      if (result === "no") {
        setError("It's not possible for this browser to translate as requested.")
      }

      let translator
      if (result === "readily") {
        translator = await self.ai.translator?.create({
          sourceLanguage: detectedLanguage || "en",
          targetLanguage: targetLang,
        })
      } else {
        translator = await self.ai.translator?.create({
          sourceLanguage: detectedLanguage || "en",
          targetLanguage: targetLang,
          monitor(m) {
            m.addEventListener("downloadprogress", (e) => {
              setConsoleMessage(`Downloaded ${e.loaded} of ${e.total} bytes for translation.`)
            })
          },
        })
      }

      const translatedText = await translator?.translate(output)
      setOutput(translatedText)
      setDetectedLanguage(targetLang)
    } catch (error) {
      console.error("Translation failed:", error)
      setError(error.message)
    } finally {
      setIsTranslating(false)
    }
  }

  const handleSummarize = async () => {
    setIsSummarizing(true)
    setError(null)
    setConsoleMessage(null)
    try {
      if (output.length <= 150) {
        setError("Text must be more than 150 characters to summarize.")
      }

      const available = (await self.ai.summarizer.capabilities()).available
      let summarizer

      if (available === "no") {
        setError("Summarization is not available in this browser.")
      }

      const options = {
        sharedContext: "This is a scientific article",
        type: "key-points",
        format: "markdown",
        length: "medium",
      }

      if (available === "readily") {
        summarizer = await self.ai.summarizer.create(options)
      } else {
        summarizer = await self.ai.summarizer.create(options)
        summarizer.addEventListener("downloadprogress", (e) => {
          setConsoleMessage(`Downloaded ${e.loaded} of ${e.total} bytes for summarization.`)
        })
        await summarizer.ready
      }

      const summary = await summarizer.summarize(output)
      setOutput(summary)
    } catch (error) {
      console.error("Summarization failed:", error)
      setError(error.message)
    } finally {
      setIsSummarizing(false)
    }
  }

  return (
    <UserLayout title="AI Text Processor" userId="">
      <div className="flex flex-col md:gap-[10rem]  gap-36">
        <DisplayTextComponent
          output={output}
          targetLang={targetLang}
          setTargetLang={setTargetLang}
          handleSummarize={handleSummarize}
          handleTranslate={handleTranslate}
          canSummarize={canSummarize}
          isSummarizing={isSummarizing}
          isTranslating={isTranslating}
          error={error}
          consoleMessage={consoleMessage}
          detectedLanguage={detectedLanguage}
        />

        <TextProcessor
          inputText={inputText}
          setInputText={setInputText}
          isProcessing={isProcessing}
          handleSubmit={handleSubmit}
        />
      </div>
    </UserLayout>
  )
}

