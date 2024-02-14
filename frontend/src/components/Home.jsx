import React, { useState } from 'react';
import ImageGalary from './ImageGalary.jsx';
import Upload from './Upload.jsx';

const Home = () => {

  return (
    <main className="h-screen border font-Roboto w-screen">
      <Upload />
      <ImageGalary />
    </main>
  );
};

export default Home;
