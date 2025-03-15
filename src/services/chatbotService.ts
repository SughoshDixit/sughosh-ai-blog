
import { supabase } from "@/lib/supabase";

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export const getChatbotResponse = async (userMessage: string): Promise<string> => {
  try {
    // Call the Supabase Edge Function for chatbot response
    const { data, error } = await supabase.functions.invoke('chatbot', {
      body: { message: userMessage },
    });
    
    if (error) throw new Error(error.message);
    
    return data.response || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Error generating chatbot response:", error);
    return "I'm having trouble processing that question. Could you try asking something else about me?";
  }
};

export const saveChatMessage = async (
  userId: string,
  message: ChatMessage
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('chat_messages')
      .insert({
        user_id: userId,
        role: message.role,
        content: message.content,
        created_at: new Date().toISOString(),
      });
    
    if (error) throw error;
  } catch (error) {
    console.error("Error saving chat message:", error);
  }
};

export const getUserChatHistory = async (userId: string): Promise<ChatMessage[]> => {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    
    return data.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
      timestamp: msg.created_at,
    }));
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return [];
  }
};
