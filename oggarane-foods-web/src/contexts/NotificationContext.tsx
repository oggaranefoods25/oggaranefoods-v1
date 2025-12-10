import React, { createContext, useContext, useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface NotificationContextType {
  isConnected: boolean;
  notificationsEnabled: boolean;
  notifications: Notification[];
  subscribeToNotifications: () => void;
  unsubscribeFromNotifications: () => void;
  clearNotifications: () => void;
}

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
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
  // Since we're using API functions directly, we don't need Socket.IO connection
  // Keeping isConnected as true since API functions are always available
  const [isConnected] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();

  const subscribeToNotifications = useCallback(() => {
    setNotificationsEnabled(true);
    toast({
      title: 'Notifications Enabled',
      description: 'You will receive notifications about your submissions.',
    });
  }, [toast]);

  const unsubscribeFromNotifications = useCallback(() => {
    setNotificationsEnabled(false);
    toast({
      title: 'Notifications Disabled',
      description: 'You will no longer receive notifications.',
    });
  }, [toast]);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const value: NotificationContextType = {
    isConnected,
    notificationsEnabled,
    notifications,
    subscribeToNotifications,
    unsubscribeFromNotifications,
    clearNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
