import React, {useEffect, useState} from 'react';
import "./Input.scss";

type Props = {
    name: string;
    type: string;
    placeholder: string;
    label?: string;
    className?: string;
    required?: boolean;
    onChange?: (val: string) => void;
    areSpacesAllowed?: boolean;
}

export const Input: React.FunctionComponent<Props> = ({name, type, required, label, areSpacesAllowed, className,
                                                          placeholder, onChange}) => {

    const [inputValue, setInputValue] = useState<string>('');
    const [inputChanged, setInputChanged] = useState<boolean>(false);
    const [inputError, setInputError] = useState<{ isEmpty?: boolean, isInvalid?: boolean }>({});

    const checkField = () => {

        if (required && !inputValue) {
            setInputError({
                ...inputError,
                isEmpty: true,
                isInvalid: false
            });
            return;
        }

        if (!areSpacesAllowed && inputValue.match(/\s/g)) {
            setInputError({
                ...inputError,
                isEmpty: false,
                isInvalid: true
            });
            return;
        }

        setInputError({
            ...inputError,
            isEmpty: false,
            isInvalid: false
        });
    };

    useEffect(() => {
        setInputChanged(true);

        if (!inputChanged) {
            return;
        }

        checkField();
    }, [inputValue]);

    const changeHandler = (value: string) => {
        setInputValue(value);
        if (onChange) {
            onChange(value);
        }
    };

    return (<div className="Input">
        <div className="form-group">
            {label ? <label className={'form-control-label'}>{label}</label> : null}
            <input type={type}
                   name={name}
                   className={"form-control " + (className ? className : "") + (label ? "labeled" : "")}
                   placeholder={placeholder}
                   onChange={(event) => changeHandler(event.target.value)}/>
        </div>
        <div className="form-error">
            {inputError.isEmpty ? "This field is required" : ""}
            {inputError.isInvalid ? "Entered value is invalid" : ""}
        </div>
    </div>)
};
