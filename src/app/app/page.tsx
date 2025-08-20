"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { Send, Plus, MessageSquare, Settings, Menu, X, Trash2, MoreVertical, Zap, Crown, Key, User, LogOut, Edit2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from 'react-markdown';
import { useStore } from "@/lib/store";
import { Message } from "@/lib/types";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ChatApp() {
  const router = useRouter();
  const { user, signOut, loading: authLoading } = useAuth();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [editTitleValue, setEditTitleValue] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showCustomApiDialog, setShowCustomApiDialog] = useState(false);
  const [showImageHintDialog, setShowImageHintDialog] = useState(false);
  const [customApiKey, setCustomApiKey] = useState("");
  const [userProfile, setUserProfile] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    conversations,
    currentConversationId,
    userSettings,
    createConversation,
    addMessage,
    setCurrentConversation,
    deleteConversation,
    updateConversationTitle,
    updateUserSettings,
    decrementPrompts,
    decrementImages,
    switchMode,
    purchaseBundle,
  } = useStore();

  const currentConversation = conversations.find(c => c.id === currentConversationId);
  const messages = useMemo(() => currentConversation?.messages || [], [currentConversation]);

  // Function to sync user settings with Supabase
  const syncUserToSupabase = async (settings: any) => {
    if (user) {
      try {
        await supabase
          .from('profiles')
          .update({
            prompts_remaining: settings.promptsRemaining,
            total_prompts: settings.totalPrompts,
            images_remaining: settings.imagesRemaining || 0,
            total_images: settings.totalImages || 0,
            plan: settings.plan,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);
      } catch (error) {
        console.error('Error syncing to Supabase:', error);
      }
    }
  };

  // Function to sync on prompt usage
  const syncAfterPromptUse = async () => {
    if (user) {
      const currentSettings = userSettings;
      await syncUserToSupabase({
        ...currentSettings,
        promptsRemaining: Math.max(0, currentSettings.promptsRemaining - 1)
      });
    }
  };

  // Function to sync conversation to Supabase with improved reliability
  const syncConversationToSupabase = async (conversationId: string) => {
    if (!user) {
      console.warn('No user found, skipping conversation sync');
      return;
    }
    
    try {
      // Get the latest conversation state directly from the store
      const currentState = useStore.getState();
      const conversation = currentState.conversations.find(c => c.id === conversationId);
      
      if (!conversation) {
        console.warn(`Conversation ${conversationId} not found for syncing`);
        return;
      }

      console.log(`Attempting to sync conversation ${conversationId} with ${conversation.messages.length} messages`);
      console.log('User ID:', user.id);
      console.log('Conversation title:', conversation.title);

      const conversationData = {
        id: conversationId,
        user_id: user.id,
        title: conversation.title,
        messages: JSON.stringify(conversation.messages),
        updated_at: new Date().toISOString()
      };

      console.log('Conversation data to sync:', {
        id: conversationData.id,
        user_id: conversationData.user_id,
        title: conversationData.title,
        messagesLength: conversationData.messages.length
      });

      // First attempt
      const { data, error } = await supabase
        .from('conversations')
        .upsert(conversationData, {
          onConflict: 'id'
        });
      
      if (error) {
        // Properly log Supabase error details
        console.error('Error syncing conversation to Supabase:');
        console.error('- Message:', error.message || 'No message');
        console.error('- Details:', error.details || 'No details');
        console.error('- Hint:', error.hint || 'No hint');
        console.error('- Code:', error.code || 'No code');
        console.error('- Raw error:', error);
        console.error('- Error stringified:', JSON.stringify(error, null, 2));
        
        // Check if it's an RLS/permission issue
        if (error.message?.includes('policy') || error.message?.includes('permission') || error.message?.includes('RLS')) {
          console.error('Possible Row Level Security (RLS) policy issue detected');
        }
        
        // Implement proper retry with exponential backoff
        let retryAttempt = 1;
        const maxRetries = 3;
        
        while (retryAttempt <= maxRetries) {
          try {
            console.log(`Retry attempt ${retryAttempt} for conversation ${conversationId}`);
            
            // Wait with exponential backoff
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryAttempt - 1) * 1000));
            
            // Get fresh conversation data
            const retryState = useStore.getState();
            const retryConversation = retryState.conversations.find(c => c.id === conversationId);
            
            if (!retryConversation) {
              console.warn(`Conversation ${conversationId} not found for retry ${retryAttempt}`);
              break;
            }

            const retryData = {
              id: conversationId,
              user_id: user.id,
              title: retryConversation.title,
              messages: JSON.stringify(retryConversation.messages),
              updated_at: new Date().toISOString()
            };

            const { error: retryError } = await supabase
              .from('conversations')
              .upsert(retryData, {
                onConflict: 'id'
              });

            if (!retryError) {
              console.log(`Successfully synced conversation ${conversationId} on retry attempt ${retryAttempt}`);
              return;
            } else {
              console.error('Retry attempt failed:');
              console.error('- Retry attempt:', retryAttempt);
              console.error('- Message:', retryError.message || 'No message');
              console.error('- Details:', retryError.details || 'No details');
              console.error('- Code:', retryError.code || 'No code');
              console.error('- Raw retry error:', retryError);
            }
            
          } catch (retryException) {
            console.error(`Retry attempt ${retryAttempt} exception:`, retryException);
          }
          
          retryAttempt++;
        }
        
        console.error(`Failed to sync conversation ${conversationId} after ${maxRetries} attempts`);
      } else {
        console.log(`Successfully synced conversation ${conversationId} to Supabase`, data ? 'with data' : 'without data');
      }
    } catch (error) {
      console.error('Error in syncConversationToSupabase:', {
        error,
        message: (error as Error)?.message ?? String(error),
        stack: (error as Error)?.stack,
        name: (error as Error)?.name
      });
    }
  };

  // Function to load conversations from Supabase
  const loadConversationsFromSupabase = async () => {
    if (user) {
      try {
        const { data, error } = await supabase
          .from('conversations')
          .select('*')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });

        if (data && !error) {
          // Only load if we have fewer conversations locally than in Supabase
          if (data.length > conversations.length) {
            const supabaseConversations = data.map(conv => ({
              id: conv.id,
              title: conv.title,
              messages: JSON.parse(conv.messages || '[]'),
              createdAt: new Date(conv.created_at).getTime(),
              updatedAt: new Date(conv.updated_at).getTime()
            }));

            // Merge with local conversations (Supabase takes precedence)
            const mergedConversations = [...supabaseConversations];
            conversations.forEach(localConv => {
              if (!mergedConversations.find(sc => sc.id === localConv.id)) {
                mergedConversations.push(localConv);
              }
            });

            // Update the store with merged conversations
            useStore.setState({ 
              conversations: mergedConversations.sort((a, b) => b.updatedAt - a.updatedAt)
            });
          }
        }
      } catch (error) {
        console.error('Error loading conversations from Supabase:', error);
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Authentication check and redirect
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  // Load user profile from Supabase (only once when user logs in)
  useEffect(() => {
    let hasLoaded = false;
    
    const loadUserProfile = async () => {
      if (user && !hasLoaded) {
        hasLoaded = true;
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (data && !error) {
          setUserProfile(data);
          // Only sync if Supabase has valid data and it's different from defaults
          const currentSettings = userSettings;
          
          // If user has purchased bundles or Supabase data is more recent, use it
          if (data.prompts_remaining !== currentSettings.promptsRemaining || 
              data.total_prompts !== currentSettings.totalPrompts ||
              (currentSettings.promptsRemaining === 3 && currentSettings.totalPrompts === 3)) {
            updateUserSettings({
              promptsRemaining: data.prompts_remaining,
              totalPrompts: data.total_prompts,
              imagesRemaining: data.images_remaining || 0,
              totalImages: data.total_images || 0
            });
          }
        } else if (error) {
          console.error('Error loading user profile:', {
            error,
            message: error.message,
            details: error.details
          });
        }
      }
    };

    loadUserProfile();
  }, [user?.id]); // Only depend on user ID

  // Load conversations from Supabase when user logs in
  useEffect(() => {
    if (user) {
      loadConversationsFromSupabase();
    }
  }, [user?.id]); // Only depend on user ID

  // Periodic sync of local conversations to Supabase
  useEffect(() => {
    if (!user) return;

    const syncAllConversations = async () => {
      const currentState = useStore.getState();
      const localConversations = currentState.conversations;
      
      if (localConversations.length > 0) {
        console.log(`Syncing ${localConversations.length} conversations to Supabase`);
        
        // Sync each conversation with a small delay to avoid overwhelming Supabase
        for (const conversation of localConversations) {
          await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay between syncs
          syncConversationToSupabase(conversation.id);
        }
      }
    };

    // Sync conversations every 30 seconds
    const syncInterval = setInterval(syncAllConversations, 30000);

    // Cleanup interval on unmount
    return () => clearInterval(syncInterval);
  }, [user?.id]);

  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    if (activeDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeDropdown]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (editingTitle && !target.closest('.edit-title-container')) {
        handleCancelEdit();
      }
    };

    if (editingTitle) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [editingTitle]);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show loading while user is not authenticated (will redirect)
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Check if this looks like an image generation request but DALL-E is not selected
    const inputLower = input.toLowerCase();
    
    // More specific image generation patterns
    const imageGenerationPatterns = [
      // Direct image requests
      /\b(image|picture|photo|drawing|artwork|illustration|painting|sketch)\b/,
      // Draw/paint specific requests
      /\b(draw|paint|sketch|illustrate)\s+/,
      // Visual design requests
      /\b(design)\s+(a|an|the)\s+/,
      // Logo/banner creation
      /\b(logo|banner|poster|flyer|icon)\b/
    ];
    
    const looksLikeImageRequest = imageGenerationPatterns.some(pattern => 
      pattern.test(inputLower)
    );
    
    if (looksLikeImageRequest && userSettings.selectedModel !== "DALL-E") {
      setShowImageHintDialog(true);
      return;
    }

    // Check if this is a DALL-E request
    const isDalleRequest = userSettings.selectedModel === "DALL-E";

    // Validate bundle access for DALL-E (but allow in testing mode)
    if (isDalleRequest && userSettings.mode === "real" && !userSettings.bundleFeatures?.hasImageGeneration) {
      alert("Image generation is not available with your current bundle. Please upgrade to Creative Pack or higher to access DALL-E.");
      return;
    }

    // Check limits based on request type
    if (isDalleRequest) {
      if ((userSettings.imagesRemaining || 0) <= 0) {
        alert("You've run out of images! Please upgrade your plan to continue generating images.");
        return;
      }
    } else {
      if (userSettings.promptsRemaining <= 0) {
        alert("You've run out of prompts! Please upgrade your plan to continue chatting.");
        return;
      }
    }

    // Auto-set GPT-5 Nano for testing mode users
    if (userSettings.mode === "testing" && userSettings.selectedModel !== "GPT-5 Nano") {
      console.log("🧪 Auto-switching testing mode user to GPT-5 Nano");
      updateUserSettings({ selectedModel: "GPT-5 Nano" });
      // Continue processing without blocking the user
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: Date.now(),
    };

    // Create new conversation if none exists
    let conversationId = currentConversationId;
    if (!conversationId) {
      conversationId = createConversation("New Chat");
      setCurrentConversation(conversationId);
    }

    addMessage(conversationId, userMessage);
    setInput("");
    setIsLoading(true);
    
    // Sync conversation to Supabase after adding user message
    if (user) {
      syncConversationToSupabase(conversationId);
    }
    
    // Decrement appropriate resource after user sends a message
    if (isDalleRequest) {
      decrementImages();
    } else {
      decrementPrompts();
    }
    
    // Sync with Supabase after decrementing
    if (user) {
      if (isDalleRequest) {
        await syncUserToSupabase({
          ...userSettings,
          imagesRemaining: Math.max(0, (userSettings.imagesRemaining || 0) - 1)
        });
      } else {
        syncAfterPromptUse();
      }
    }

    try {
      // Check if this is a DALL-E image generation request
      if (userSettings.selectedModel === "DALL-E") {
        // Use DALL-E 2 for testing to save API costs (cheaper than DALL-E 3)
        const imageRequestBody = {
          prompt: input.trim(),
          model: "dall-e-2", // Use DALL-E 2 for lower costs
          size: "256x256", // Valid DALL-E 2 size (256x256, 512x512, 1024x1024)
          quality: "standard", // Will be ignored for DALL-E 2
          useCustomApi: userSettings.useCustomApi,
          customApiKey: userSettings.customApiKey,
        };

        console.log("🧪 TESTING MODE: Using DALL-E 2 for cost savings");
        console.log("Original model: DALL-E 3 → Testing model: DALL-E 2 (lower cost)");
        console.log("Sending image generation request:", imageRequestBody);

        const response = await fetch("/api/images", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(imageRequestBody),
        });

        if (!response.ok) {
          throw new Error("Failed to generate image");
        }

        const result = await response.json();
        
        if (result.success && result.imageUrl) {
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: `Here's the image I generated for you:\n\n![Generated Image](${result.imageUrl})\n\n${result.revisedPrompt ? `Revised prompt: ${result.revisedPrompt}` : ''}`,
            timestamp: Date.now(),
          };
          addMessage(conversationId, assistantMessage);
          // Sync conversation after adding assistant message
          if (user) {
            syncConversationToSupabase(conversationId);
          }
        } else {
          throw new Error("Failed to get image URL");
        }
      } else {
        // Handle regular chat completion
        // Force GPT-5 Nano for testing to save API costs
        const testingModel = "GPT-5-Nano";
        
        const requestBody = {
          messages: [...messages, userMessage],
          model: testingModel, // Always use GPT-5 Nano for testing
          useCustomApi: userSettings.useCustomApi,
          customApiKey: userSettings.customApiKey,
        };

        console.log("🧪 TESTING MODE: Forcing model to", testingModel);
        console.log("Original selected model:", userSettings.selectedModel);
        console.log("Request body:", requestBody);

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error("Failed to get response");
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let assistantResponse = "";

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "",
          timestamp: Date.now(),
        };

        addMessage(conversationId, assistantMessage);

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6);
                if (data === "[DONE]") continue;
                
                try {
                  const parsed = JSON.parse(data);
                  if (parsed.content) {
                    assistantResponse += parsed.content;
                    // Update the message in real-time
                    useStore.getState().updateMessage(conversationId, assistantMessage.id, {
                      ...assistantMessage,
                      content: assistantResponse,
                    });
                  }
                } catch (error) {
                  console.error("Error parsing SSE data:", error);
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: Date.now(),
      };
      addMessage(conversationId, errorMessage);
      // Sync conversation after adding error message
      if (user) {
        syncConversationToSupabase(conversationId);
      }
    } finally {
      setIsLoading(false);
      // Sync conversation after completion (for streaming messages)
      if (user) {
        syncConversationToSupabase(conversationId);
      }
    }
  };

  const handleNewChat = () => {
    const id = createConversation("New Chat");
    setCurrentConversation(id);
    // Sync new conversation to Supabase
    if (user) {
      syncConversationToSupabase(id);
    }
  };

  const handleDeleteChat = async (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this conversation?")) {
      console.log(`🗑️ Starting deletion of conversation: ${conversationId}`);
      
      // Delete from Supabase first to ensure data consistency
      if (user) {
        try {
          console.log(`📡 Sending delete request to Supabase for conversation: ${conversationId}`);
          console.log(`👤 User ID: ${user.id}`);
          
          const { data, error } = await supabase
            .from('conversations')
            .delete()
            .eq('id', conversationId)
            .eq('user_id', user.id)
            .select(); // This will return the deleted rows
          
          console.log(`📊 Supabase delete response:`, { data, error });
          
          if (error) {
            console.error('❌ Error deleting conversation from Supabase:', error);
            console.error('🔍 Error details:', {
              message: error.message,
              details: error.details,
              hint: error.hint,
              code: error.code
            });
            
            // Show user-friendly error message
            alert(`Failed to delete conversation from server: ${error.message}`);
            return; // Don't delete locally if Supabase deletion failed
          } 
          
          if (!data || data.length === 0) {
            console.warn('⚠️ No rows were deleted. Conversation might not exist in Supabase.');
            console.log('🔍 This could mean the conversation was not synced or already deleted.');
          } else {
            console.log(`✅ Successfully deleted conversation ${conversationId} from Supabase`);
            console.log(`📊 Deleted rows:`, data);
          }
        } catch (error) {
          console.error('💥 Exception while deleting conversation:', error);
          alert('Failed to delete conversation. Please try again.');
          return; // Don't delete locally if there was an exception
        }
      } else {
        console.warn('⚠️ No user found, skipping Supabase deletion');
      }

      // Delete from local state only after successful Supabase deletion
      console.log(`🏠 Deleting conversation ${conversationId} from local state`);
      deleteConversation(conversationId);
      setActiveDropdown(null);
      
      // If we deleted the current conversation, create a new one or set to null
      if (conversationId === currentConversationId) {
        if (conversations.length > 1) {
          const remainingConversations = conversations.filter(c => c.id !== conversationId);
          setCurrentConversation(remainingConversations[0].id);
          console.log(`🔄 Switched to conversation: ${remainingConversations[0].id}`);
        } else {
          setCurrentConversation("");
          console.log(`🔄 No more conversations, cleared current conversation`);
        }
      }
      
      console.log(`✅ Conversation deletion complete`);
    }
  };

  const handleEditTitle = (conversationId: string, currentTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTitle(conversationId);
    setEditTitleValue(currentTitle);
    setActiveDropdown(null);
  };

  const handleSaveTitle = async (conversationId: string) => {
    if (editTitleValue.trim() !== "") {
      console.log(`✏️ Starting title update for conversation: ${conversationId}`);
      console.log(`📝 New title: "${editTitleValue.trim()}"`);
      
      // Update local state first
      updateConversationTitle(conversationId, editTitleValue.trim());
      console.log(`🏠 Updated local state with new title`);
      
      // Update Supabase
      if (user) {
        try {
          console.log(`📡 Sending title update to Supabase`);
          console.log(`👤 User ID: ${user.id}`);
          
          const { data, error } = await supabase
            .from('conversations')
            .update({ 
              title: editTitleValue.trim(), 
              updated_at: new Date().toISOString() 
            })
            .eq('id', conversationId)
            .eq('user_id', user.id)
            .select(); // Return the updated row
          
          console.log(`📊 Supabase update response:`, { data, error });
          
          if (error) {
            console.error('❌ Error updating conversation title in Supabase:', error);
            console.error('🔍 Error details:', {
              message: error.message,
              details: error.details,
              hint: error.hint,
              code: error.code
            });
            
            // Revert local change
            const conversation = conversations.find(c => c.id === conversationId);
            if (conversation) {
              updateConversationTitle(conversationId, conversation.title);
              console.log(`🔄 Reverted local title change due to Supabase error`);
            }
            
            alert(`Failed to update title: ${error.message}`);
          } else if (!data || data.length === 0) {
            console.warn('⚠️ No rows were updated. Conversation might not exist in Supabase.');
            console.log('🔍 This could mean the conversation was not synced.');
            
            // Try to sync the entire conversation
            console.log(`📦 Attempting to sync entire conversation to Supabase`);
            await syncConversationToSupabase(conversationId);
          } else {
            console.log(`✅ Successfully updated conversation title in Supabase`);
            console.log(`📊 Updated row:`, data[0]);
          }
        } catch (error) {
          console.error('💥 Exception while updating conversation title:', error);
          
          // Revert local change
          const conversation = conversations.find(c => c.id === conversationId);
          if (conversation) {
            updateConversationTitle(conversationId, conversation.title);
            console.log(`🔄 Reverted local title change due to exception`);
          }
          
          alert('Failed to update title. Please try again.');
        }
      } else {
        console.warn('⚠️ No user found, skipping Supabase update');
      }
    }
    
    setEditingTitle(null);
    setEditTitleValue("");
    console.log(`✅ Title editing session complete`);
  };

  const handleCancelEdit = () => {
    setEditingTitle(null);
    setEditTitleValue("");
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-80 bg-sidebar border-r border-sidebar-border flex flex-col"
          >
            <div className="p-4 border-b border-sidebar-border">
              <div className="flex items-center justify-between mb-4">
                <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                  <MessageSquare className="w-6 h-6 text-sidebar-primary" />
                  <span className="font-semibold text-sidebar-foreground">Daily Assistant</span>
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden text-sidebar-foreground hover:text-sidebar-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <button
                onClick={handleNewChat}
                className="w-full bg-sidebar-primary text-sidebar-primary-foreground px-4 py-3 rounded-lg font-medium hover:bg-sidebar-primary/90 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>New Chat</span>
              </button>
              
              {/* Mode Switcher */}
              <div className="p-4 border-b border-sidebar-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-sidebar-foreground">Mode</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    userSettings.mode === "testing" 
                      ? "bg-orange-500/20 text-orange-400" 
                      : "bg-green-500/20 text-green-400"
                  }`}>
                    {userSettings.mode === "testing" ? "Testing" : "Real"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => switchMode("testing")}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      userSettings.mode === "testing"
                        ? "bg-orange-600 text-white"
                        : "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80"
                    }`}
                  >
                    Testing
                  </button>
                  <button
                    onClick={() => switchMode("real")}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      userSettings.mode === "real"
                        ? "bg-green-600 text-white"
                        : "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80"
                    }`}
                  >
                    Real
                  </button>
                </div>
                {userSettings.mode === "testing" && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Limited to 30 prompts, 2 images. Uses GPT-5 Nano for cost efficiency.
                  </p>
                )}
                {userSettings.mode === "real" && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Premium features available. Pay per use.
                  </p>
                )}
              </div>

              {/* Reset Testing Mode */}
              <button
                onClick={() => {
                  console.log('🔄 RESETTING TESTING MODE (Text Only)');
                  updateUserSettings({
                    promptsRemaining: 30,
                    totalPrompts: 30,
                    mode: "testing"
                    // Note: imagesRemaining and totalImages are preserved
                  });
                  console.log('✅ Testing mode reset to 30 text prompts, images unchanged');
                }}
                className="w-full mt-2 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-700 transition-colors flex items-center space-x-2"
              >
                <span>🔄</span>
                <span>Reset Testing (Text Only)</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <div key={conversation.id} className="relative group">
                    <motion.div
                      onClick={() => setCurrentConversation(conversation.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors cursor-pointer ${
                        conversation.id === currentConversationId
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="font-medium truncate mb-1 pr-8">
                        {editingTitle === conversation.id ? (
                          <div className="flex items-center space-x-2 edit-title-container" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="text"
                              value={editTitleValue}
                              onChange={(e) => setEditTitleValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleSaveTitle(conversation.id);
                                } else if (e.key === 'Escape') {
                                  handleCancelEdit();
                                }
                              }}
                              className="flex-1 bg-background border border-border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSaveTitle(conversation.id)}
                              className="p-1 hover:bg-sidebar-accent/50 rounded text-green-600 hover:text-green-700"
                            >
                              <Check className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          conversation.title
                        )}
                      </div>
                      {conversation.messages.length > 0 && (
                        <div className="text-sm text-sidebar-foreground/60 truncate pr-8">
                          {conversation.messages[conversation.messages.length - 1].content}
                        </div>
                      )}
                      <div className="text-xs text-sidebar-foreground/40 mt-1">
                        {formatTime(conversation.updatedAt)}
                      </div>
                    </motion.div>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdown(activeDropdown === conversation.id ? null : conversation.id);
                        }}
                        className="p-1 hover:bg-sidebar-accent/50 rounded text-sidebar-foreground/60 hover:text-sidebar-foreground"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      
                      {activeDropdown === conversation.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="absolute right-0 top-8 bg-popover border border-border rounded-lg shadow-lg py-1 z-10 min-w-32"
                        >
                          <button
                            onClick={(e) => handleEditTitle(conversation.id, conversation.title, e)}
                            className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-accent flex items-center space-x-2"
                          >
                            <Edit2 className="w-4 h-4" />
                            <span>Edit Title</span>
                          </button>
                          <button
                            onClick={(e) => handleDeleteChat(conversation.id, e)}
                            className="w-full text-left px-3 py-2 text-sm text-destructive hover:bg-accent flex items-center space-x-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-sidebar-border space-y-2">
              {/* User Profile Section */}
              {user && (
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-sidebar-accent/30 mb-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-sidebar-foreground truncate">
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </div>
                    <div className="text-xs text-sidebar-muted truncate">
                      {user.email}
                    </div>
                  </div>
                  <button
                    onClick={async () => {
                      if (window.confirm('Are you sure you want to sign out?')) {
                        await signOut()
                      }
                    }}
                    className="text-sidebar-muted hover:text-destructive transition-colors p-1 rounded hover:bg-destructive/10"
                    title="Sign out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}

              <Link 
                href="/" 
                className="flex items-center space-x-2 text-sidebar-foreground hover:text-sidebar-primary transition-colors w-full p-2 rounded-lg hover:bg-sidebar-accent/50"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
              <button 
                onClick={() => setShowSettings(true)}
                className="flex items-center space-x-2 text-sidebar-foreground hover:text-sidebar-primary transition-colors w-full p-2 rounded-lg hover:bg-sidebar-accent/50"
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>

              {/* Dedicated Sign Out Button */}
              <button
                onClick={async () => {
                  if (window.confirm('Are you sure you want to sign out?')) {
                    await signOut()
                  }
                }}
                className="flex items-center space-x-2 text-sidebar-foreground hover:text-destructive transition-colors w-full p-2 rounded-lg hover:bg-destructive/10 border border-transparent hover:border-destructive/20"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-background border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
            <h1 className="text-lg font-semibold">
              {currentConversation?.title || "New Chat"}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Prompt Counter */}
            {/* Prompts Counter */}
            <div className="flex items-center space-x-2 bg-muted px-3 py-2 rounded-lg">
              {userSettings.mode === "testing" ? (
                <Zap className="w-4 h-4 text-orange-500" />
              ) : (
                <Crown className="w-4 h-4 text-green-500" />
              )}
              <span className="text-sm font-medium">
                {userSettings.promptsRemaining} / {userSettings.totalPrompts} prompts
              </span>
            </div>

            {/* Images Counter */}
            {(userSettings.imagesRemaining ?? 0) > 0 && (
              <div className="flex items-center space-x-2 bg-muted px-3 py-2 rounded-lg">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">
                  {userSettings.imagesRemaining} / {userSettings.totalImages} images
                </span>
              </div>
            )}

            {/* Model Selector */}
            <select
              value={userSettings.selectedModel}
              onChange={(e) => updateUserSettings({ selectedModel: e.target.value })}
              className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {userSettings.mode === "testing" ? (
                <>
                  <option value="GPT-5 Nano">GPT-5 Nano (Testing)</option>
                  <option value="DALL-E">DALL-E (Cheapest - Testing)</option>
                </>
              ) : (
                <>
                  <option value="GPT-5">GPT-5</option>
                  <option value="GPT-5 Mini">GPT-5 Mini</option>
                  <option value="GPT-5 Nano">GPT-5 Nano</option>
                  <option value="GPT-4">GPT-4</option>
                  <option value="GPT-4 Mini">GPT-4 Mini</option>
                  {/* DALL-E access based on bundle features */}
                  {userSettings.bundleFeatures?.hasImageGeneration ? (
                    <option value="DALL-E">
                      DALL-E {userSettings.bundleFeatures.hasHDImages ? "(HD)" : "(Standard)"}
                    </option>
                  ) : (
                    <option value="DALL-E" disabled>
                      DALL-E (Not available - upgrade bundle for image generation)
                    </option>
                  )}
                </>
              )}
            </select>

            {/* Settings Button */}
            <button
              onClick={() => setShowSettings(true)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <MessageSquare className="w-16 h-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Start a conversation</h2>
              <p className="text-muted-foreground max-w-md">
                Ask me anything! I&apos;m here to help with questions, creative tasks, analysis, and more.
              </p>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-3xl px-6 py-4 rounded-2xl ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    <div className="prose prose-sm max-w-none text-inherit">
                      <ReactMarkdown
                        components={{
                          img: ({ src, alt }) => (
                            <img 
                              src={src} 
                              alt={alt} 
                              className="max-w-full h-auto rounded-lg shadow-lg"
                              style={{ maxHeight: '400px', objectFit: 'contain' }}
                            />
                          ),
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          code: ({ children }) => (
                            <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">
                              {children}
                            </code>
                          ),
                          pre: ({ children }) => (
                            <pre className="bg-muted p-3 rounded-lg overflow-x-auto">
                              {children}
                            </pre>
                          )
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                    <div className="text-xs opacity-60 mt-2">
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-muted text-muted-foreground rounded-2xl rounded-bl-md px-6 py-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-border p-6">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  userSettings.promptsRemaining <= 0 
                    ? "No prompts remaining - switch to real mode or reset testing"
                    : userSettings.mode === "testing" 
                      ? `Type your message... (${userSettings.promptsRemaining} prompts left)`
                      : "Type your message..."
                }
                className="w-full px-6 py-4 rounded-2xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none text-foreground placeholder-muted-foreground"
                disabled={isLoading || userSettings.promptsRemaining <= 0}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading || userSettings.promptsRemaining <= 0}
              className="bg-primary text-primary-foreground p-4 rounded-2xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="text-xs text-muted-foreground mt-2 text-center">
            {userSettings.promptsRemaining <= 0 ? (
              <div className="flex items-center justify-center space-x-2">
                <span className="text-destructive">No prompts remaining.</span>
                <button
                  onClick={() => switchMode("real")}
                  className="bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-green-700 transition-all duration-200 hover:scale-105"
                >
                  Switch to Real Mode
                </button>
              </div>
            ) : userSettings.mode === "testing" && userSettings.promptsRemaining === 1 ? (
              <span className="text-yellow-600 dark:text-yellow-400">
                ⚠️ Last testing prompt! Switch to real mode or reset testing mode.
              </span>
            ) : userSettings.mode === "testing" && userSettings.promptsRemaining <= 2 ? (
              <span className="text-orange-600 dark:text-orange-400">
                Only {userSettings.promptsRemaining} testing prompts left. Consider switching to real mode!
              </span>
            ) : (
              <span>Press Enter to send • Your conversations are stored locally</span>
            )}
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background border border-border rounded-lg p-6 w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4">Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Mode</label>
                  <div className="flex items-center space-x-2 bg-muted px-3 py-2 rounded-lg">
                    {userSettings.mode === "testing" ? (
                      <Zap className="w-4 h-4 text-orange-500" />
                    ) : (
                      <Crown className="w-4 h-4 text-green-500" />
                    )}
                    <span className="capitalize font-medium">{userSettings.mode}</span>
                    {userSettings.mode === "testing" && (
                      <span className="text-xs text-muted-foreground ml-auto">
                        Limited resources for testing
                      </span>
                    )}
                  </div>
                </div>

                {/* Current Bundle Information */}
                {userSettings.currentBundle && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Current Bundle</label>
                    <div className="bg-muted px-3 py-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Crown className="w-4 h-4 text-yellow-500" />
                        <span className="capitalize font-medium">{userSettings.currentBundle} Pack</span>
                      </div>
                      <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          {userSettings.bundleFeatures?.hasImageGeneration ? (
                            <Check className="w-3 h-3 text-green-500" />
                          ) : (
                            <X className="w-3 h-3 text-red-500" />
                          )}
                          <span>Image Generation</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {userSettings.bundleFeatures?.hasHDImages ? (
                            <Check className="w-3 h-3 text-green-500" />
                          ) : (
                            <X className="w-3 h-3 text-red-500" />
                          )}
                          <span>HD Images</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">Prompts Remaining</label>
                  <div className="bg-muted px-3 py-2 rounded-lg">
                    {userSettings.promptsRemaining} / {userSettings.totalPrompts}
                  </div>
                </div>

                {(userSettings.imagesRemaining ?? 0) > 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Images Remaining</label>
                    <div className="bg-muted px-3 py-2 rounded-lg">
                      {userSettings.imagesRemaining} / {userSettings.totalImages}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">API Configuration</label>
                  {userSettings.mode === "real" ? (
                    <button
                      onClick={() => setShowCustomApiDialog(true)}
                      className="w-full bg-muted hover:bg-muted/80 px-3 py-2 rounded-lg text-left flex items-center space-x-2"
                    >
                      <Key className="w-4 h-4" />
                      <span>
                        {userSettings.useCustomApi ? "Using Custom API" : "Configure Custom API"}
                      </span>
                    </button>
                  ) : (
                    <div className="bg-muted/50 px-3 py-2 rounded-lg text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Crown className="w-4 h-4" />
                        <span>Custom API available in real mode</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bundle Upgrade Suggestions */}
                {userSettings.mode === "real" && !userSettings.bundleFeatures?.hasImageGeneration && (
                  <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 px-3 py-2 rounded-lg">
                    <p className="text-sm text-orange-700 dark:text-orange-300 mb-2">
                      🎨 <strong>Want image generation?</strong> Upgrade to Creative Pack or higher to access DALL-E!
                    </p>
                    <Link
                      href="/pricing"
                      className="text-xs text-orange-600 dark:text-orange-400 underline hover:no-underline"
                    >
                      View bundles →
                    </Link>
                  </div>
                )}

                {userSettings.mode === "testing" && (
                  <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 px-3 py-2 rounded-lg">
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      🧪 <strong>Testing Mode</strong> - Limited to 30 prompts and 2 images for cost efficiency!
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={async () => {
                    if (window.confirm('Are you sure you want to sign out?')) {
                      setShowSettings(false)
                      await signOut()
                    }
                  }}
                  className="px-4 py-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors rounded-lg flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom API Dialog */}
      <AnimatePresence>
        {showCustomApiDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowCustomApiDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background border border-border rounded-lg p-6 w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4">API Configuration</h2>
              
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>🚀 Pro Tip: Save 70% & Get Lightning Speed!</strong>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Smart users bring their own OpenAI API for unlimited chats, zero restrictions, and 3x faster responses! 
                    Of course, our premium API works perfectly too - your choice! 😊
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    OpenAI API Key (Optional)
                  </label>
                  <input
                    type="password"
                    value={customApiKey}
                    onChange={(e) => setCustomApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Your API key is stored locally and never shared
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="useCustomApi"
                    checked={userSettings.useCustomApi}
                    onChange={(e) => updateUserSettings({ useCustomApi: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="useCustomApi" className="text-sm">
                    Use my custom API key
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={() => setShowCustomApiDialog(false)}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (customApiKey) {
                      updateUserSettings({ 
                        customApiKey,
                        useCustomApi: true 
                      });
                    }
                    setShowCustomApiDialog(false);
                  }}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Generation Hint Dialog */}
      <AnimatePresence>
        {showImageHintDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowImageHintDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-lg p-6 w-full max-w-md mx-4"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">🎨</span>
                Image Generation Hint
              </h2>
              <p className="text-muted-foreground mb-6">
                It looks like you want to generate an image! To create images, you need to switch your model to <span className="font-semibold text-foreground">DALL-E</span> in the model selector above the input box.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowImageHintDialog(false)}
                  className="flex-1 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg"
                >
                  Got it!
                </button>
                <button
                  onClick={() => {
                    updateUserSettings({ selectedModel: "DALL-E" });
                    setShowImageHintDialog(false);
                  }}
                  className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Switch to DALL-E
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
