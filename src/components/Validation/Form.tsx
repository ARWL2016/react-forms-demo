export class FormControl<T> {

    value: T | undefined = undefined;
    required = false;
    valid = false;
    touched = false;
    dirty = false;

    constructor(config?: FormControlConfig) {

        if (config) {
            this.value = config[0];
            this.required = config[1] || false;
        }
       
        this.valid = checkValidity(this)   
    }
}

export type FormControlConfig = [any, boolean?];

export function updateFormControl(control: FormControl<any>, value: any): FormControl<any> {
    const clone = Object.assign({}, control);

    clone.value = value;
    clone.dirty = true;
    clone.touched = true;
    clone.valid = checkValidity(clone);
    
    return clone;
}

export function checkValidity(control: FormControl<any>): boolean {
    if (control.required === false) {
        return true;
    } else {
        if (control.value !== null && control.value !== undefined && control.value !== '') {
            return true;
        } else {
            return false;
        }
    }
}

export function checkFormValidity(state: Object, controlNames: string[]): boolean {
    let valid = true;

    (controlNames || []).forEach(controlName => {
        if (state[controlName].valid === false) {
            valid = false;
        }
    });

    return valid;
}

export function checkFormIsDirty(state: Object, controlNames: string[]): boolean {
    let dirty = false;

    (controlNames || []).forEach(controlName => {
        if (state[controlName].dirty === true) {
            dirty = true;
        }
    });

    return dirty;
}