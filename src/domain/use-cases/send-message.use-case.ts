
export async function* sendMessageUseCase (message: string, abortSignal: AbortSignal) {
        
    const response = await fetch('/api/generate',{
        method: 'POST',
        body: JSON.stringify({message}),
        headers: {
            'Content-Type': 'application/json' 
        },
        signal: abortSignal
    });

    if (!response.body) {
        console.error('No body in response');
        return;
    }
  
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let messageResponse = '';
    
  
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            messageResponse += decoder.decode(value, { stream: true });
            
            yield messageResponse;
        }

    } catch (error) {
        console.error('Error reading stream', error);
        return null;
    }
};