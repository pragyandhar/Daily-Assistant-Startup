import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ChatStore, Conversation, Message, UserSettings } from "./types";

export const useStore = create<ChatStore>()(
  persist(
    (set) => ({
      conversations: [],
      currentConversationId: null,
      userSettings: {
        promptsRemaining: 30, // Testing mode: 30 prompts
        totalPrompts: 30, // Testing mode: 30 prompts total
        selectedModel: "GPT-5-Nano", // Default to GPT-5 Nano for free version
        useCustomApi: false,
        mode: "testing", // Default to testing mode
        imagesRemaining: 2, // Testing mode: 2 images
        totalImages: 2, // Testing mode: 2 images total
        activeBundles: [],
        currentBundle: undefined,
        bundleFeatures: {
          hasImageGeneration: false,
          hasHDImages: false,
          maxImageQuality: "standard"
        }
      },

      createConversation: (title: string) => {
        const id = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newConversation: Conversation = {
          id,
          title,
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

        set((state) => ({
          conversations: [newConversation, ...state.conversations],
          currentConversationId: id,
        }));

        return id;
      },

      setCurrentConversation: (id: string) => {
        set({ currentConversationId: id });
      },

      addMessage: (conversationId: string, message: Message) => {
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: [...conv.messages, message],
                  updatedAt: Date.now(),
                }
              : conv
          ),
        }));
      },

      updateMessage: (conversationId: string, messageId: string, updatedMessage: Message) => {
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: conv.messages.map((msg) =>
                    msg.id === messageId ? updatedMessage : msg
                  ),
                  updatedAt: Date.now(),
                }
              : conv
          ),
        }));
      },

      deleteConversation: (id: string) => {
        set((state) => ({
          conversations: state.conversations.filter((conv) => conv.id !== id),
          currentConversationId:
            state.currentConversationId === id ? null : state.currentConversationId,
        }));
      },

      updateConversationTitle: (id: string, title: string) => {
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === id
              ? { ...conv, title, updatedAt: Date.now() }
              : conv
          ),
        }));
      },

      updateUserSettings: (settings: Partial<UserSettings>) => {
        set((state) => ({
          userSettings: { ...state.userSettings, ...settings }
        }));
      },

      decrementPrompts: () => {
        set((state) => ({
          userSettings: {
            ...state.userSettings,
            promptsRemaining: Math.max(0, state.userSettings.promptsRemaining - 1)
          }
        }));
      },

      switchMode: (mode: "testing" | "real") => {
        const modeSettings = {
          testing: { 
            promptsRemaining: 30, 
            totalPrompts: 30, 
            imagesRemaining: 2, 
            totalImages: 2,
            selectedModel: "GPT-5-Nano",
            bundleFeatures: {
              hasImageGeneration: true, // Allow image generation in testing mode
              hasHDImages: false,
              maxImageQuality: "standard" as const
            }
          },
          real: { 
            promptsRemaining: 0, 
            totalPrompts: 0, 
            imagesRemaining: 0, 
            totalImages: 0,
            selectedModel: "GPT-4o",
            bundleFeatures: {
              hasImageGeneration: true,
              hasHDImages: true,
              maxImageQuality: "hd" as const
            }
          }
        };

        const settings = modeSettings[mode];
        
        set((state) => ({
          userSettings: {
            ...state.userSettings,
            mode,
            promptsRemaining: settings.promptsRemaining,
            totalPrompts: settings.totalPrompts,
            imagesRemaining: settings.imagesRemaining,
            totalImages: settings.totalImages,
            selectedModel: settings.selectedModel,
            bundleFeatures: settings.bundleFeatures
          }
        }));
      },

      purchaseBundle: (bundleType: "starter" | "creative" | "pro" | "vision" | "business") => {
        const bundles = {
          starter: { 
            prompts: 100, 
            images: 0, 
            features: {
              hasImageGeneration: false,
              hasHDImages: false,
              maxImageQuality: "standard" as const
            }
          },
          creative: { 
            prompts: 100, 
            images: 5, 
            features: {
              hasImageGeneration: true,
              hasHDImages: false,
              maxImageQuality: "standard" as const
            }
          },
          pro: { 
            prompts: 300, 
            images: 15, 
            features: {
              hasImageGeneration: true,
              hasHDImages: false,
              maxImageQuality: "standard" as const
            }
          },
          vision: { 
            prompts: 100, 
            images: 10, 
            features: {
              hasImageGeneration: true,
              hasHDImages: true,
              maxImageQuality: "hd" as const
            }
          },
          business: { 
            prompts: 1000, 
            images: 30, 
            features: {
              hasImageGeneration: true,
              hasHDImages: false,
              maxImageQuality: "standard" as const
            }
          }
        };

        const bundle = bundles[bundleType];
        
        set((state) => ({
          userSettings: {
            ...state.userSettings,
            promptsRemaining: (state.userSettings.promptsRemaining || 0) + bundle.prompts,
            totalPrompts: (state.userSettings.totalPrompts || 0) + bundle.prompts,
            imagesRemaining: (state.userSettings.imagesRemaining || 0) + bundle.images,
            totalImages: (state.userSettings.totalImages || 0) + bundle.images,
            currentBundle: bundleType,
            bundleFeatures: bundle.features,
            mode: "real" // Switch to real mode when purchasing bundle
          }
        }));
      },

      decrementImages: () => {
        set((state) => ({
          userSettings: {
            ...state.userSettings,
            imagesRemaining: Math.max(0, (state.userSettings.imagesRemaining || 0) - 1)
          }
        }));
      },
    }),
    {
      name: "daily-assistant-storage",
      partialize: (state) => ({
        conversations: state.conversations,
        currentConversationId: state.currentConversationId,
        userSettings: state.userSettings,
      }),
    }
  )
);
