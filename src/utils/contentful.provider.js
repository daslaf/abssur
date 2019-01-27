import { createClient } from 'contentful';

let cache = {};

const contentfulClient = createClient({
  space: 'p3s32qpfedpm',
  accessToken: 'bf04f764f6b80c655524304c147ec2e6aabdf393f2b99001e02bf99656aa8653'
});

export const getEntry = query => {
  const _query = Object.assign({}, query, { locale: '*' });
  const key = JSON.stringify(_query);

  if (!cache[key]) {
    return contentfulClient.getEntry(_query).then(
      res => {
        cache[key] = res;
        return cache[key];
      },
      res => {
        console.log('oppsie daisy', res);
      }
    );
  }

  return Promise.resolve(cache[key]);
};

export const getEntries = query => {
  const _query = Object.assign({}, query, { locale: '*' });
  const key = JSON.stringify(_query);

  if (!cache[key]) {
    return contentfulClient.getEntries(_query).then(
      res => {
        cache[key] = res;
        return cache[key];
      },
      res => {
        console.log('oppsie daisy', res);
      }
    );
  }

  return Promise.resolve(cache[key]);
};
