import React from 'react';

export const Project = (props: {project: Object}) => (
  <div key={props.project.id} className="Project">
    <div className="Project__image">
    </div>
    <div className="Project__description">
      <h2 className="Project__name">{props.project.title}</h2>
      <p className="Project__details">
        {props.project.details}
      </p>
      <div className="Project__labels">
        {
          props.project.tags && props.project.tags.map(tag => {
            return <span key={tag} className="Project__label">{tag}</span>
          })
        }
      </div>
    </div>
  </div>
)
