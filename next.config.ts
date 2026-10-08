import type { NextConfig } from "next";

// A nova sede tem site próprio. Estes atalhos levam para lá; são temporários
// (307) porque, depois da mudança, o endereço pode ganhar uma página aqui.
const NEW_CAMPUS_URL = "https://novasede.cppem.com.br";

// Cabeçalhos de segurança em todas as respostas. Sem Content-Security-Policy de propósito:
// GTM e PixelX carregam scripts de vários domínios, e uma política errada desligaria o rastreamento.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // impede que o site seja aberto dentro de um iframe de outro domínio (clickjacking)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  // não anuncia "X-Powered-By: Next.js"
  poweredByHeader: false,
  images: {
    qualities: [75, 100],
  },
  async redirects() {
    return ["/localizacao", "/nova-sede", "/novasede"].map((source) => ({ source, destination: NEW_CAMPUS_URL, permanent: false }));
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
