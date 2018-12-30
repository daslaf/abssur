import { createClient } from 'contentful';

const contentfulClient = createClient({
  space: 'p3s32qpfedpm',
  accessToken: 'bf04f764f6b80c655524304c147ec2e6aabdf393f2b99001e02bf99656aa8653'
});

export default contentfulClient;
