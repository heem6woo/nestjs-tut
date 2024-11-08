export const PROVIDER = {
    KAKAO: 'kakao',
    OPENBANKING: 'openbanking'
} as const;
export type PROVIDER = typeof PROVIDER[keyof typeof PROVIDER];