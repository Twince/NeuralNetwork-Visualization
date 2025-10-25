import { networkConfig } from '@/controller/constants/types/networkConfig.ts';

export const findWidestLayer = (obj: networkConfig) =>
    Object.entries(obj).reduce((max, [key, value]) => (value > max.value ? { key, value } : max), {
        key: null,
        value: -Infinity,
    });
