type PublicKey = { [key in 'alg' | 'e' | 'kid' | 'kty' | 'n' | 'use']: string };

declare var PUBLIC_KEYS: PublicKey[];
declare var USER_POOL_URL: string;
