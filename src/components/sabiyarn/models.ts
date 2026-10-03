export type ModelFamily = "pretrained" | "capable";

export interface ModelInfo {
  id: string;
  name: string;
  family: ModelFamily;
  group: "Pretrained" | "Finetuned" | "Chat";
  description: string;
  repo?: string;
  available: boolean;
}

export const MODELS: ModelInfo[] = [
  {
    id: "sabiyarn-moe-280m",
    name: "SabiYarn MoE 280M",
    family: "capable",
    group: "Chat",
    description: "Newest mixture-of-experts chat model. Remembers conversation context.",
    repo: "Aletheia-ng/SabiYarn_MoE-280M",
    available: true,
  },
  {
    id: "sabiyarn-32k",
    name: "SabiYarn 32K",
    family: "capable",
    group: "Chat",
    description: "Long-context chat model.",
    repo: "BeardedMonster/sabiyarn-32k",
    available: true,
  },
  {
    id: "sabiyarn-125m",
    name: "SabiYarn 125M",
    family: "pretrained",
    group: "Pretrained",
    description: "Base model. Generation, translation and multi-task prompts.",
    repo: "BeardedMonster/SabiYarn-125M",
    available: true,
  },
  {
    id: "sabiyarn-finetune",
    name: "SabiYarn Finetune",
    family: "pretrained",
    group: "Finetuned",
    description: "Instruction-tuned across all supported tasks.",
    repo: "BeardedMonster/SabiYarn-125M-finetune",
    available: true,
  },
  {
    id: "sabiyarn-translate",
    name: "SabiYarn Translate",
    family: "pretrained",
    group: "Finetuned",
    description: "Translation between Nigerian languages and English.",
    repo: "BeardedMonster/SabiYarn-125M-translate",
    available: true,
  },
  {
    id: "sabiyarn-sentiment",
    name: "SabiYarn Sentiment",
    family: "pretrained",
    group: "Finetuned",
    description: "Classifies the sentiment of a text.",
    repo: "BeardedMonster/SabiYarn-125M-sentiment",
    available: true,
  },
  {
    id: "sabiyarn-topic",
    name: "SabiYarn Topic",
    family: "pretrained",
    group: "Finetuned",
    description: "Detects the topic of a text.",
    repo: "BeardedMonster/SabiYarn-125M-topic",
    available: true,
  },
  {
    id: "sabiyarn-diacritize",
    name: "SabiYarn Diacritics Cleaner",
    family: "pretrained",
    group: "Finetuned",
    description: "Restores diacritics and cleans noisy text.",
    repo: "BeardedMonster/SabiYarn-diacritics-cleaner",
    available: true,
  },
  {
    id: "sabiyarn-igbo-translate",
    name: "SabiYarn Igbo Translate",
    family: "pretrained",
    group: "Finetuned",
    description: "English ↔ Igbo translation.",
    repo: "BeardedMonster/SabiYarn-125M-Igbo-translate",
    available: true,
  },
  {
    id: "sabiyarn-yoruba-translate",
    name: "SabiYarn Yoruba Translate",
    family: "pretrained",
    group: "Finetuned",
    description: "Translation into and out of Yoruba.",
    repo: "BeardedMonster/SabiYarn-125M-Yoruba-translate",
    available: true,
  },
  {
    id: "sabiyarn-language-detection",
    name: "SabiYarn Language Detection",
    family: "pretrained",
    group: "Finetuned",
    description: "Identifies which language a text is written in.",
    repo: "BeardedMonster/Sabiyarn_language_detection",
    available: true,
  },
  {
    id: "sabiyarn-chat",
    name: "SabiYarn Chat",
    family: "capable",
    group: "Chat",
    description: "Coming soon.",
    available: false,
  },
];

export const DEFAULT_MODEL_ID = "sabiyarn-moe-280m";
/** Fallback when a task suggestion needs a model with the task selector. */
export const DEFAULT_TASK_MODEL_ID = "sabiyarn-125m";

export const getModel = (id: string): ModelInfo =>
  MODELS.find((m) => m.id === id) ?? MODELS[0];

export const TASK_TEMPLATES: Record<string, string> = {
  "Text Generation": "{}",
  Translation: "<translate> {} ",
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

export const TASKS = Object.keys(TASK_TEMPLATES);
export const DEFAULT_TASK = "Text Generation";

const LANGUAGE_TASKS = ["Translation", "Text Diacritization", "Text Cleaning"];
export const taskNeedsLanguage = (task: string) => LANGUAGE_TASKS.includes(task);

export const LANGUAGE_TAGS: Record<string, string> = {
  Yoruba: "<yor>",
  Hausa: "<hau>",
  Igbo: "<ibo>",
  Pidgin: "<pcm>",
  English: "<eng>",
  Efik: "<efi>",
  Urhobo: "<urh>",
  Fulah: "<ful>",
};

export const LANGUAGES = Object.keys(LANGUAGE_TAGS);

export interface TranslationDirection {
  id: string;
  label: string;
  languageTag: string;
}

export interface ModelBehavior {
  showTaskSelector: boolean;
  presetTask?: string;
  showLanguageSelector: boolean;
  translationDirections?: TranslationDirection[];
  rawInput?: boolean;
}

const DEFAULT_BEHAVIOR: ModelBehavior = {
  showTaskSelector: true,
  showLanguageSelector: true,
};

const MODEL_BEHAVIOR: Record<string, ModelBehavior> = {
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
    rawInput: true,
  },
};

// Chat models take the user's message as-is, with no task or language tags
const CHAT_BEHAVIOR: ModelBehavior = {
  showTaskSelector: false,
  showLanguageSelector: false,
  rawInput: true,
};

export const getBehavior = (modelId: string): ModelBehavior =>
  getModel(modelId).family === "capable" ? CHAT_BEHAVIOR : MODEL_BEHAVIOR[modelId] ?? DEFAULT_BEHAVIOR;

/** The task that will actually be applied for a model, given the user's selection. */
export const effectiveTask = (modelId: string, selectedTask: string) =>
  getBehavior(modelId).presetTask ?? selectedTask;

export const wrapInput = (
  text: string,
  modelId: string,
  task: string,
  language: string | null,
  directionId: string
): string => {
  const behavior = getBehavior(modelId);

  if (behavior.rawInput) return text;

  if (behavior.translationDirections?.length) {
    const direction =
      behavior.translationDirections.find((d) => d.id === directionId) ??
      behavior.translationDirections[0];
    return TASK_TEMPLATES.Translation.replace("{}", `${text} ${direction.languageTag}`.trim());
  }

  const applied = effectiveTask(modelId, task);
  const template = TASK_TEMPLATES[applied] ?? "{}";
  if (taskNeedsLanguage(applied)) {
    const tag = language ? LANGUAGE_TAGS[language] ?? "" : "";
    return template.replace("{}", `${text} ${tag}`.trim());
  }
  return template.replace("{}", text);
};

export interface Suggestion {
  title: string;
  subtitle: string;
  text: string;
  task?: string;
  language?: string;
}

export const CHAT_SUGGESTIONS: Suggestion[] = [
  { title: "Say hello in Yoruba", subtitle: "Bawo ni? Kí ni orúkọ rẹ?", text: "Bawo ni? Kí ni orúkọ rẹ?" },
  { title: "Chat in Pidgin", subtitle: "How you dey? Wetin dey happen?", text: "How you dey? Wetin dey happen for Lagos today?" },
  { title: "Translate a greeting", subtitle: "English → Hausa", text: "Translate to Hausa: Good morning, how is your family?" },
  { title: "Explain simply", subtitle: "What is artificial intelligence?", text: "Explain artificial intelligence in simple words." },
  { title: "Write a short story", subtitle: "A folktale about the tortoise", text: "Tell me a short folktale about the tortoise and the birds." },
  { title: "Igbo proverbs", subtitle: "Share one and its meaning", text: "Tell me an Igbo proverb and what it means." },
];

export const SUGGESTIONS: Suggestion[] = [
  {
    title: "Translate to Pidgin",
    subtitle: "A short football news report",
    text: "Spain won the 2024 europa football cup. it was a tough one because they had to play very strong opponents in the quarter-finals, semi-finals and finals.",
    task: "Translation",
    language: "Pidgin",
  },
  {
    title: "Classify the sentiment",
    subtitle: "Anyi na-echefu oke ike.",
    text: "Anyi na-echefu oke ike.",
    task: "Sentiment Classification",
  },
  {
    title: "Find the topic",
    subtitle: "A Yoruba trade headline",
    text: "Africa Free Trade Zone: Kò sí ìdènà láti kó ọjà láti orílẹ̀èdè kan sí òmíràn",
    task: "Topic Classification",
  },
  {
    title: "Restore diacritics",
    subtitle: "Plain Yoruba → accented Yoruba",
    text: "E sun, Alaga, fun ise amalayi ti e n se ni Naijiria. E maa ba a lo, egbon!",
    task: "Text Diacritization",
    language: "Yoruba",
  },
  {
    title: "Clean noisy text",
    subtitle: "Corrupted Hausa sentence",
    text: "Abin mamaki ne aikin da shugabaZn HNajeriya ybake yi. kCiF 39gaba Tda haRkGa sir!",
    task: "Text Cleaning",
    language: "Hausa",
  },
  {
    title: "Continue in Pidgin",
    subtitle: "Wetin dem dey call you?",
    text: "Wetin dem dey call you?",
    task: "Text Generation",
  },
];

export interface PretrainedConfig {
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

export interface CapableConfig {
  maxNewTokens: number;
  temperature: number;
  topP: number;
  topK: number;
  repetitionPenalty: number;
  doSample: boolean;
}

export const DEFAULT_PRETRAINED_CONFIG: PretrainedConfig = {
  maxLength: 100,
  maxNewTokens: 80,
  numBeams: 1,
  temperature: 0.99,
  topK: 15,
  topP: 0.95,
  repetitionPenalty: 4.0,
  lengthPenalty: 3.0,
  doSample: true,
};

export const DEFAULT_CAPABLE_CONFIG: CapableConfig = {
  maxNewTokens: 256,
  temperature: 0.7,
  topP: 0.95,
  topK: 15,
  repetitionPenalty: 1.1,
  doSample: true,
};

export interface SliderSpec<K extends string> {
  key: K;
  label: string;
  min: number;
  max: number;
  step: number;
  hint: string;
  advanced?: boolean;
}

export const PRETRAINED_SLIDERS: SliderSpec<keyof Omit<PretrainedConfig, "doSample">>[] = [
  { key: "maxLength", label: "Max output length", min: 10, max: 500, step: 1, hint: "Upper bound on total sequence length." },
  { key: "maxNewTokens", label: "Max new tokens", min: 30, max: 768, step: 1, hint: "How many tokens the model may generate." },
  { key: "temperature", label: "Temperature", min: 0.1, max: 2, step: 0.01, hint: "Higher is more creative, lower is more focused." },
  { key: "repetitionPenalty", label: "Repetition penalty", min: 1, max: 10, step: 0.1, hint: "Discourages the model from repeating itself." },
  { key: "numBeams", label: "Beams", min: 1, max: 10, step: 1, hint: "Beam-search width. Above 1, replies arrive all at once instead of streaming.", advanced: true },
  { key: "topK", label: "Top K", min: 1, max: 200, step: 1, hint: "Sample from the K most likely tokens.", advanced: true },
  { key: "topP", label: "Top P", min: 0.1, max: 1, step: 0.01, hint: "Nucleus sampling threshold.", advanced: true },
  { key: "lengthPenalty", label: "Length penalty", min: 0, max: 5, step: 0.1, hint: "Favours longer (>1) or shorter (<1) beams.", advanced: true },
];

export const CAPABLE_SLIDERS: SliderSpec<keyof Omit<CapableConfig, "doSample">>[] = [
  { key: "maxNewTokens", label: "Max new tokens", min: 32, max: 1024, step: 1, hint: "How many tokens the model may generate." },
  { key: "temperature", label: "Temperature", min: 0.1, max: 2, step: 0.01, hint: "Higher is more creative, lower is more focused." },
  { key: "topP", label: "Top P", min: 0.1, max: 1, step: 0.01, hint: "Nucleus sampling threshold." },
  { key: "topK", label: "Top K", min: 1, max: 200, step: 1, hint: "Sample from the K most likely tokens.", advanced: true },
  { key: "repetitionPenalty", label: "Repetition penalty", min: 0.5, max: 2, step: 0.05, hint: "Discourages the model from repeating itself.", advanced: true },
];
