# 🏋️ [Gym Name] — High-Performance Gym & Training Center Website

A modern, high-performance, responsive web application built with **React**, **Vite**, **Tailwind CSS**, and **Supabase** for **[Gym Name]**.

Deployed on **Netlify** with single-page application (SPA) routing and full live administrative management.

---

## 📍 Facility Details (Dynamic & Placeholder Configuration)

All details are fully customizable via the embedded **Admin Portal** or by passing configuration into `src/data/gymData.js`:

- **Gym Name**: `[Gym Name]`
- **Address**: `[Gym Address]`
- **Contact Number**: `[Contact Number]`
- **Operational Hours & Shift Timings**:
  - **Morning Shift**: `[Morning Shift Timings]` (e.g. 6:00 AM – 10:00 AM)
  - **Evening Shift**: `[Evening Shift Timings]` (e.g. 5:00 PM – 10:00 PM)
  - **Sunday Open Floor**: `[Sunday Timings]` (e.g. 7:00 AM – 10:00 AM)
- **Instagram**: `[Instagram Link]`
- **Google Maps**: `[Google Maps Link]`

---

## 🎨 Design System & Features

- **Dark Athletic Identity**: Obsidian dark backdrop (`#070a12`, `#0b0f19`), electric crimson red accents (`#ef4444`), and neon cyan glow (`#06b6d4`).
- **Custom Visual Showcase**: Features precision German-designed commercial cardio treadmills, plate-loaded strength stations, and clean AC training floor.
- **Admin Portal**: Integrated management portal in the footer allowing instant updates to gym name, batch hours, membership fees, active promo offers, and local image uploads via file/folder chooser.
- **Interactive Workout Routine Finder**: 4-step assessment generating personalized workout splits and caloric targets based on athlete goals.
- **Digital VIP Pass**: Free 1-Day Trial Pass generator with instant digital card verification and WhatsApp confirmation.
- **Health Tools**: Interactive BMI and TDEE calorie calculator with target deficit/surplus projections.
- **Netlify Ready**: Configured with `netlify.toml` and `_redirects` for seamless SPA deployment.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Local Development
```bash
# Clone the repository
git clone https://github.com/buildwelldevelops-arch/Elite-gym.git
cd Elite-gym

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 🔒 Admin Portal Access
- Open the website and scroll to the footer.
- Click the **Admin Portal** button.
- Default Passcode: `admin123`
- Make live changes to settings, photos, and offers without opening external database dashboards.

---

## 📄 License
MIT License
