import { getEntries } from '../../utils/contentful.provider';

export const getExpoGallery = () =>
  getEntries({
    content_type: 'expo',
    include: 1
  }).then(res => {
    const images = res.items[0].fields.images['es-CL'];
    
    return images.map(image => ({
      title: image.fields.title['es-CL'],
      url: image.fields.file['es-CL'].url
    }));
  });
