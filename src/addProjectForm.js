import React from 'react';
import { Field, reduxForm } from 'redux-form';

const AddProjectForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Project Name</label>
        <div>
          <Field
            name="projectName"
            component="input"
            type="text"
            placeholder="Project Name"
          />
        </div>
      </div>


      <div>
        <label>Team Size</label>
        <div>
          <Field name="teamSize" component="select">
            <option />
            <option value="small">{"< 6"}</option>
            <option value="medium">{"6 - 12"}</option>
            <option value="large">{"12 - 20"}</option>
            <option value="xlarge">{"> 20"}</option>
            <option value="nan">{"N/A"}</option>
          </Field>
        </div>
      </div>


      <div>
        <label>Amount</label>
        <div>
          <Field name="amount" component="select">
            <option />
            <option value="free">{"free"}</option>
            <option value="small">{"< 20"}</option>
            <option value="medium">{"20 - 50"}</option>
            <option value="large">{"> 50"}</option>
            <option value="nan">{"N/A"}</option>
          </Field>
        </div>
      </div>

      <div>
        <label>Location</label>
        <div>
          <Field name="location" component="select">
            <option />
            <option value="indoors">{"Indoors"}</option>
            <option value="outdoors">{"Outdoors"}</option>
            <option value="office">{"In office"}</option>
            <option value="nan">{"N/A"}</option>
          </Field>
        </div>
      </div>

      <div>
        <label>Cultural Values</label>
        <div>
          <Field name="culturalValues" component="select">
            <option />
            <option value="empath">{"Empath"}</option>
            <option value="lover">{"Lover"}</option>
            <option value="adventurous">{"Adventurous"}</option>
            <option value="owner">{"Owner"}</option>
            <option value="genius">{"Genius"}</option>
            <option value="freebird">{"Freebird"}</option>
          </Field>
        </div>
      </div>
      <div>
        <label>Type of Activity</label>
        <div>
          <Field name="typeOfActivity" component="select">
            <option />
            <option value="active">{"Active"}</option>
            <option value="educational">{"Educational"}</option>
            <option value="social">{"Social"}</option>
            <option value="funny">{"Funny"}</option>
            <option value="nan">{"N/A"}</option>
          </Field>
        </div>
      </div>


      <div>
        <label>Duration</label>
        <div>
          <Field name="duration" component="select">
            <option />
            <option value="day">{"A day"}</option>
            <option value="evening">{"One evening"}</option>
            <option value="nan">{"N/A"}</option>
          </Field>
        </div>
      </div>

      <div>
        <label>Does it repeat?</label>
        <div>
          <Field name="repeats" component="select">
            <option />
            <option value="no">{"No"}</option>
            <option value="weekly">{"Weekly"}</option>
            <option value="monthly">{"Monthly"}</option>
            <option value="quarterly">{"Quarterly"}</option>
            <option value="yearly">{"Yearly"}</option>
          </Field>
        </div>
      </div>
      <div>
        <label>Project Description</label>
        <div>
          <Field
            name="projectDescription"
            component="textarea"
            type="text"
            placeholder="Project Description"
          />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(AddProjectForm);
