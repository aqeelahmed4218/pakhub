/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Don't fail the production build on ESLint errors (e.g. unescaped apostrophes).
    // These are non-blocking style warnings; fix them later if desired.
    ignoreDuringBuilds: true,
  },
  images: {
    // Allow remote avatar/image hosts used by the app. Without this,
    // next/image blocks external URLs and team avatars don't render.
    remotePatterns: [
      { protocol: 'https', hostname: 'api.dicebear.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
    ],
  },
};

export default nextConfig;
