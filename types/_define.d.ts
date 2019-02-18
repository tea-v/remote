type PublicKey = { [key in 'alg' | 'e' | 'kid' | 'kty' | 'n' | 'use']: string };

declare var USER_POOL_PUBLIC_KEYS: PublicKey[];
declare var USER_POOL_URL: string;
