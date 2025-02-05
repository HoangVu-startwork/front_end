/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.cache = false; // Tắt cache để gỡ lỗi
    config.resolve.alias = {
      ...config.resolve.alias,
      punycode: false, // Tắt punycode nếu gặp lỗi liên quan đến nó
    };
    return config;
  },

  async redirects() {
    return [
      {
        source: '/404',
        destination: '/error',  // Chuyển hướng tới trang lỗi của bạn
        permanent: false,  // Chuyển hướng tạm thời
      },
    ];
  },
};

export default nextConfig;
