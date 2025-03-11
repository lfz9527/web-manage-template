const isProduction = process.env.NODE_ENV === 'production';

const formatImageUrl = (link: string) => {
  if (!link) return '';
  if (link && link.startsWith('http')) {
    return link;
  } else {
    return `${UPLOAD_URL}${link}`;
  }
};

export { formatImageUrl, isProduction };
