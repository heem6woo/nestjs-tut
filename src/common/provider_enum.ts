const PROVIDER = {
    KAKAO: 'kakao'
} as const;
type PROVIDER = typeof PROVIDER[keyof typeof PROVIDER];