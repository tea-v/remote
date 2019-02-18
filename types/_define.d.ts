type PUBLIC_KEY = {
  [key in 'alg' | 'e' | 'kid' | 'kty' | 'n' | 'use']: string
};

declare var PUBLIC_KEYS: PUBLIC_KEY[];
declare var USER_POOL_URL: string;
