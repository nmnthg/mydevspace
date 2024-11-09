/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lvhyctrolcfedujsavhj.supabase.co"
            }
        ]
    }
};

export default nextConfig;
