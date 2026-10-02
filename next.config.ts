import type { NextConfig } from "next";

// A nova sede tem site próprio. Estes atalhos levam para lá; são temporários
// (307) porque, depois da mudança, o endereço pode ganhar uma página aqui.
const NEW_CAMPUS_URL = "https://novasede.cppem.com.br";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
  },
  async redirects() {
    return ["/localizacao", "/nova-sede", "/novasede"].map((source) => ({ source, destination: NEW_CAMPUS_URL, permanent: false }));
  },
};

export default nextConfig;
