export const generateSpaceIds = (prefix: string, count: number): string[] => {
    const uniqueIds = [];
    for (let i = 0; i < count; i++) {
      uniqueIds.push(`${prefix}${Math.floor(100000 + Math.random() * 900000)}`); // Generates an ID like SP123456
    }
    return uniqueIds;
  };