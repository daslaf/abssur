import { createClient } from 'contentful';

let cache = {};

const contentfulClient = createClient({
  space: 'p3s32qpfedpm',
  accessToken: 'bf04f764f6b80c655524304c147ec2e6aabdf393f2b99001e02bf99656aa8653'
});

export const getEntry = async query => {
  const key = JSON.stringify(query);

  if (!cache[key]) {
    try {
      const res = await contentfulClient.getEntry({ locale: '*', ...query });
      cache[key] = res;
    }
    catch (err) {
      console.log('oppsie daisy', err);
    }
  }

  return Promise.resolve(cache[key]);
};

export const getEntries = async query => {
  const key = JSON.stringify(query);

  if (!cache[key]) {
    try {
      const res = await contentfulClient.getEntries({ locale: '*', ...query });
      cache[key] = res;
    }
    catch (err) {
      console.log('oppsie daisy', err);
    }
  }

  return Promise.resolve(cache[key]);
};
