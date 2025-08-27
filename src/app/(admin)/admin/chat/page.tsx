

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Search, Paperclip, File as FileIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const mockConversations = [
  {
    id: 1,
    customerName: 'Liam Johnson',
    subject: 'Question about my order ORD-001',
    lastMessage: 'Okay, thank you for clarifying!',
    avatar: 'https://i.pravatar.cc/150?u=liamjohnson',
    time: '10:32 AM',
    date: 'Today',
    isUnread: true,
    messages: [
      { sender: 'customer', text: 'Hi, I was wondering about the status of my order ORD-001.', time: '10:30 AM' },
      { sender: 'support', text: 'Hello Liam, let me check that for you. It looks like your order is currently in the fabrication stage.', time: '10:31 AM' },
      { sender: 'customer', text: 'Okay, thank you for clarifying!', time: '10:32 AM' },
    ],
  },
  {
    id: 2,
    customerName: 'Olivia Smith',
    subject: 'DFM review needed for my new design',
    lastMessage: 'Great, I have uploaded the new file.',
    avatar: 'https://i.pravatar.cc/150?u=oliviasmith',
    time: '3:45 PM',
    date: 'Yesterday',
    isUnread: false,
     messages: [
      { sender: 'customer', text: 'I have a new design ready, could you review the DFM?', time: '3:40 PM' },
      { sender: 'support', text: 'Certainly, Olivia. Please upload the file and I will assign it to an engineer.', time: '3:42 PM' },
      { sender: 'customer', text: 'Great, I have uploaded the new file.', time: '3:45 PM', attachment: { name: 'new-design-rev2.zip', size: '2.1MB' } },
    ],
  },
];

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);

  return (
    <Card className="h-[calc(100vh-10rem)]">
      <CardContent className="p-0 h-full">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          {/* Conversation List */}
          <div className="md:col-span-1 border-r flex flex-col">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">Conversations</h2>
               <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="pl-8" />
              </div>
            </div>
            <nav className="flex flex-col p-2 overflow-y-auto">
              {mockConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={cn(
                    'p-3 text-left rounded-lg transition-colors w-full',
                    selectedConversation.id === conv.id ? 'bg-muted' : 'hover:bg-muted/50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={conv.avatar} />
                      <AvatarFallback>{conv.customerName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <p className="font-semibold text-sm">{conv.customerName}</p>
                            <span className="text-xs text-muted-foreground">{conv.date}</span>
                        </div>
                      <p className="text-xs text-muted-foreground truncate font-medium">{conv.subject}</p>
                       <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                            {conv.isUnread && <span className="h-2 w-2 rounded-full bg-primary mt-1"></span>}
                        </div>
                    </div>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Message View */}
          <div className="md:col-span-2 flex flex-col h-full">
            {selectedConversation ? (
              <>
                <div className="p-4 border-b flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={selectedConversation.avatar} />
                        <AvatarFallback>{selectedConversation.customerName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold">{selectedConversation.customerName}</h3>
                        <p className="text-sm text-muted-foreground">{selectedConversation.subject}</p>
                    </div>
                </div>
                <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
                  {selectedConversation.messages.map((msg, index) => (
                    <div
                      key={index}
                      className={cn(
                        'flex items-end gap-2',
                        msg.sender === 'support' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      {msg.sender === 'customer' && (
                        <Avatar className="h-8 w-8">
                           <AvatarImage src={selectedConversation.avatar} />
                           <AvatarFallback>{selectedConversation.customerName.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={cn(
                          'max-w-xs md:max-w-md p-3 rounded-lg',
                          msg.sender === 'support'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background border'
                        )}
                      >
                        {msg.attachment ? (
                           <div className="flex items-center gap-2">
                                <FileIcon className="h-6 w-6 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">{msg.attachment.name}</p>
                                    <p className="text-xs">{msg.attachment.size}</p>
                                </div>
                            </div>
                        ) : (
                             <p className="text-sm">{msg.text}</p>
                        )}
                        <p
                          className={cn(
                            'text-xs mt-1 text-right',
                            msg.sender === 'support'
                              ? 'text-primary-foreground/70'
                              : 'text-muted-foreground'
                          )}
                        >
                          {msg.time}
                        </p>
                      </div>
                      {msg.sender === 'support' && (
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://placehold.co/32x32.png" />
                            <AvatarFallback>S</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t bg-background">
                  <div className="relative">
                    <Textarea
                      placeholder="Type your message..."
                      className="pr-24"
                      rows={2}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <Button type="button" size="icon" variant="ghost">
                            <Paperclip className="h-5 w-5" />
                            <span className="sr-only">Attach file</span>
                        </Button>
                        <Button type="submit" size="icon">
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send</span>
                        </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Select a conversation to start chatting.
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
