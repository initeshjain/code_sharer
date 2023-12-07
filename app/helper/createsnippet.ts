import { AES, enc } from "crypto-js";

export const createSnippet = async (
  code: string,
  language: string,
  expiry: string
) => {
  const currentTime = new Date();
  const expiryTime = calculateExpiry(currentTime, expiry);

  const snippetData = {
    code: code,
    language: language,
    expiry: expiryTime.toISOString(),
  };

  const jsonString: string = JSON.stringify(snippetData);
  const encodedData = encodeWithKey(jsonString, process.env.KEY || "");

  if (encodedData !== null) {
    try {
      const parsedEncodedData = encodeURIComponent(encodedData);
      const HOST: string =
        process.env.NEXT_PUBLIC_HOST || "https://code.noobgeek.in";
      const ShortnerHost: string = "https://api.shrtco.de/v2";
      const response: Response = await fetch(
        `${ShortnerHost}/shorten?url=${HOST}/snippet?s=${parsedEncodedData}`
      );
      const data = await response.json();
      return data;
    } catch (e) {
      return null;
    }
  }

  return null;
};

function calculateExpiry(currentTime: Date, expiry: string): Date {

  if (expiry === "never") {
    return new Date(9999, 11, 31);
  }

  const timeMultiplier: { [key: string]: number } = {
    "15m": 15 * 60 * 1000,
    "30m": 30 * 60 * 1000,
    "1h": 60 * 60 * 1000,
    "3h": 3 * 60 * 60 * 1000,
    "6h": 6 * 60 * 60 * 1000,
    "12h": 12 * 60 * 60 * 1000,
    "24h": 24 * 60 * 60 * 1000,
  };

  const expiryMillis = timeMultiplier[expiry];
  return new Date(currentTime.getTime() + expiryMillis);
}

function encodeWithKey(data: string, key: string): string {
  const encoded = AES.encrypt(data, key).toString();
  return encoded;
}

export const decrypt = (data: string): string | null => {
  try {
    const decryptedBytes = AES.decrypt(data, process.env.KEY || "");
    const decryptedText = decryptedBytes.toString(enc.Utf8);
    return decryptedText;
  } catch (error) {
    return null;
  }
};
