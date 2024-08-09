import sanitizeHtml from 'sanitize-html';

export const removeHtmlTags = (str : any) => {
    const clean = sanitizeHtml(str,{
      allowedTags: [],
      allowedAttributes: {}
    });
    return clean;
  };