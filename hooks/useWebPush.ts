import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

// Helper to convert URL-safe base64 to Uint8Array
function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// Helper to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer: ArrayBuffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

// Get subscription from browser
async function getBrowserSubscription() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        return null;
    }

    try {
        const registration = await navigator.serviceWorker.ready;
        return await registration.pushManager.getSubscription();
    } catch (error) {
        console.error('Error getting browser subscription:', error);
        return null;
    }
}

export function useWebPush() {
    const queryClient = useQueryClient();

    // Check subscription status from server
    const { data: statusData, isLoading: statusLoading } = useQuery({
        queryKey: ['push-notification-status'],
        queryFn: async () => {
            const response = await axios.get('/api/notifications/status');
            return response.data as {
                subscribed: boolean;
                subscriptions: Array<{
                    id: string;
                    endpoint: string;
                    userAgent?: string;
                    createdAt: string;
                }>;
            };
        },
        retry: 1,
    });

    // Auto-heal: Check browser vs server subscription state
    useEffect(() => {
        const autoHeal = async () => {
            if (statusLoading || !statusData) return;

            const browserSub = await getBrowserSubscription();
            const serverHasSub = statusData.subscribed;
            const serverEndpoints = statusData.subscriptions.map((s) => s.endpoint);

            // Case 1: Browser has subscription but server doesn't have it
            if (browserSub && !serverEndpoints.includes(browserSub.endpoint)) {
                console.log('Auto-healing: Syncing browser subscription to server');
                try {
                    const p256dh = arrayBufferToBase64(browserSub.getKey('p256dh')!);
                    const auth = arrayBufferToBase64(browserSub.getKey('auth')!);

                    await axios.post('/api/notifications/subscribe', {
                        endpoint: browserSub.endpoint,
                        p256dh,
                        auth,
                        userAgent: navigator.userAgent,
                    });

                    queryClient.invalidateQueries({ queryKey: ['push-notification-status'] });
                    toast.success('Notifications synced across devices');
                } catch (error) {
                    console.error('Auto-heal failed:', error);
                }
            }
        };

        autoHeal();
    }, [statusData, statusLoading, queryClient]);

    // Subscribe to push notifications
    const subscribe = useMutation({
        mutationFn: async () => {
            // Check if browser supports notifications
            if (!('serviceWorker' in navigator)) {
                throw new Error('Service workers are not supported in this browser');
            }

            if (!('PushManager' in window)) {
                throw new Error('Push messaging is not supported in this browser');
            }

            // Request permission
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                throw new Error('Notification permission denied');
            }

            // Get VAPID public key
            const { data: vapidData } = await axios.get<{ publicKey: string }>(
                '/api/notifications/vapid-public-key'
            );

            // Get service worker registration
            const registration = await navigator.serviceWorker.ready;

            // Check existing subscription
            let subscription = await registration.pushManager.getSubscription();

            // If no subscription exists, create one
            if (!subscription) {
                subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(vapidData.publicKey),
                });
            }

            // Convert keys to base64
            const p256dh = arrayBufferToBase64(subscription.getKey('p256dh')!);
            const auth = arrayBufferToBase64(subscription.getKey('auth')!);

            // Send to server
            const response = await axios.post('/api/notifications/subscribe', {
                endpoint: subscription.endpoint,
                p256dh,
                auth,
                userAgent: navigator.userAgent,
            });

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['push-notification-status'] });
            toast.success('🔔 Notifications enabled successfully!');
        },
        onError: (error: any) => {
            console.error('Subscribe error:', error);
            const message = error.response?.data?.error || error.message || 'Failed to enable notifications';
            toast.error(message);
        },
    });

    // Unsubscribe from push notifications
    const unsubscribe = useMutation({
        mutationFn: async () => {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();

            if (subscription) {
                await subscription.unsubscribe();

                await axios.post('/api/notifications/unsubscribe', {
                    endpoint: subscription.endpoint,
                });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['push-notification-status'] });
            toast.success('Notifications disabled');
        },
        onError: (error: any) => {
            console.error('Unsubscribe error:', error);
            toast.error('Failed to disable notifications');
        },
    });

    // Send test notification
    const sendTest = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/notifications/test');
            return response.data;
        },
        onSuccess: (data) => {
            toast.success(data.message || 'Test notification sent!');
        },
        onError: (error: any) => {
            console.error('Test notification error:', error);
            const message = error.response?.data?.error || 'Failed to send test notification';
            toast.error(message);
        },
    });

    return {
        isSubscribed: statusData?.subscribed ?? false,
        subscriptions: statusData?.subscriptions ?? [],
        isLoading: statusLoading,
        subscribe,
        unsubscribe,
        sendTest,
    };
}
