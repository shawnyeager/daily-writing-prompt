### AI Integration with Shakespeare API

Use the `useShakespeare` hook for AI chat completions with Nostr authentication.

```tsx
import { useShakespeare, type ChatMessage } from '@/hooks/useShakespeare';

const { sendChatMessage, sendStreamingMessage, isLoading, error, isAuthenticated } = useShakespeare();
```

#### Basic Chat Example

```tsx
function AIChat() {
  const { sendChatMessage, isLoading, error, isAuthenticated } = useShakespeare();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    const response = await sendChatMessage(newMessages, 'tybalt'); // Free model
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: response.choices[0].message.content as string
    }]);
  };

  if (!isAuthenticated) return <div>Please log in to use AI</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="space-y-2 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`p-2 rounded ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 p-2 border rounded"
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading} className="px-4 py-2 bg-blue-500 text-white rounded">
          Send
        </button>
      </div>
    </div>
  );
}
```

#### Streaming Chat

```tsx
const [currentResponse, setCurrentResponse] = useState('');

const handleStreaming = async (content: string) => {
  setCurrentResponse('');
  await sendStreamingMessage(messages, 'shakespeare', (chunk) => {
    setCurrentResponse(prev => prev + chunk);
  });
};
```

#### Models

- **`tybalt`**: Free model for development
- **`shakespeare`**: Premium model (requires credits)

#### Key Points

- User must be logged in with Nostr account
- Use `tybalt` for free testing
- Handle `isLoading` and `error` states
- Check `isAuthenticated` before API calls

## Implementation Patterns and Best Practices

### Dialog Component Patterns

When using Dialog components, always ensure accessibility compliance by including required elements:

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// ✅ Correct - Always include DialogHeader with DialogTitle
<Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Optional description for screen readers
      </DialogDescription>
    </DialogHeader>
    {/* Dialog content */}
  </DialogContent>
</Dialog>
```

**Important**: Even if you want to hide the title visually, use the `VisuallyHidden` component to maintain accessibility:

```tsx
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

<DialogHeader>
  <VisuallyHidden>
    <DialogTitle>Hidden Title for Screen Readers</DialogTitle>
  </VisuallyHidden>
</DialogHeader>
```

### Streaming Response Handling

When implementing streaming chat interfaces, always accumulate streamed content in a local variable before clearing the streaming state to prevent content loss:

```tsx
const handleStreamingResponse = async () => {
  let streamedContent = ''; // ✅ Use local variable to accumulate content

  try {
    await sendStreamingMessage(messages, model, (chunk) => {
      streamedContent += chunk; // ✅ Accumulate in local variable
      setCurrentStreamingMessage(streamedContent); // Update UI
    });

    // ✅ Save accumulated content to persistent state
    if (streamedContent.trim()) {
      const assistantMessage: MessageDisplay = {
        id: Date.now().toString(),
        role: 'assistant',
        content: streamedContent, // ✅ Use accumulated content
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }
  } finally {
    setCurrentStreamingMessage(''); // ✅ Clear streaming state after saving
  }
};
```

### Error Boundary Patterns

Always wrap AI components with error boundaries and provide user-friendly error messages for common failure scenarios:

```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Alert, AlertDescription } from '@/components/ui/alert';

function AIChatWithErrorBoundary() {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Something went wrong with the AI chat. Please refresh the page and try again.
            </AlertDescription>
          </Alert>
        </div>
      }
    >
      <AIChat />
    </ErrorBoundary>
  );
}

// In your AI component, handle specific error types gracefully:
function useAIWithErrorHandling() {
  const { sendChatMessage, error, clearError } = useShakespeare();

  const sendMessage = async (messages: ChatMessage[]) => {
    try {
      await sendChatMessage(messages, 'tybalt');
    } catch (err) {
      // Handle specific error types with user-friendly messages
      if (err.message.includes('401')) {
        throw new Error('Authentication failed. Please log in again.');
      } else if (err.message.includes('402')) {
        throw new Error('Insufficient credits. Please add credits to use premium features.');
      } else if (err.message.includes('network')) {
        throw new Error('Network error. Please check your internet connection.');
      }
      throw err; // Re-throw for error boundary
    }
  };

  return { sendMessage, error, clearError };
}
```
