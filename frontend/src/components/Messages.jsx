import React, { useState } from 'react';
import { Send, Search, MessageSquare, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { mockMessages, mockUsers, mockListings, currentUser } from '../mock';

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Group messages by conversation
  const conversations = mockMessages.reduce((acc, message) => {
    const conversationKey = message.fromUserId === currentUser.id 
      ? message.toUserId 
      : message.fromUserId;
    
    if (!acc[conversationKey]) {
      acc[conversationKey] = {
        userId: conversationKey,
        user: mockUsers.find(u => u.id === conversationKey),
        listing: mockListings.find(l => l.id === message.listingId),
        messages: [],
        lastMessage: null,
        unreadCount: 0
      };
    }
    
    acc[conversationKey].messages.push(message);
    acc[conversationKey].lastMessage = message;
    
    if (!message.isRead && message.toUserId === currentUser.id) {
      acc[conversationKey].unreadCount++;
    }
    
    return acc;
  }, {});

  const conversationList = Object.values(conversations).sort((a, b) => 
    new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp)
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    console.log('Sending message:', newMessage, 'to user:', selectedConversation.user.name);
    setNewMessage('');
    // Mock message sending
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-200px)]">
          
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                    <span>Messages</span>
                  </CardTitle>
                  {selectedConversation && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedConversation(null)}
                      className="lg:hidden"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-green-200 focus:border-green-400"
                  />
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-y-auto p-0">
                {conversationList.length > 0 ? (
                  <div className="space-y-1">
                    {conversationList.map((conversation) => (
                      <div
                        key={conversation.userId}
                        onClick={() => setSelectedConversation(conversation)}
                        className={`p-4 cursor-pointer transition-colors hover:bg-green-50 ${
                          selectedConversation?.userId === conversation.userId 
                            ? 'bg-green-100 border-r-2 border-green-500' 
                            : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={conversation.user.profilePicture}
                            alt={conversation.user.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-gray-800 truncate">
                                {conversation.user.name}
                              </h3>
                              <span className="text-xs text-gray-500">
                                {formatTime(conversation.lastMessage.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">
                              Re: {conversation.listing.title}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {conversation.lastMessage.message}
                            </p>
                          </div>
                          {conversation.unreadCount > 0 && (
                            <Badge className="bg-green-600 text-white">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">No conversations yet</h3>
                    <p className="text-gray-500 text-sm">Start messaging sellers to begin conversations</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className={`lg:col-span-2 ${selectedConversation ? 'block' : 'hidden lg:block'}`}>
            {selectedConversation ? (
              <Card className="h-full flex flex-col">
                {/* Chat Header */}
                <CardHeader className="border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <img
                      src={selectedConversation.user.profilePicture}
                      alt={selectedConversation.user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {selectedConversation.user.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        About: {selectedConversation.listing.title}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/listing/${selectedConversation.listing.id}`)}
                      className="border-green-300 text-green-600 hover:bg-green-50"
                    >
                      View Listing
                    </Button>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.fromUserId === currentUser.id ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.fromUserId === currentUser.id
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.fromUserId === currentUser.id ? 'text-green-200' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>

                {/* Message Input */}
                <div className="border-t border-gray-200 p-4">
                  <form onSubmit={handleSendMessage} className="flex space-x-3">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 border-green-200 focus:border-green-400"
                    />
                    <Button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="bg-green-600 hover:bg-green-700 px-6"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </Card>
            ) : (
              <Card className="h-full">
                <CardContent className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-600 mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-gray-500">
                      Choose a conversation from the left to start messaging
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;