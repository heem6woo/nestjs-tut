export const ErrorMessages = {
    UNAUTHORIZED: 'Unauthorized access',
    NOT_FOUND: 'Resource not found',
    BAD_REQUEST: 'Invalid request',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    INVALID_CREDENTIALS: 'Invalid credentials',
    FORBIDDEN: 'Access forbidden',
    VALIDATION_ERROR: 'Validation failed',
    DUPLICATE_ENTRY: 'Resource already exists',
    TOKEN_EXPIRED: 'Token has expired',
    INVALID_TOKEN: 'Invalid token',
    NOT_SUPPORTED_PROVIDER: 'Not supported provider'
} as const;

// Optional: Create a type from the values
export type ErrorMessageType = typeof ErrorMessages[keyof typeof ErrorMessages]; 