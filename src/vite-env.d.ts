/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BRAND_NAME?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_FORM_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
