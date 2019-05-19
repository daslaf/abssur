export const DisplayStatus = {
  Exited: 'Exited',
  Entering: 'Entering',
  Entered: 'Entered',
  Exiting: 'Exiting'
};

export const getClass = (status, prefix = '') => (status ? prefix + DisplayStatus[status] : '');

