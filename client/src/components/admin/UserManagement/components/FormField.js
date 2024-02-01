import { FormGroup, Form, Row, Col } from 'react-bootstrap';

const FormField = ({ label, type, name, placeholder, value, onChange, options }) => {
    return (
      <FormGroup className="mb-3" as={Row}>
        <Form.Label column sm={2}>
          {label}:
        </Form.Label>
        <Col sm={10}>
          {type === "select" ? (
            <Form.Select name={name} value={value} onChange={onChange}>
              {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </Form.Select>
          ) : (
            <Form.Control
              type={type}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
          )}
        </Col>
      </FormGroup>
    );
};
  
export default FormField;