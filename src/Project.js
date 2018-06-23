import React from 'react';
import classnames from 'classnames';

export const Project = (props: {project: Object, labels: Array<String>}) => (
  props.project && <div key={props.project.id} className="Project">
    <div className="Project__image">
    </div>
    <div className="Project__description">
      <h2 className="Project__name">{props.project.project_name}</h2>
      <p className="Project__details">
        {props.project.description}
      </p>
    </div>
    <div className="Project__labels">
      {
          props.labels.map(label => <div key={label} className="labelrow">{label}: {props.project[label]}</div>)

      }
    </div>
  </div>
)
