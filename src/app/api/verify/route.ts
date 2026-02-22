import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ paid: false, error: 'No session ID provided' });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({ 
      paid: session.payment_status === 'paid',
      customerEmail: session.customer_details?.email || null
    });
  } catch (error) {
    console.error('Stripe verification error:', error);
    return NextResponse.json({ paid: false, error: 'Verification failed' });
  }
}
