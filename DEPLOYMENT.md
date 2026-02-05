# 🚀 Vercel Deployment Guide - Corbin Staffing

## ✅ PRE-DEPLOYMENT CHECKLIST

### Build Status
- ✅ **Production build successful** (no errors)
- ✅ **All TypeScript errors resolved**
- ✅ **All ESLint warnings handled**
- ✅ **Git commits up to date**

### Environment Variables Ready
- ✅ `NEXT_PUBLIC_EMAILJS_SERVICE_ID` = service_0ntkjxo
- ✅ `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` = kgORQSN_eXCQRPUoy
- ✅ `NEXT_PUBLIC_EMAILJS_BOOK_CONSULT_TEMPLATE_ID` = template_q8cu1nn
- ✅ `NEXT_PUBLIC_EMAILJS_HIRING_FORM_TEMPLATE_ID` = template_thlqq8a

---

## 📝 VERCEL DEPLOYMENT STEPS

### Step 1: Push to GitHub/GitLab (Optional but Recommended)
```bash
# If you haven't already, initialize a remote repository
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel CLI (Fastest)
```bash
npm i -g vercel
vercel login
vercel
```

#### Option B: Deploy via Vercel Dashboard (Recommended)
1. Go to https://vercel.com/new
2. Import your Git repository (or use Vercel CLI)
3. Configure project:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Step 3: Add Environment Variables
In Vercel Dashboard → Project Settings → Environment Variables, add:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_0ntkjxo
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=kgORQSN_eXCQRPUoy
NEXT_PUBLIC_EMAILJS_BOOK_CONSULT_TEMPLATE_ID=template_q8cu1nn
NEXT_PUBLIC_EMAILJS_HIRING_FORM_TEMPLATE_ID=template_thlqq8a
```

**Important**: Add these to ALL environments (Production, Preview, Development)

### Step 4: Configure Domain
1. Go to Project Settings → Domains
2. Add your custom domain: `corbinstaffing.com`
3. Add `www.corbinstaffing.com` (recommended)
4. Follow Vercel's DNS instructions to point your domain

### Step 5: Update Metadata Base URL
After deployment, update `src/app/layout.tsx`:
```typescript
metadataBase: new URL('https://corbinstaffing.com'),
```
Or use your Vercel domain if not using custom domain yet.

---

## 🔍 POST-DEPLOYMENT VERIFICATION

### Critical Tests
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Book a Consult form submits successfully
- [ ] Hiring/Contact form submits successfully
- [ ] EmailJS receives test submissions
- [ ] Images load properly (hero, about, team, logo)
- [ ] Videos play correctly on locations page
- [ ] WhatsApp button opens correctly
- [ ] Mobile responsive on all pages
- [ ] All pages load without console errors

### Performance Checks
- [ ] Run Lighthouse audit (aim for 90+ on all metrics)
- [ ] Test on multiple devices (mobile, tablet, desktop)
- [ ] Test on multiple browsers (Chrome, Safari, Firefox, Edge)
- [ ] Verify SSL certificate is active (https://)

### EmailJS Verification
1. Submit test form on Book a Consult page
2. Check EmailJS dashboard for delivery
3. Verify email received at info@corbinstaffing.com
4. Test Hiring Form as well

---

## ⚙️ VERCEL PROJECT SETTINGS

### Recommended Settings
- **Node.js Version**: 18.x or 20.x (default is fine)
- **Automatically expose System Environment Variables**: ON
- **Function Region**: Choose closest to your users
- **Analytics**: Enable Vercel Analytics (optional, free tier)
- **Speed Insights**: Enable (optional, free tier)

---

## 🔄 CONTINUOUS DEPLOYMENT

Once connected to Git:
- Every push to `main` branch = automatic production deployment
- Every push to other branches = preview deployment
- Vercel provides preview URLs for testing

---

## 📊 MONITORING & ANALYTICS

### Post-Launch Setup
1. **Google Analytics**: Add GA4 tracking code to `layout.tsx`
2. **Google Search Console**: Verify ownership
3. **Vercel Analytics**: Enable in project settings
4. **Error Tracking**: Consider Sentry integration

---

## 🚨 TROUBLESHOOTING

### If Build Fails
```bash
# Test locally first
npm run build
# If successful locally but fails on Vercel, check:
# - Environment variables are set
# - Node version compatibility
# - Build logs in Vercel dashboard
```

### If Forms Don't Work
- Verify all environment variables are set
- Check EmailJS dashboard for API limits
- Test forms in preview deployment first
- Check browser console for errors

### If Images Don't Load
- Verify images are in `/public/images/` folder
- Check file names match exactly (case-sensitive)
- Review Next.js Image Optimization settings

---

## 🎯 FINAL PRODUCTION URL

After deployment, your site will be available at:
- **Vercel URL**: `https://corbin-staffing.vercel.app` (or similar)
- **Custom Domain**: `https://corbinstaffing.com` (after DNS setup)

---

## 📞 SUPPORT

If you encounter issues:
1. Check Vercel deployment logs
2. Review Next.js documentation: https://nextjs.org/docs
3. Check Vercel documentation: https://vercel.com/docs

---

## ✨ YOU'RE READY TO DEPLOY!

Your application is production-ready. All critical features are working:
- ✅ EmailJS forms configured
- ✅ Performance optimized
- ✅ SEO metadata set
- ✅ Responsive design
- ✅ All images and assets ready
- ✅ Security headers configured

**Good luck with your launch! 🚀**
