import crypto from 'crypto';

export const generateResetToken = () => {
    const token = crypto.randomBytes(20).toString('hex');
    const hashed = crypto.createHash('sha256').update(token).digest('hex');
    return { token, hashed };
};