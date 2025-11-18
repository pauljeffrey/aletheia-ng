"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Settings, Loader2, Info, ChevronDown, ChevronUp } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ModelConfig {
  maxLength: number;
  maxNewTokens: number;
  numBeams: number;
  temperature: number;
  topK: number;
  topP: number;
  repetitionPenalty: number;
  lengthPenalty: number;
  doSample: boolean;
}

const PRETRAINED_MODELS = [
  { id: "sabiyarn-125m", name: "SabiYarn 125M", repo: "BeardedMonster/SabiYarn-125M" },
];

const FINETUNED_MODELS = [
  { id: "sabiyarn-finetune", name: "SabiYarn Finetune", repo: "BeardedMonster/SabiYarn-125M-finetune" },
  { id: "sabiyarn-translate", name: "SabiYarn Translate", repo: "BeardedMonster/SabiYarn-125M-translate" },
  { id: "sabiyarn-sentiment", name: "SabiYarn Sentiment", repo: "BeardedMonster/SabiYarn-125M-sentiment" },
  { id: "sabiyarn-topic", name: "SabiYarn Topic", repo: "BeardedMonster/SabiYarn-125M-topic" },
  { id: "sabiyarn-diacritize", name: "SabiYarn Diacritics Cleaner", repo: "BeardedMonster/SabiYarn-diacritics-cleaner" },
  { id: "sabiyarn-igbo-translate", name: "SabiYarn Igbo Translate", repo: "BeardedMonster/SabiYarn-125M-Igbo-translate" },
  { id: "sabiyarn-yoruba-translate", name: "SabiYarn Yoruba Translate", repo: "BeardedMonster/SabiYarn-125M-Yoruba-translate" },
  { id: "sabiyarn-language-detection", name: "SabiYarn Language Detection", repo: "BeardedMonster/Sabiyarn_language_detection" },
];

const TASK_OPTIONS = {
  "select": "{}",
  "Text Generation": "{}",
  "Translation": "<translate> {} ",
  "Sentiment Classification": "<classify> {} <sentiment>:",
  "Topic Classification": "<classify> {} <topic>",
  "Simple Instruction Following": "<prompt> {} <response>:",
  "Headline Generation": "<title> {} <headline>",
  "Text Diacritization": "<diacritize> {} ",
  "Question Generation": "<prompt> {} <response>:",
  "Question-Answering": "<prompt> {} <response>:",
  "Text Summarization": "<summarize> {} <summary>:",
  "Text Cleaning": "<clean> {} ",
};

const LANGUAGE_OPTIONS = {
  "select": "",
  "Yoruba": "<yor>",
  "Hausa": "<hau>",
  "Ibo": "<ibo>",
  "Pidgin": "<pcm>",
  "English": "<eng>",
  "Efik": "<efi>",
  "Urhobo": "<urh>",
  "Fulah": "<ful>",
};

const SAMPLE_TEXTS = {
  "select": "",
  "Me ya nuna?": "Me ya nuna?",
  "Wetin dem dey call you?": "Wetin dem dey call you?",
  "What are you called?": "What are you called?",
  "how are you?": "how are you?",
  "Translate to pidgin": "Spain won the 2024 europa football cup. it was a tough one because they had to play very strong opponents in the quarter-finals, semi-finals and finals.",
  "Classify the sentiment": "Anyi na-echefu oke ike.",
  "what is the topic of this text": "Africa Free Trade Zone: Kò sí ìdènà láti kó ọjà láti orílẹ̀èdè kan sí òmíràn",
  "diacritize this text: ": "E sun, Alaga, fun ise amalayi ti e n se ni Naijiria. E maa ba a lo, egbon!",
  "clean this text": "Abin mamaki ne aikin da shugabaZn HNajeriya ybake yi. kCiF 39gaba Tda haRkGa sir!",
};

type ModelBehavior = {
  showTaskSelector: boolean;
  allowedTasks?: string[];
  presetTask?: string;
  showLanguageSelector: boolean;
  allowedLanguages?: string[];
  translationDirections?: {
    id: string;
    label: string;
    languageTag: string;
  }[];
};

const DEFAULT_BEHAVIOR: ModelBehavior = {
  showTaskSelector: true,
  showLanguageSelector: true,
};

const MODEL_BEHAVIOR: Record<string, ModelBehavior> = {
  "sabiyarn-125m": DEFAULT_BEHAVIOR,
  "sabiyarn-finetune": DEFAULT_BEHAVIOR,
  "sabiyarn-sentiment": {
    showTaskSelector: false,
    presetTask: "Sentiment Classification",
    showLanguageSelector: false,
  },
  "sabiyarn-topic": {
    showTaskSelector: false,
    presetTask: "Topic Classification",
    showLanguageSelector: false,
  },
  "sabiyarn-translate": {
    showTaskSelector: false,
    presetTask: "Translation",
    showLanguageSelector: true,
  },
  "sabiyarn-igbo-translate": {
    showTaskSelector: false,
    presetTask: "Translation",
    showLanguageSelector: false,
    translationDirections: [
      { id: "english-igbo", label: "English → Igbo", languageTag: "<ibo>" },
      { id: "igbo-english", label: "Igbo → English", languageTag: "<eng>" },
    ],
  },
  "sabiyarn-language-detection": {
    showTaskSelector: false,
    showLanguageSelector: false,
  },
};

export function PretrainedModelsTab() {
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<string>("select");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("select");
  const [selectedSample, setSelectedSample] = useState<string>("select");
  const [inputText, setInputText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [translationDirection, setTranslationDirection] = useState<string>("english-igbo");
  const [config, setConfig] = useState<ModelConfig>({
    maxLength: 100,
    maxNewTokens: 80,
    numBeams: 5,
    temperature: 0.99,
    topK: 50,
    topP: 0.95,
    repetitionPenalty: 4.0,
    lengthPenalty: 3.0,
    doSample: false,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const behavior = MODEL_BEHAVIOR[selectedModel] || DEFAULT_BEHAVIOR;
    if (behavior.presetTask) {
      setSelectedTask(behavior.presetTask);
    } else {
      setSelectedTask("select");
    }

    if (!behavior.showLanguageSelector) {
      setSelectedLanguage("select");
    }

    if (behavior.translationDirections && behavior.translationDirections.length > 0) {
      setTranslationDirection(behavior.translationDirections[0].id);
    }
  }, [selectedModel]);

  useEffect(() => {
    if (selectedSample !== "select" && SAMPLE_TEXTS[selectedSample as keyof typeof SAMPLE_TEXTS]) {
      setInputText(SAMPLE_TEXTS[selectedSample as keyof typeof SAMPLE_TEXTS]);
    }
  }, [selectedSample]);

  const currentBehavior = MODEL_BEHAVIOR[selectedModel] || DEFAULT_BEHAVIOR;
  const availableTasks = currentBehavior.allowedTasks || Object.keys(TASK_OPTIONS);
  const availableLanguages = currentBehavior.allowedLanguages || Object.keys(LANGUAGE_OPTIONS);

const wrapInput = (
  text: string,
  task: string,
  language: string,
  modelId: string,
  translationDirection: string,
): string => {
  const behavior = MODEL_BEHAVIOR[modelId] || DEFAULT_BEHAVIOR;

  if (modelId === "sabiyarn-language-detection") {
    return text;
  }

  if (behavior.translationDirections && behavior.translationDirections.length > 0) {
    const direction =
      behavior.translationDirections.find((dir) => dir.id === translationDirection) ||
      behavior.translationDirections[0];
    const template = TASK_OPTIONS["Translation" as keyof typeof TASK_OPTIONS] || "{}";
    return template.replace("{}", `${text} ${direction.languageTag}`.trim());
  }

  const effectiveTask = behavior.presetTask || task;
  let taskValue = TASK_OPTIONS[effectiveTask as keyof typeof TASK_OPTIONS] || "{}";
  
  if (
    effectiveTask === "Translation" ||
    effectiveTask === "Text Diacritization" ||
    effectiveTask === "Text Cleaning"
  ) {
      const langTag = LANGUAGE_OPTIONS[language as keyof typeof LANGUAGE_OPTIONS] || "";
    taskValue = taskValue.replace("{}", `${text} ${langTag}`.trim());
    } else {
      taskValue = taskValue.replace("{}", text);
    }
    
    return taskValue;
  };

  const handleSend = async () => {
    if (!selectedModel || !inputText.trim()) {
      alert("Please select a model and enter some text");
      return;
    }

    const behavior = MODEL_BEHAVIOR[selectedModel] || DEFAULT_BEHAVIOR;

    if (
      behavior.showLanguageSelector &&
      (selectedTask === "Translation" || selectedTask === "Text Diacritization" || selectedTask === "Text Cleaning") &&
      selectedLanguage === "select"
    ) {
      alert("Please select a language for this task.");
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const wrappedInput = wrapInput(
        inputText,
        selectedTask,
        selectedLanguage,
        selectedModel,
        translationDirection
      );
      
      const typedConfig = {
        maxLength: Number.isFinite(Number(config.maxLength)) ? Number(config.maxLength) : 100,
        maxNewTokens: Number.isFinite(Number(config.maxNewTokens)) ? Number(config.maxNewTokens) : 80,
        numBeams: Number.isFinite(Number(config.numBeams)) ? Number(config.numBeams) : 5,
        doSample: typeof config.doSample === "string"
          ? config.doSample === "true"
          : Boolean(config.doSample),
        temperature: Number.isFinite(Number(config.temperature)) ? Number(config.temperature) : 0.99,
        topK: Number.isFinite(Number(config.topK)) ? Number(config.topK) : 50,
        topP: Number.isFinite(Number(config.topP)) ? Number(config.topP) : 0.95,
        repetitionPenalty: Number.isFinite(Number(config.repetitionPenalty))
          ? Number(config.repetitionPenalty)
          : 4.0,
        lengthPenalty: Number.isFinite(Number(config.lengthPenalty))
          ? Number(config.lengthPenalty)
          : 3.0,
        earlyStopping: true,
        eosTokenId: 32,
      };

      const response = await fetch("/api/models/pretrained", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: selectedModel,
          prompt: wrappedInput,
          config: typedConfig,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.details || "Failed to generate response");
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.output || "No response generated",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setInputText("");
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: error instanceof Error 
          ? `Sorry, there was an error: ${error.message}. Please try again.`
          : "Sorry, there was an error generating a response. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col lg:flex-row min-h-[600px]">
      {/* Sidebar */}
      <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-primary-green/30 bg-bg-card p-5 overflow-y-auto">
        <div className="space-y-5">
          {/* Instructions Section */}
          <div className="border border-primary-green/30 rounded-lg overflow-hidden">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full flex items-center justify-between px-4 py-3 bg-primary-green/10 hover:bg-primary-green/20 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-semibold text-primary-green">
                  Instructions: How to use
                </span>
              </div>
              {showInstructions ? (
                <ChevronUp className="w-4 h-4 text-primary-green" />
              ) : (
                <ChevronDown className="w-4 h-4 text-primary-green" />
              )}
            </button>
            {showInstructions && (
              <div className="px-4 py-4 bg-bg-dark-secondary/50 border-t border-primary-green/20">
                <div className="text-xs text-text-light space-y-3 leading-relaxed">
                  <div>
                    <strong className="text-primary-green">1. Write Text or Select Sample:</strong>
                    <p className="mt-1">Enter text in the text area or use the dropdown to choose a sample.</p>
                  </div>
                  <div>
                    <strong className="text-primary-green">2. Select a Task:</strong>
                    <p className="mt-1">Choose a task from the <strong>task dropdown</strong> if using your own text.</p>
                    <p className="mt-1 text-primary-green/80">Important: This ensures correct model response.</p>
                  </div>
                  <div>
                    <strong className="text-primary-green">3. Avoid Conflicts:</strong>
                    <p className="mt-1">Don&apos;t select a sample text if using your own text.</p>
                  </div>
                  <div>
                    <strong className="text-primary-green">4. Select Nigerian Language:</strong>
                    <p className="mt-1">If prompted, choose the Nigerian language (it represents the input/base language for diacritization/cleaning, target language for translation).</p>
                  </div>
                  <div>
                    <strong className="text-primary-green">5. Generate Output:</strong>
                    <p className="mt-1">Click the Send button to generate the response.</p>
                  </div>
                  <div>
                    <strong className="text-primary-green">6. Translation Tips:</strong>
                    <ul className="mt-1 ml-4 list-disc space-y-1">
                      <li>English as the target language gives the best results.</li>
                      <li>You can also do inter-language translation i.e yoruba to igbo</li>
                      <li>Use sentences instead of words for better results.</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-primary-green">7. Performance Note:</strong>
                    <ul className="mt-1 ml-4 list-disc space-y-1">
                      <li>The model&apos;s performance varies due to its size and training data. It performs best on text generation and translation.</li>
                      <li>For other tasks, try multiple times if model&apos;s output is not optimal (This is due to the generator&apos;s sampling parameter settings).</li>
                      <li><strong>It&apos;s best to read/understand/translate the model&apos;s output completely first. Model can sometimes fail to stop generation after providing correct answers.</strong></li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-primary-green">8. Other Tips:</strong>
                    <ul className="mt-1 ml-4 list-disc space-y-1">
                      <li>Use simple instructions for instruction following.</li>
                      <li>For question answering and generation, follow the structure in the corresponding sample text.</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-primary-green">9. Adjust Parameters:</strong>
                    <p className="mt-1">Experiment with the generation parameters below to improve performance. However, default values are sufficient.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Warning Section */}
          <div className="border border-yellow-500/50 rounded-lg overflow-hidden bg-yellow-500/10">
            <div className="px-4 py-3">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-yellow-200 space-y-1">
                  <p className="font-semibold text-yellow-400">Important Notice:</p>
                  <p>These models are <strong>not designed for chat format</strong> and <strong>cannot maintain context</strong> across multiple messages. Each prompt is processed independently.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-green mb-2">
              Select Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full px-4 py-2.5 border border-primary-green/30 rounded-lg bg-bg-dark-secondary text-text-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all hover:border-primary-green/50"
            >
              <option value="">Select a model...</option>
              <optgroup label="Pretrained Models">
                {PRETRAINED_MODELS.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Finetuned Models">
                {FINETUNED_MODELS.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-green mb-2">
              Sample Text
            </label>
            <select
              value={selectedSample}
              onChange={(e) => setSelectedSample(e.target.value)}
              className="w-full px-4 py-2.5 border border-primary-green/30 rounded-lg bg-bg-dark-secondary text-text-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all hover:border-primary-green/50 text-sm"
            >
              {Object.keys(SAMPLE_TEXTS).map((key) => (
                <option key={key} value={key}>
                  {key === "select" ? "Select sample..." : key}
                </option>
              ))}
            </select>
          </div>

          {currentBehavior.showTaskSelector ? (
          <div>
            <label className="block text-sm font-semibold text-primary-green mb-2">
              Task
            </label>
            <select
              value={selectedTask}
              onChange={(e) => setSelectedTask(e.target.value)}
              className="w-full px-4 py-2.5 border border-primary-green/30 rounded-lg bg-bg-dark-secondary text-text-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all hover:border-primary-green/50"
            >
                {availableTasks.map((task) => (
                <option key={task} value={task}>
                  {task === "select" ? "Select task..." : task}
                </option>
              ))}
            </select>
          </div>
          ) : currentBehavior.presetTask ? (
            <div className="p-3 border border-primary-green/30 rounded-lg bg-bg-dark-secondary/70 text-sm text-text-light">
              <p>
                <span className="text-primary-green font-semibold">Task:</span> {currentBehavior.presetTask}
              </p>
              <p className="text-xs mt-1">This model is optimized for this task.</p>
            </div>
          ) : null}

          {currentBehavior.showLanguageSelector &&
            (selectedTask === "Translation" ||
              selectedTask === "Text Diacritization" ||
              selectedTask === "Text Cleaning") && (
            <div>
              <label className="block text-sm font-semibold text-primary-green mb-2">
                Language
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-4 py-2.5 border border-primary-green/30 rounded-lg bg-bg-dark-secondary text-text-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all hover:border-primary-green/50"
              >
                {availableLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang === "select" ? "Select language..." : lang}
                  </option>
                ))}
              </select>
            </div>
          )}

          {currentBehavior.translationDirections && (
            <div>
              <label className="block text-sm font-semibold text-primary-green mb-2">
                Translation Direction
              </label>
              <select
                value={translationDirection}
                onChange={(e) => setTranslationDirection(e.target.value)}
                className="w-full px-4 py-2.5 border border-primary-green/30 rounded-lg bg-bg-dark-secondary text-text-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all hover:border-primary-green/50"
              >
                {currentBehavior.translationDirections.map((direction) => (
                  <option key={direction.id} value={direction.id}>
                    {direction.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-primary-green/30 rounded-lg bg-bg-dark-secondary text-primary-green hover:bg-primary-green/10 hover:border-primary-green/50 transition-all font-medium"
          >
            <Settings className="w-4 h-4" />
            {showSettings ? "Hide" : "Show"} Advanced Settings
          </button>

          {showSettings && (
            <div className="space-y-4 p-4 bg-bg-dark-secondary/90 rounded-lg border border-primary-green/20 shadow-sm">
              <div>
                <label className="block text-xs text-text-light mb-2 font-medium">
                  Max Output Length: {config.maxLength}
                </label>
                <input
                  type="range"
                  min="10"
                  max="500"
                  value={config.maxLength}
                  onChange={(e) => setConfig({ ...config, maxLength: parseInt(e.target.value) })}
                  className="w-full accent-primary-green"
                />
              </div>
              <div>
                <label className="block text-xs text-text-light mb-2 font-medium">
                  Max New Tokens: {config.maxNewTokens}
                </label>
                <input
                  type="range"
                  min="30"
                  max="768"
                  value={config.maxNewTokens}
                  onChange={(e) => setConfig({ ...config, maxNewTokens: parseInt(e.target.value) })}
                  className="w-full accent-primary-green"
                />
              </div>
              <div>
                <label className="block text-xs text-text-light mb-2 font-medium">
                  Temperature: {config.temperature}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="2.0"
                  step="0.01"
                  value={config.temperature}
                  onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
                  className="w-full accent-primary-green"
                />
              </div>
              <div>
                <label className="block text-xs text-text-light mb-2 font-medium">
                  Repetition Penalty: {config.repetitionPenalty}
                </label>
                <input
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.1"
                  value={config.repetitionPenalty}
                  onChange={(e) => setConfig({ ...config, repetitionPenalty: parseFloat(e.target.value) })}
                  className="w-full accent-primary-green"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-bg-dark min-h-[400px]">
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-center">
              <div className="max-w-lg">
                <Bot className="w-20 h-20 text-primary-green mx-auto mb-6 opacity-60 animate-pulse-slow" />
                <h3 className="text-2xl font-bold gradient-text mb-3">
                  Welcome to SabiYarn Models
                </h3>
                <p className="text-text-light text-lg">
                  Select a model and start interacting. Choose a sample text or enter your own, select a task, and generate responses.
                </p>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-4 ${
                message.role === "user" ? "justify-end" : "justify-start"
              } animate-scale-in`}
            >
              {message.role === "assistant" && (
                <div className="w-10 h-10 rounded-full bg-gradient-hover flex items-center justify-center flex-shrink-0 shadow-glow">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              )}
              <div
                className={`max-w-full sm:max-w-[80%] rounded-xl px-4 md:px-5 py-3 shadow-lg ${
                  message.role === "user"
                    ? "bg-gradient-hover text-white"
                    : "bg-bg-card text-text-white border border-primary-green/30"
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
              {message.role === "user" && (
                <div className="w-10 h-10 rounded-full bg-primary-green flex items-center justify-center flex-shrink-0 shadow-glow">
                  <User className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="w-10 h-10 rounded-full bg-gradient-hover flex items-center justify-center shadow-glow">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="bg-bg-card rounded-xl px-5 py-3 border border-primary-green/30 shadow-lg">
                <Loader2 className="w-6 h-6 animate-spin text-primary-green" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-primary-green/30 p-4 md:p-5 bg-bg-card backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row gap-3 max-w-5xl mx-auto">
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Enter your text here... (See instructions above for guidance)"
              className="flex-1 px-4 md:px-5 py-3 border border-primary-green/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green resize-none bg-bg-dark-secondary text-text-white shadow-sm hover:border-primary-green/50 transition-all"
              rows={3}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !selectedModel || !inputText.trim()}
              className="w-full sm:w-auto px-6 md:px-8 py-3 bg-gradient-hover text-white rounded-xl hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 font-semibold hover:scale-105 active:scale-95"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

