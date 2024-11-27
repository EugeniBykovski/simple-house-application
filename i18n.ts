import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  try {
    const messages = (await import(`./messages/${locale}.json`)).default;
    return { messages };
  } catch (error) {
    console.error(`Error loading messages for locale: ${locale}`, error);
    throw new Error("Translation file not found");
  }
});
