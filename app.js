/**
 * Claude.ai Prototype - Frontend Application
 * 
 * A production-ready replica of Claude.ai with real API integration.
 * Built with React, featuring secure backend communication and responsive design.
 * 
 * @author Sean von Bayern
 * @version 1.0.0
 * @license MIT
 */

const { useState, useEffect } = React;

// === ICON COMPONENTS ===

// Sidebar Toggle Icon Component
const SidebarToggleIcon = ({ collapsed, isHover }) => {
    if (isHover) {
        // Arrow into wall icon
        return (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {collapsed ? (
                    // Arrow pointing right (expand)
                    <>
                        <line x1="3" y1="12" x2="21" y2="12"/>
                        <polyline points="15,6 21,12 15,18"/>
                        <line x1="21" y1="4" x2="21" y2="20"/>
                    </>
                ) : (
                    // Arrow pointing left (collapse)
                    <>
                        <line x1="21" y1="12" x2="3" y2="12"/>
                        <polyline points="9,18 3,12 9,6"/>
                        <line x1="3" y1="4" x2="3" y2="20"/>
                    </>
                )}
            </svg>
        );
    }
    
    // Hamburger menu icon
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
    );
};

// Claude Logo Component (for messages and greeting)
const ClaudeLogo = () => (
    <svg className="claude-logo" viewBox="0 0 256 257" fill="currentColor">
        <path d="M50.2278481,170.321013 L100.585316,142.063797 L101.427848,139.601013 L100.585316,138.24 L98.1225316,138.24 L89.6972152,137.721519 L60.921519,136.943797 L35.9696203,135.906835 L11.795443,134.610633 L5.70329114,133.31443 L0,125.796456 L0.583291139,122.037468 L5.70329114,118.602532 L13.0268354,119.250633 L29.2293671,120.352405 L53.5331646,122.037468 L71.161519,123.07443 L97.28,125.796456 L101.427848,125.796456 L102.011139,124.111392 L100.585316,123.07443 L99.4835443,122.037468 L74.3372152,104.992405 L47.116962,86.9751899 L32.8587342,76.6055696 L25.1463291,71.3559494 L21.2577215,66.4303797 L19.5726582,55.6718987 L26.5721519,47.9594937 L35.9696203,48.6075949 L38.3675949,49.2556962 L47.8946835,56.5792405 L68.2450633,72.3281013 L94.8172152,91.9007595 L98.7058228,95.1412658 L100.261266,94.0394937 L100.455696,93.2617722 L98.7058228,90.3453165 L84.2531646,64.2268354 L68.8283544,37.6546835 L61.958481,26.636962 L60.1437975,20.0263291 C59.4956962,17.3043038 59.0420253,15.0359494 59.0420253,12.2491139 L67.0136709,1.42582278 L71.4207595,-1.42108547e-14 L82.0496203,1.42582278 L86.521519,5.31443038 L93.1321519,20.4151899 L103.825823,44.2005063 L120.417215,76.5407595 L125.277975,86.1326582 L127.87038,95.0116456 L128.842532,97.7336709 L130.527595,97.7336709 L130.527595,96.1782278 L131.888608,77.9665823 L134.416203,55.6070886 L136.878987,26.8313924 L137.721519,18.7301266 L141.739747,9.00860759 L149.711392,3.75898734 L155.933165,6.74025316 L161.053165,14.0637975 L160.340253,18.7949367 L157.294177,38.5620253 L151.331646,69.5412658 L147.443038,90.2805063 L149.711392,90.2805063 L152.303797,87.6881013 L162.803038,73.7539241 L180.431392,51.718481 L188.208608,42.9691139 L197.282025,33.3124051 L203.114937,28.7108861 L214.132658,28.7108861 L222.233924,40.7655696 L218.604557,53.2091139 L207.262785,67.596962 L197.865316,79.7812658 L184.38481,97.9281013 L175.959494,112.44557 L176.737215,113.612152 L178.746329,113.417722 L209.207089,106.936709 L225.668861,103.955443 L245.306329,100.585316 L254.185316,104.733165 L255.157468,108.945823 L251.657722,117.56557 L230.659241,122.75038 L206.031392,127.675949 L169.348861,136.360506 L168.89519,136.684557 L169.413671,137.332658 L185.940253,138.888101 L193.004557,139.276962 L210.308861,139.276962 L242.519494,141.674937 L250.94481,147.248608 L256,154.053671 L255.157468,159.238481 L242.195443,165.849114 L224.696709,161.701266 L183.866329,151.979747 L169.867342,148.48 L167.923038,148.48 L167.923038,149.646582 L179.588861,161.053165 L200.976203,180.366582 L227.742785,205.253671 L229.103797,211.410633 L225.668861,216.271392 L222.039494,215.752911 L198.513418,198.059747 L189.44,190.088101 L168.89519,172.783797 L167.534177,172.783797 L167.534177,174.598481 L172.265316,181.533165 L197.282025,219.123038 L198.578228,230.659241 L196.763544,234.418228 L190.282532,236.686582 L183.153418,235.39038 L168.506329,214.84557 L153.40557,191.708354 L141.221266,170.969114 L139.730633,171.811646 L132.536709,249.259747 L129.166582,253.213165 L121.389367,256.19443 L114.908354,251.268861 L111.473418,243.297215 L114.908354,227.548354 L119.056203,207.003544 L122.426329,190.671392 L125.472405,170.385823 L127.287089,163.64557 L127.157468,163.191899 L125.666835,163.386329 L110.371646,184.38481 L87.1048101,215.817722 L68.6987342,235.52 L64.2916456,237.269873 L56.6440506,233.316456 L57.356962,226.252152 L61.6344304,219.96557 L87.1048101,187.560506 L102.46481,167.469367 L112.380759,155.868354 L112.315949,154.183291 L111.732658,154.183291 L44.0708861,198.124557 L32.0162025,199.68 L26.8313924,194.819241 L27.4794937,186.847595 L29.9422785,184.25519 L50.2926582,170.256203 L50.2278481,170.321013 Z" />
    </svg>
);

// Plus Icon Component
const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
);

// Chat Icon Component
const ChatIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    </svg>
);

// Share Icon Component
const ShareIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
        <polyline points="16,6 12,2 8,6"/>
        <line x1="12" y1="2" x2="12" y2="15"/>
    </svg>
);

// Send Icon Component
const SendIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="19" x2="12" y2="5"/>
        <polyline points="5,12 12,5 19,12"/>
    </svg>
);


// === UTILITY FUNCTIONS ===

// Gets appropriate greeting based on current time
const getTimeBasedGreeting = () => {
    try {
        const hour = new Date().getHours();
        
        // Validate hour is a valid number
        if (typeof hour !== 'number' || isNaN(hour) || hour < 0 || hour > 23) {
            return 'Hello'; // Fallback greeting
        }
        
        if (hour >= 5 && hour < 12) {
            return 'Good morning';
        } else if (hour >= 12 && hour < 17) {
            return 'Good afternoon';
        } else {
            return 'Good evening';
        }
    } catch (error) {
        console.warn('Error getting time-based greeting:', error);
        return 'Hello'; // Safe fallback
    }
};

// Chat session utilities
// Generates a readable chat name from the first message
const generateChatName = (firstMessage) => {
    if (!firstMessage || firstMessage.length === 0) return 'New Chat';
    
    // Take first few words from the message
    const words = firstMessage.trim().split(' ').slice(0, 3);
    let name = words.join(' ');
    
    // Capitalize first letter
    name = name.charAt(0).toUpperCase() + name.slice(1);
    
    // Remove any trailing punctuation and limit length
    name = name.replace(/[.!?,:;]*$/, '');
    return name.length > 30 ? name.substring(0, 30) + '...' : name;
};

// === MAIN APP COMPONENT ===

// Main App Component
const App = () => {
    const [currentView, setCurrentView] = useState('home'); // 'home' or 'chat'
    const [chatSessions, setChatSessions] = useState({
        'friendly-greeting': {
            id: 'friendly-greeting',
            name: 'Friendly Greeting',
            messages: [
                {
                    id: 'user-initial',
                    type: 'user',
                    content: 'Hi Claude! How are you today?',
                    timestamp: new Date('2024-01-01T10:00:00')
                },
                {
                    id: 'assistant-initial',
                    type: 'assistant',
                    content: "Hi there! I'm doing well, thank you for asking. I'm here and ready to help with whatever you'd like to work on or chat about. How are you doing today?",
                    timestamp: new Date('2024-01-01T10:00:30')
                }
            ],
            createdAt: new Date('2024-01-01')
        }
    });
    const [activeChatId, setActiveChatId] = useState(null);
    const [inputText, setInputText] = useState('');
    const [lastMessageTime, setLastMessageTime] = useState(0);
    const [error, setError] = useState('');
    const [openMenuId, setOpenMenuId] = useState(null);
    const [renamingChatId, setRenamingChatId] = useState(null);
    const [renameText, setRenameText] = useState('');
    const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [toggleHover, setToggleHover] = useState(false);
    const [messageReactions, setMessageReactions] = useState({}); // {messageId: 'liked' | 'disliked' | null}
    const [copiedMessages, setCopiedMessages] = useState(new Set()); // Set of messageIds showing copy feedback
    const [isLoading, setIsLoading] = useState(false); // Loading state for API calls

    // Get current messages from active chat session
    const messages = activeChatId && chatSessions[activeChatId] 
        ? chatSessions[activeChatId].messages 
        : [];
    
    // Get current chat name
    const currentChatName = activeChatId && chatSessions[activeChatId]
        ? chatSessions[activeChatId].name
        : 'New Chat';

    // Claude API client function
    // Communicates with our secure backend server that handles API key protection
    const callClaudeAPI = async (messages) => {
        try {
            // Format messages for our API
            const formattedMessages = messages.map(msg => ({
                role: msg.type === 'user' ? 'user' : 'assistant',
                content: msg.content
            }));

            const response = await fetch('/api/claude', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: formattedMessages
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Server error: ${response.status}`);
            }

            const data = await response.json();
            
            // Extract response text from our server's formatted response
            if (data.content && data.content[0] && data.content[0].text) {
                return data.content[0].text;
            } else {
                throw new Error('Invalid response format from server');
            }
            
        } catch (error) {
            console.error('Claude API Error:', error);
            throw error;
        }
    };

    // Creates a new chat session and switches to it
    const startNewChat = () => {
        const chatId = `chat-${Date.now()}`;
        const newChat = {
            id: chatId,
            name: 'New Chat',
            messages: [],
            createdAt: new Date()
        };
        
        setChatSessions(prev => ({
            ...prev,
            [chatId]: newChat
        }));
        setActiveChatId(chatId);
        setCurrentView('chat');
        setError('');
    };

    const switchToChat = (chatId) => {
        if (chatSessions[chatId]) {
            setActiveChatId(chatId);
            setCurrentView('chat');
            setError('');
        }
    };

    // Handles sending user messages and getting Claude responses
    const sendMessage = async () => {
        try {
            // Rate limiting - prevent spam
            const now = Date.now();
            if (now - lastMessageTime < 1000) {
                setError('Please wait before sending another message.');
                return;
            }

            // Basic validation
            if (inputText.trim().length === 0) {
                setError('Please enter a message.');
                return;
            }

            // Prevent sending if already loading
            if (isLoading) {
                setError('Please wait for the current response to complete.');
                return;
            }

            const messageContent = inputText.trim();
            
            // Create new chat if needed, or use existing
            let chatId = activeChatId;
            if (!chatId) {
                chatId = `chat-${Date.now()}`;
                const newChat = {
                    id: chatId,
                    name: generateChatName(inputText),
                    messages: [],
                    createdAt: new Date()
                };
                
                setChatSessions(prev => ({
                    ...prev,
                    [chatId]: newChat
                }));
                setActiveChatId(chatId);
                setCurrentView('chat');
            }
            
            const userMessage = {
                id: `user-${Date.now()}`,
                type: 'user',
                content: messageContent,
                timestamp: new Date()
            };

            // Update the chat session with the new message
            setChatSessions(prev => {
                const currentSession = prev[chatId];
                const updatedSession = {
                    ...currentSession,
                    messages: [...currentSession.messages, userMessage]
                };

                // Update chat name if this is the first message and we didn't set it above
                if (currentSession.messages.length === 0 && currentSession.name === 'New Chat') {
                    updatedSession.name = generateChatName(inputText);
                }

                return {
                    ...prev,
                    [chatId]: updatedSession
                };
            });

            setInputText('');
            setLastMessageTime(now);
            setError('');
            setIsLoading(true);

            // Get updated messages list for API call
            const updatedMessages = chatSessions[chatId] 
                ? [...chatSessions[chatId].messages, userMessage]
                : [userMessage];

            // Call Claude API
            try {
                const response = await callClaudeAPI(updatedMessages);
                
                const assistantMessage = {
                    id: `assistant-${Date.now()}`,
                    type: 'assistant',
                    content: response,
                    timestamp: new Date()
                };
                
                setChatSessions(prev => ({
                    ...prev,
                    [chatId]: {
                        ...prev[chatId],
                        messages: [...prev[chatId].messages, assistantMessage]
                    }
                }));
            } catch (apiError) {
                console.error('API Error:', apiError);
                setError(`Failed to get response from Claude: ${apiError.message}`);
                
                // Add a fallback message to indicate the error
                const errorMessage = {
                    id: `assistant-${Date.now()}`,
                    type: 'assistant',
                    content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
                    timestamp: new Date()
                };
                
                setChatSessions(prev => ({
                    ...prev,
                    [chatId]: {
                        ...prev[chatId],
                        messages: [...prev[chatId].messages, errorMessage]
                    }
                }));
            } finally {
                setIsLoading(false);
            }
        } catch (err) {
            setError('An error occurred while sending the message.');
            console.error('Send message error:', err);
            setIsLoading(false);
        }
    };

    // Handles Enter key for sending messages
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value.length <= 8000) {
            setInputText(value);
            setError('');
        }
    };

    const toggleMenu = (chatId, e) => {
        e.stopPropagation();
        setOpenMenuId(openMenuId === chatId ? null : chatId);
    };

    const startRename = (chatId, e) => {
        e.stopPropagation();
        setRenamingChatId(chatId);
        setRenameText(chatSessions[chatId].name);
        setOpenMenuId(null);
    };

    const saveRename = (chatId) => {
        if (renameText.trim()) {
            setChatSessions(prev => ({
                ...prev,
                [chatId]: {
                    ...prev[chatId],
                    name: renameText.trim()
                }
            }));
        }
        setRenamingChatId(null);
        setRenameText('');
    };

    const cancelRename = () => {
        setRenamingChatId(null);
        setRenameText('');
    };

    const deleteChat = (chatId, e) => {
        e.stopPropagation();
        setChatSessions(prev => {
            const newSessions = { ...prev };
            delete newSessions[chatId];
            return newSessions;
        });
        
        // If we deleted the active chat, go to home
        if (activeChatId === chatId) {
            setActiveChatId(null);
            setCurrentView('home');
        }
        setOpenMenuId(null);
    };

    const handleRenameKeyPress = (e, chatId) => {
        if (e.key === 'Enter') {
            saveRename(chatId);
        } else if (e.key === 'Escape') {
            cancelRename();
        }
    };

    const toggleHeaderMenu = (e) => {
        e.stopPropagation();
        setHeaderMenuOpen(!headerMenuOpen);
    };

    const startHeaderRename = (e) => {
        e.stopPropagation();
        if (activeChatId) {
            setRenamingChatId(activeChatId);
            setRenameText(chatSessions[activeChatId].name);
        }
        setHeaderMenuOpen(false);
    };

    const deleteHeaderChat = (e) => {
        e.stopPropagation();
        if (activeChatId) {
            setChatSessions(prev => {
                const newSessions = { ...prev };
                delete newSessions[activeChatId];
                return newSessions;
            });
            setActiveChatId(null);
            setCurrentView('home');
        }
        setHeaderMenuOpen(false);
    };

    // Toggles sidebar collapsed state
    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    // Copies message content to clipboard
    const copyToClipboard = async (messageContent, messageId) => {
        try {
            // Strip HTML tags for clean text copying
            const textContent = messageContent.replace(/<[^>]*>/g, '');
            await navigator.clipboard.writeText(textContent);
            
            // Show checkmark feedback
            setCopiedMessages(prev => new Set(prev).add(messageId));
            
            // Remove feedback after 1 second
            setTimeout(() => {
                setCopiedMessages(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(messageId);
                    return newSet;
                });
            }, 1000);
        } catch (err) {
            console.warn('Failed to copy to clipboard:', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = messageContent.replace(/<[^>]*>/g, '');
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            // Show checkmark feedback even for fallback
            setCopiedMessages(prev => new Set(prev).add(messageId));
            setTimeout(() => {
                setCopiedMessages(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(messageId);
                    return newSet;
                });
            }, 1000);
        }
    };

    // Handles like/dislike toggle
    const toggleReaction = (messageId, reactionType) => {
        setMessageReactions(prev => {
            const currentReaction = prev[messageId];
            const newReaction = currentReaction === reactionType ? null : reactionType;
            return {
                ...prev,
                [messageId]: newReaction
            };
        });
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            setOpenMenuId(null);
            setHeaderMenuOpen(false);
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className="app">
            {/* Sidebar */}
            <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header">
                    <button
                        className="sidebar-toggle"
                        onClick={toggleSidebar}
                        onMouseEnter={() => setToggleHover(true)}
                        onMouseLeave={() => setToggleHover(false)}
                        aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        <SidebarToggleIcon collapsed={sidebarCollapsed} isHover={toggleHover} />
                    </button>
                    <span className="sidebar-title" onClick={() => { setCurrentView('home'); setActiveChatId(null); }}>Claude</span>
                </div>
                
                <nav className="nav-section" role="navigation" aria-label="Main navigation">
                    <div className="nav-item new-chat-btn" onClick={startNewChat} role="button" tabIndex={0} aria-label="Start new chat">
                        <div className="new-chat-icon">
                            <PlusIcon />
                        </div>
                        <span>New chat</span>
                    </div>
                    <div className="nav-item" role="button" tabIndex={0} aria-label="View chats">
                        <ChatIcon />
                        <span>Chats</span>
                    </div>
                    <div className="nav-item" role="button" tabIndex={0} aria-label="View projects">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
                        </svg>
                        <span>Projects</span>
                    </div>
                    <div className="nav-item" role="button" tabIndex={0} aria-label="View artifacts">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7"/>
                            <rect x="14" y="3" width="7" height="7"/>
                            <rect x="3" y="14" width="7" height="7"/>
                            <rect x="14" y="14" width="7" height="7"/>
                        </svg>
                        <span>Artifacts</span>
                    </div>
                </nav>

                <div className="nav-section">
                    <div className="recents-label">
                        <span>Recents</span>
                    </div>
                    {Object.values(chatSessions)
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map(session => (
                        <div 
                            key={session.id}
                            className={`nav-item ${activeChatId === session.id ? 'active' : ''}`}
                            onClick={() => switchToChat(session.id)}
                            role="button"
                            tabIndex={0}
                            aria-label={`Switch to ${session.name} chat`}
                            style={{
                                backgroundColor: activeChatId === session.id && !sidebarCollapsed ? '#1a1a1a' : 'transparent'
                            }}
                        >
                            {renamingChatId === session.id ? (
                                <input
                                    type="text"
                                    value={renameText}
                                    onChange={(e) => setRenameText(e.target.value)}
                                    onKeyPress={(e) => handleRenameKeyPress(e, session.id)}
                                    onBlur={() => saveRename(session.id)}
                                    autoFocus
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid #666',
                                        borderRadius: '4px',
                                        color: '#c2c0b6',
                                        padding: '2px 4px',
                                        fontSize: '14px',
                                        flex: 1
                                    }}
                                />
                            ) : (
                                <span style={{flex: 1}}>{session.name}</span>
                            )}
                            <div className="chat-menu">
                                <button
                                    className="chat-menu-btn"
                                    onClick={(e) => toggleMenu(session.id, e)}
                                    aria-label="Chat options"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="1"/>
                                        <circle cx="19" cy="12" r="1"/>
                                        <circle cx="5" cy="12" r="1"/>
                                    </svg>
                                </button>
                                {openMenuId === session.id && (
                                    <div className="chat-menu-dropdown">
                                        <button
                                            className="chat-menu-item"
                                            onClick={(e) => startRename(session.id, e)}
                                        >
                                            Rename
                                        </button>
                                        <button
                                            className="chat-menu-item delete"
                                            onClick={(e) => deleteChat(session.id, e)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="user-section">
                    <div className="user-info">
                        <div className="user-avatar">S</div>
                        <div>
                            <div className="user-name">Sean</div>
                            <div style={{fontSize: '12px', color: '#666'}}>Proto plan</div>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginLeft: 'auto'}}>
                            <polyline points="6,9 12,15 18,9"/>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Header */}
                {currentView === 'chat' && (
                    <div className="header">
                        <div className="header-left">
                            {renamingChatId === activeChatId ? (
                                <div className="chat-title">
                                    <input
                                        type="text"
                                        value={renameText}
                                        onChange={(e) => setRenameText(e.target.value)}
                                        onKeyPress={(e) => handleRenameKeyPress(e, activeChatId)}
                                        onBlur={() => saveRename(activeChatId)}
                                        autoFocus
                                        style={{
                                            background: 'transparent',
                                            border: '1px solid #666',
                                            borderRadius: '4px',
                                            color: '#c2c0b6',
                                            padding: '4px 8px',
                                            fontSize: '16px',
                                            minWidth: '200px'
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="chat-title">
                                    <div className="chat-title-dropdown">
                                        <button
                                            className="chat-title-btn"
                                            onClick={toggleHeaderMenu}
                                            aria-label="Chat options"
                                        >
                                            <span>{currentChatName}</span>
                                            <svg className="chat-title-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="6,9 12,15 18,9"/>
                                            </svg>
                                        </button>
                                        {headerMenuOpen && (
                                            <div className="chat-menu-dropdown">
                                                <button
                                                    className="chat-menu-item"
                                                    onClick={startHeaderRename}
                                                >
                                                    Rename
                                                </button>
                                                <button
                                                    className="chat-menu-item delete"
                                                    onClick={deleteHeaderChat}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <button className="share-btn" aria-label="Share conversation">
                            <ShareIcon />
                            <span>Share</span>
                        </button>
                    </div>
                )}

                {/* Content Area */}
                <div className="content-area">
                    {currentView === 'home' ? (
                        <div className="home-screen">
                            <div className="greeting">
                                <h1>
                                    <ClaudeLogo />
                                    {getTimeBasedGreeting()}, Sean!
                                </h1>
                            </div>

                            <div className="input-container">
                                {error && (
                                    <div className="error-message" style={{
                                        color: '#ff6b6b',
                                        fontSize: '14px',
                                        marginBottom: '8px',
                                        padding: '8px 12px',
                                        backgroundColor: '#2d1b1b',
                                        border: '1px solid #ff6b6b',
                                        borderRadius: '6px'
                                    }}>
                                        {error}
                                    </div>
                                )}
                                <div className="input-wrapper">
                                    <textarea
                                        className="input-field"
                                        placeholder="How can I help you today?"
                                        value={inputText}
                                        onChange={handleInputChange}
                                        onKeyDown={handleKeyPress}
                                        maxLength={8000}
                                        aria-label="Message input"
                                        disabled={isLoading}
                                    />
                                    <div className="input-actions">
                                        <button className="input-btn" aria-label="Add attachment">
                                            <PlusIcon />
                                        </button>
                                        <button className="input-btn" aria-label="View options">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <line x1="21" y1="4" x2="14" y2="4"/>
                                                <line x1="10" y1="4" x2="3" y2="4"/>
                                                <line x1="21" y1="12" x2="12" y2="12"/>
                                                <line x1="8" y1="12" x2="3" y2="12"/>
                                                <line x1="21" y1="20" x2="16" y2="20"/>
                                                <line x1="12" y1="20" x2="3" y2="20"/>
                                                <line x1="14" y1="1" x2="14" y2="7"/>
                                                <line x1="8" y1="9" x2="8" y2="15"/>
                                                <line x1="16" y1="17" x2="16" y2="23"/>
                                            </svg>
                                        </button>
                                        <button className="input-btn" aria-label="Research mode">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="11" cy="11" r="8"/>
                                                <path d="M21 21l-4.35-4.35"/>
                                            </svg>
                                            <span>Research</span>
                                        </button>
                                        <div className="model-selector" role="button" aria-label="Select model">
                                            <span>Claude Sonnet 4</span>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="6,9 12,15 18,9"/>
                                            </svg>
                                        </div>
                                        <button className="send-btn" onClick={sendMessage} disabled={!inputText.trim() || isLoading} aria-label="Send message">
                                            <SendIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="feature-buttons">
                                <button className="feature-btn">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                                    </svg>
                                    <span>Write</span>
                                </button>
                                <button className="feature-btn">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M2 7l10-4 10 4-10 4z"/>
                                        <path d="M6 10l-2 1.5v4.5a1 1 0 001 1h14a1 1 0 001-1v-4.5L18 10"/>
                                        <path d="M22 7v6"/>
                                        <path d="M6 13v4"/>
                                        <path d="M18 13v4"/>
                                    </svg>
                                    <span>Learn</span>
                                </button>
                                <button className="feature-btn">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="16,18 22,12 16,6"/>
                                        <polyline points="8,6 2,12 8,18"/>
                                    </svg>
                                    <span>Code</span>
                                </button>
                                <button className="feature-btn">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 18h6"/>
                                        <path d="M10 19h4"/>
                                        <circle cx="12" cy="12" r="5"/>
                                        <line x1="12" y1="2" x2="12" y2="3"/>
                                        <line x1="12" y1="21" x2="12" y2="22"/>
                                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                                        <line x1="2" y1="12" x2="3" y2="12"/>
                                        <line x1="21" y1="12" x2="22" y2="12"/>
                                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                                    </svg>
                                    <span>Claude's choice</span>
                                </button>
                                <button className="feature-btn">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="3" width="7" height="7"/>
                                        <rect x="14" y="3" width="7" height="7"/>
                                        <rect x="14" y="14" width="7" height="7"/>
                                        <rect x="3" y="14" width="7" height="7"/>
                                    </svg>
                                    <span>Connect apps</span>
                                    <span className="new-badge">NEW</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="chat-messages">
                            <div className="chat-content">
                                {messages.map((message) => (
                                    <div key={message.id} className={`message ${message.type}-message`}>
                                        {message.type === 'user' ? (
                                            <>
                                                <div className="message-avatar">
                                                    S
                                                </div>
                                                <div className="message-content">
                                                    <div dangerouslySetInnerHTML={{__html: message.content}} />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="message-content">
                                                    <div dangerouslySetInnerHTML={{__html: message.content}} />
                                                    <div className="message-actions">
                                                        <button 
                                                            className="message-action"
                                                            onClick={() => copyToClipboard(message.content, message.id)}
                                                            aria-label="Copy message"
                                                        >
                                                            {copiedMessages.has(message.id) ? (
                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                    <polyline points="20,6 9,17 4,12"/>
                                                                </svg>
                                                            ) : (
                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                                                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                                                                </svg>
                                                            )}
                                                        </button>
                                                        <button 
                                                            className={`message-action ${messageReactions[message.id] === 'liked' ? 'liked' : ''}`}
                                                            onClick={() => toggleReaction(message.id, 'liked')}
                                                            aria-label="Like message"
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/>
                                                            </svg>
                                                        </button>
                                                        <button 
                                                            className={`message-action ${messageReactions[message.id] === 'disliked' ? 'disliked' : ''}`}
                                                            onClick={() => toggleReaction(message.id, 'disliked')}
                                                            aria-label="Dislike message"
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3zm7-13h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17"/>
                                                            </svg>
                                                        </button>
                                                        <button className="message-action" aria-label="Retry message">
                                                            <span>Retry</span>
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <polyline points="6,9 12,15 18,9"/>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="message-avatar">
                                                    <ClaudeLogo />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="message assistant-message">
                                        <div className="message-content">
                                            <div className="typing-indicator">
                                                <div className="typing-dots">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="message-avatar">
                                            <ClaudeLogo />
                                        </div>
                                    </div>
                                )}
                                {messages.length > 0 && (
                                    <div className="claude-notice">
                                        Claude can make mistakes. Please double-check responses.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Chat Input */}
                {currentView === 'chat' && (
                    <div className="chat-input">
                        <div className="chat-input-content">
                            {error && (
                                <div className="error-message" style={{
                                    color: '#ff6b6b',
                                    fontSize: '14px',
                                    marginBottom: '8px',
                                    padding: '8px 12px',
                                    backgroundColor: '#2d1b1b',
                                    border: '1px solid #ff6b6b',
                                    borderRadius: '6px'
                                }}>
                                    {error}
                                </div>
                            )}
                            <div className="input-wrapper">
                                <textarea
                                    className="input-field"
                                    placeholder="Reply to Claude..."
                                    value={inputText}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyPress}
                                    maxLength={8000}
                                    aria-label="Reply message input"
                                    disabled={isLoading}
                                />
                                <div className="input-actions">
                                    <button className="input-btn" aria-label="Add attachment">
                                        <PlusIcon />
                                    </button>
                                    <button className="input-btn" aria-label="View options">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="21" y1="4" x2="14" y2="4"/>
                                            <line x1="10" y1="4" x2="3" y2="4"/>
                                            <line x1="21" y1="12" x2="12" y2="12"/>
                                            <line x1="8" y1="12" x2="3" y2="12"/>
                                            <line x1="21" y1="20" x2="16" y2="20"/>
                                            <line x1="12" y1="20" x2="3" y2="20"/>
                                            <line x1="14" y1="1" x2="14" y2="7"/>
                                            <line x1="8" y1="9" x2="8" y2="15"/>
                                            <line x1="16" y1="17" x2="16" y2="23"/>
                                        </svg>
                                    </button>
                                    <button className="input-btn" aria-label="Research mode">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="11" cy="11" r="8"/>
                                            <path d="M21 21l-4.35-4.35"/>
                                        </svg>
                                        <span>Research</span>
                                    </button>
                                    <div className="model-selector" role="button" aria-label="Select model">
                                        <span>Claude Sonnet 4</span>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="6,9 12,15 18,9"/>
                                        </svg>
                                    </div>
                                    <button className="send-btn" onClick={sendMessage} disabled={!inputText.trim() || isLoading} aria-label="Send message">
                                        <SendIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// === APP INITIALIZATION ===

// Render the app
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);