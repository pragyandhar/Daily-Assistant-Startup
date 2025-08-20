export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface UserSettings {
  promptsRemaining: number;
  totalPrompts: number;
  selectedModel: string;
  customApiKey?: string;
  useCustomApi: boolean;
  mode: "testing" | "real"; // Simple testing vs real mode
  imagesRemaining?: number;
  totalImages?: number;
  activeBundles?: ("starter" | "creative" | "pro" | "vision" | "business")[]; // Track purchased bundles
  currentBundle?: "starter" | "creative" | "pro" | "vision" | "business"; // Current active bundle
  bundleFeatures?: {
    hasImageGeneration: boolean;
    hasHDImages: boolean;
    maxImageQuality: "standard" | "hd";
  };
}

export interface ChatStore {
  conversations: Conversation[];
  currentConversationId: string | null;
  userSettings: UserSettings;
  createConversation: (title: string) => string;
  setCurrentConversation: (id: string) => void;
  addMessage: (conversationId: string, message: Message) => void;
  updateMessage: (conversationId: string, messageId: string, message: Message) => void;
  deleteConversation: (id: string) => void;
  updateConversationTitle: (id: string, title: string) => void;
  updateUserSettings: (settings: Partial<UserSettings>) => void;
  decrementPrompts: () => void;
  decrementImages: () => void;
  switchMode: (mode: "testing" | "real") => void;
  purchaseBundle: (bundleType: "starter" | "creative" | "pro" | "vision" | "business") => void;
}

export interface APIMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatCompletionRequest {
  messages: APIMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}
