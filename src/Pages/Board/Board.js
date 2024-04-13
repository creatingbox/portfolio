import React from 'react';
import Project from '../Project/Project';
import Interesting from '../Interesting/Interesting';

function CombinedPage() {
  return (
    <div>
      <div className="section_ganttchart">
        <Project />
      </div>
      <div className="section_randarchart">
        <Interesting />
      </div>
    </div>
  );
}

export default CombinedPage;