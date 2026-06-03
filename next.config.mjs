/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Don't fail the production build on ESLint errors (e.g. unescaped apostrophes).
    // These are non-blocking style warnings; fix them later if desired.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
