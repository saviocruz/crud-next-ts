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
}

function GridTextarea({ titulo, name, required, width, rows, value, handleChange, placeholder }: Props) {
    return (
        <React.Fragment>
            <GridColumn width={width}>
                <FormField>
                    <label htmlFor={name}>{titulo}
                    {(required) &&(
                        <span style={{color:"red"}} > * </span>)}
                    </label>

                    <textarea
                        rows={rows}
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