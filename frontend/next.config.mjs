/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        apiBase: "http://localhost:8000"
    }
};

export default nextConfig;
