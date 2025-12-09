import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useToast } from '@/hooks/use-toast';

interface NotificationContextType {
  socket: Socket | null;
  isConnected: boolean;
  smtpStatus: 'online' | 'offline' | 'checking';
  notificationsEnabled: boolean;
  notifications: Notification[];
  subscribeToNotifications: () => void;
  unsubscribeFromNotifications: () => void;
  sendContactForm: (data: ContactFormData) => Promise<void>;
  clearNotifications: () => void;
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface ContactResponse {
  success: boolean;
  message: string;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [smtpStatus, setSmtpStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();

  // Check SMTP status
  const checkSmtpStatus = useCallback(async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
    
    try {
      const response = await fetch(`${backendUrl}/smtp-status`);
      const data = await response.json();
      
      if (data.status === 'online') {
        setSmtpStatus('online');
        console.log('SMTP Status: Online');
      } else {
        setSmtpStatus('offline');
        console.log('SMTP Status: Offline', data.error);
      }
    } catch (error) {
      setSmtpStatus('offline');
      console.error('Error checking SMTP status:', error);
    }
  }, []);

  // Initialize socket connection
  useEffect(() => {
    // Get backend URL from environment variable or use default
    // For production: Set VITE_BACKEND_URL=https://your-domain.com:3001 or your backend URL
    // For development: Uses http://localhost:3001
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
    
    console.log('Connecting to backend:', backendUrl);
    
    const newSocket = io(backendUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
    });

    newSocket.on('connect', () => {
      console.log('Connected to notification server');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from notification server');
      setIsConnected(false);
      setNotificationsEnabled(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      console.error('Failed to connect to:', backendUrl);
      setIsConnected(false);
      setSmtpStatus('offline');
      
      // Don't show toast on every connection attempt, only log it
      console.warn('Backend server is not running. Please start it with: npm run server');
    });

    // Handle incoming notifications
    newSocket.on('notification', (data) => {
      const notification: Notification = {
        id: `${Date.now()}-${Math.random()}`,
        type: data.type,
        title: getNotificationTitle(data.type),
        message: data.data.message,
        timestamp: data.timestamp,
        read: false
      };

      setNotifications(prev => [notification, ...prev]);

      // Show toast notification
      toast({
        title: notification.title,
        description: notification.message,
        variant: data.type === 'contact-error' ? 'destructive' : 'default'
      });
    });

    // Handle new review submissions
    newSocket.on('new-review', (reviewData) => {
      console.log('New review received:', reviewData);
      // This will be handled by the CustomerReviews component
      // You can emit a custom event or use a callback here
    });

    // Handle notification subscription confirmation
    newSocket.on('notification-subscribed', (data) => {
      console.log('Subscribed to notifications:', data);
      setNotificationsEnabled(true);
      toast({
        title: 'Notifications Enabled',
        description: 'You will now receive real-time notifications',
      });
    });

    // Handle notification unsubscription confirmation
    newSocket.on('notification-unsubscribed', (data) => {
      console.log('Unsubscribed from notifications:', data);
      setNotificationsEnabled(false);
      toast({
        title: 'Notifications Disabled',
        description: 'You will no longer receive real-time notifications',
      });
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [toast]);

  // Check SMTP status when connection state changes
  useEffect(() => {
    if (isConnected && socket) {
      // Initial check
      checkSmtpStatus();
      // Set up periodic checking every 30 seconds
      const interval = setInterval(() => {
        checkSmtpStatus();
      }, 30000);
      return () => clearInterval(interval);
    } else {
      setSmtpStatus('offline');
    }
  }, [isConnected, socket, checkSmtpStatus]);

  const subscribeToNotifications = useCallback(() => {
    if (socket && isConnected) {
      socket.emit('subscribe-notifications', {
        userId: 'anonymous', // In a real app, you'd use actual user ID
        timestamp: new Date().toISOString()
      });
    }
  }, [socket, isConnected]);

  const unsubscribeFromNotifications = useCallback(() => {
    if (socket && isConnected) {
      socket.emit('unsubscribe-notifications');
    }
  }, [socket, isConnected]);

  const sendContactForm = useCallback(async (data: ContactFormData): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (!socket || !isConnected) {
        reject(new Error('Not connected to server'));
        return;
      }

      socket.emit('contact-submission', data);

      // Listen for response
      const handleResponse = (response: ContactResponse) => {
        socket.off('contact-response', handleResponse);
        window.clearTimeout(timeoutId);
        if (response.success) {
          resolve();
        } else {
          reject(new Error(response.message));
        }
      };

      socket.on('contact-response', handleResponse);

      // Timeout after 30 seconds
      const timeoutId = window.setTimeout(() => {
        socket.off('contact-response', handleResponse);
        reject(new Error('Request timeout'));
      }, 30000);
    });
  }, [socket, isConnected]);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const getNotificationTitle = (type: string): string => {
    switch (type) {
      case 'contact-success':
        return 'Contact Form Submitted';
      case 'feedback-success':
        return 'Feedback Submitted';
      case 'contact-error':
        return 'Submission Error';
      default:
        return 'Notification';
    }
  };

  const value: NotificationContextType = {
    socket,
    isConnected,
    smtpStatus,
    notificationsEnabled,
    notifications,
    subscribeToNotifications,
    unsubscribeFromNotifications,
    sendContactForm,
    clearNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
