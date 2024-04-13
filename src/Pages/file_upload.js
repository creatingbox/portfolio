import React from 'react';

function FileUpload() {
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/upload', { // 서버의 주소로 변경
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('File uploaded successfully!');
      } else {
        alert('File upload failed!');
      }
    } catch (error) {
      alert('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
}

export default FileUpload;
