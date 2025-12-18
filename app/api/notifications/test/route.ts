import { auth } from '@/lib/auth';
import { prisma_db } from '@/lib/prisma';
import { sendPushNotification } from '@/lib/web-push';
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Get all subscriptions for current user
        const subscriptions = await prisma_db.pushSubscription.findMany({
            where: { userId: session.user.id },
        });

        if (subscriptions.length === 0) {
            return NextResponse.json(
                { error: 'No active push subscriptions found' },
                { status: 404 }
            );
        }

        const payload = {
            title: '🔔 Test Notification',
            body: 'Your push notifications are working perfectly!',
            url: '/dashboard',
            icon: '/icon-192x192.png',
            badge: '/badge-72x72.png',
        };

        // Send to all devices
        const results = await Promise.all(
            subscriptions.map(async (sub) => {
                const result = await sendPushNotification(sub, payload);

                // Remove expired subscriptions
                if (result.expired) {
                    await prisma_db.pushSubscription.delete({
                        where: { id: sub.id },
                    });
                }

                return result;
            })
        );

        const successCount = results.filter((r) => r.success).length;

        return NextResponse.json({
            message: `Test notification sent to ${successCount} device(s)`,
            successCount,
        });
    } catch (error) {
        console.error('Test notification error:', error);
        return NextResponse.json(
            { error: 'Failed to send test notification' },
            { status: 500 }
        );
    }
}
