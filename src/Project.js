import React from 'react';
import classnames from 'classnames';

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
            return <span key={tag} className={classnames("Project__label", tag)}>{tag}</span>
          })
        }
      </div>
    </div>
  </div>
)
