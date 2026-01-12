# WECUT Next.js

This is the Next.js App Router version of the WECUT website.

## Getting Started

1. Install dependencies:
```bash
cd nextjs
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
nextjs/
├── app/              # App Router pages
│   ├── layout.js     # Root layout with Navbar & Footer
│   ├── page.js       # Home page
│   ├── shop/         # The Lab (e-commerce)
│   ├── locations/    # Salon locations
│   ├── services/     # Service menu
│   └── about/        # About page
├── components/       # Reusable components
├── lib/              # Utility functions (Supabase, Stripe)
├── public/assets/    # Static images
└── styles/           # Global CSS
```

## Next Steps

### Phase 2: Supabase Integration
1. Install Supabase: `npm install @supabase/supabase-js`
2. Create `lib/supabase.js` with your credentials
3. Add `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Update `app/locations/page.js` to fetch from Supabase

### Phase 3: Stripe Integration
1. Install Stripe: `npm install @stripe/stripe-js`
2. Create `lib/stripe.js` with your publishable key
3. Add `.env.local` with `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
4. Update `app/shop/page.js` with product data and checkout flow

## Deployment

Deploy to Vercel:
```bash
vercel
```

Remember to add environment variables in the Vercel dashboard.
