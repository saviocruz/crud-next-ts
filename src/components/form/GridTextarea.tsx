import React from "react";
import { FormField, GridColumn, SemanticWIDTHS } from "semantic-ui-react";
interface Props {
    titulo: string;
    name: string;
    required?: boolean;
    width: SemanticWIDTHS;
    rows?: number
    value: any;
    handleChange: any;
    placeholder?: string;
    autoFocus?: boolean
}

function GridTextarea({ titulo, name, required, width, rows, value, handleChange, placeholder, autoFocus }: Props) {
    return (
        <React.Fragment>
            <GridColumn width={width}>
                <FormField>
                    <label htmlFor={name}>{titulo}</label>

                    <textarea
                        rows={5}
                        required={required}
                        name={name}
                        id={name}
                        placeholder={placeholder}
                        onChange={handleChange}
                        value={value} /> 
                </FormField>
            </GridColumn>
        </React.Fragment>
    )
}

export default GridTextarea