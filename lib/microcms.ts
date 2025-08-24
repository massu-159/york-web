import { createClient } from 'microcms-js-sdk';

/**
 * microCMSのクライアントを作成する
 */
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

