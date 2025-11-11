"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Settings, Loader2 } from "lucide-react";

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

export function PretrainedModelsTab() {
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<string>("select");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("select");
  const [selectedSample, setSelectedSample] = useState<string>("select");
  const [inputText, setInputText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (selectedSample !== "select" && SAMPLE_TEXTS[selectedSample as keyof typeof SAMPLE_TEXTS]) {
      setInputText(SAMPLE_TEXTS[selectedSample as keyof typeof SAMPLE_TEXTS]);
    }
  }, [selectedSample]);

  const wrapInput = (text: string, task: string, language: string): string => {
    let taskValue = TASK_OPTIONS[task as keyof typeof TASK_OPTIONS] || "{}";
    
    if (task === "Translation" || task === "Text Diacritization" || task === "Text Cleaning") {
      const langTag = LANGUAGE_OPTIONS[language as keyof typeof LANGUAGE_OPTIONS] || "";
      taskValue = taskValue.replace("{}", `${text} ${langTag}`);
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

    const userMessage: Message = {
      role: "user",
      content: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const wrappedInput = wrapInput(inputText, selectedTask, selectedLanguage);
      
      const response = await fetch("/api/models/pretrained", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: selectedModel,
          prompt: wrappedInput,
          config: config,
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
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-80 border-r border-primary-green/30 bg-bg-card p-5 overflow-y-auto">
        <div className="space-y-5">
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

          <div>
            <label className="block text-sm font-semibold text-primary-green mb-2">
              Task
            </label>
            <select
              value={selectedTask}
              onChange={(e) => setSelectedTask(e.target.value)}
              className="w-full px-4 py-2.5 border border-primary-green/30 rounded-lg bg-bg-dark-secondary text-text-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all hover:border-primary-green/50"
            >
              {Object.keys(TASK_OPTIONS).map((task) => (
                <option key={task} value={task}>
                  {task === "select" ? "Select task..." : task}
                </option>
              ))}
            </select>
          </div>

          {(selectedTask === "Translation" || selectedTask === "Text Diacritization" || selectedTask === "Text Cleaning") && (
            <div>
              <label className="block text-sm font-semibold text-primary-green mb-2">
                Language
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-4 py-2.5 border border-primary-green/30 rounded-lg bg-bg-dark-secondary text-text-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all hover:border-primary-green/50"
              >
                {Object.keys(LANGUAGE_OPTIONS).map((lang) => (
                  <option key={lang} value={lang}>
                    {lang === "select" ? "Select language..." : lang}
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
      <div className="flex-1 flex flex-col bg-bg-dark">
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
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
                className={`max-w-[75%] rounded-xl px-5 py-3 shadow-lg ${
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

        <div className="border-t border-primary-green/30 p-5 bg-bg-card backdrop-blur-sm">
          <div className="flex gap-3 max-w-5xl mx-auto">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Enter your text here... (Please read instructions in the sidebar for the best experience)"
              className="flex-1 px-5 py-3 border border-primary-green/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green resize-none bg-bg-dark-secondary text-text-white shadow-sm hover:border-primary-green/50 transition-all"
              rows={3}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !selectedModel || !inputText.trim()}
              className="px-8 py-3 bg-gradient-hover text-white rounded-xl hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-semibold hover:scale-105 active:scale-95"
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

