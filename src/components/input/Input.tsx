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
    checkPassword?: boolean;
}

type InputError = {
    isEmpty?: boolean,
    isInvalid?: boolean,
    longEnough?: boolean,
    hasNumbers?: boolean,
    hasUppercase?: boolean,
    hasLowercase?: boolean,
    hasSpecials?: boolean,
}

export const Input: React.FunctionComponent<Props> = ({
                                                          name, type, required, label, areSpacesAllowed, className,
                                                          placeholder, onChange, checkPassword
                                                      }) => {

    const [inputValue, setInputValue] = useState<string>('');
    const [inputChanged, setInputChanged] = useState<boolean>(false);
    const [inputError, setInputError] = useState<InputError>({});

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

        if (checkPassword) {
            let longEnough = false;
            let hasUppercase = true;
            let hasLowercase = true;
            let hasNumbers = true;
            let hasSpecials = true;
            let isInvalid = true;

            console.log('checking password: ' + inputValue);
            if (inputValue.length >= 8) {
                longEnough = true;
            }

            if (!inputValue.match('[A-Z]')) {
                console.log('No uppercase letters');
                hasUppercase = false;
            }

            if (!inputValue.match('[a-z]')) {
                console.log('No lowercase letters');
                hasLowercase = false;
            }

            if (!inputValue.match('[0-9]')) {
                console.log('No numbers');
                hasNumbers = false;
            }

            if (!inputValue.match('[!@#$%^&*()_+=-?/\\|<>~`,.]')) {
                console.log('No specials');
                hasSpecials = false;
            }

            if (hasUppercase && hasLowercase && hasNumbers && hasSpecials){
                isInvalid = false;
            }

            setInputError({
                ...inputError,
                isEmpty: false,
                isInvalid: isInvalid,
                longEnough: longEnough,
                hasUppercase: hasUppercase,
                hasLowercase: hasLowercase,
                hasSpecials: hasSpecials,
                hasNumbers: hasNumbers,
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
        console.log(inputError);
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
            {!checkPassword && inputError.isInvalid ? "Entered value is invalid" : ""}
            {checkPassword && inputError.isInvalid && inputError.isInvalid ?
                "Your password does not meet some requirements:\n" : ""}
            <span className={'password-error'}>
                {checkPassword && inputError.isInvalid && !inputError.longEnough ?
                    "- Password must have at least 8 symbols\n" : ""}
                {checkPassword && inputError.isInvalid && !inputError.hasUppercase ?
                    "- Password must have uppercase letters \n" : ""}
                {checkPassword && inputError.isInvalid && !inputError.hasLowercase ?
                    "- Password must have lowercase letters \n" : ""}
                {checkPassword && inputError.isInvalid && !inputError.hasNumbers ?
                    "- Password must have numbers              \n" : ""}
                {checkPassword && inputError.isInvalid && !inputError.hasSpecials ?
                    "- Password must have special symbols   \n" : ""}
            </span>
        </div>
    </div>)
};
