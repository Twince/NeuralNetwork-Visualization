export const normalizeNetworkConfig = (networkConfig: any) => {
    const { inputNodes, ...rest } = networkConfig;
    const normalizedNetworkInfo = { inputNodes: inputNodes / 8, ...rest };
    return normalizedNetworkInfo;
};
