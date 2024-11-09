import React from 'react';

const PdfViewer = ({ url }) => {
  if (!url) {
    return <p>No PDF URL provided</p>;
  }

  return (
    <iframe
      src={url}
      width="100%"
      height="100%"
      style={{ minHeight: '80vh', border: 'none' }}
      title="PDF Viewer"
    />
  );
};

export default PdfViewer;