import { FunctionComponent } from 'react';

interface LabelFieldProps {
  label: string;
}

export const LabelField: FunctionComponent<LabelFieldProps> = (props) => (
  <div className="form-group">
    <div className="col-sm-offset-3 col-sm-3 col-md-8">
      <p className="form-control-static">
        <strong>{props.label}</strong>
      </p>
    </div>
  </div>
);
