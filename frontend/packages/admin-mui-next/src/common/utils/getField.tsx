import { FieldCheckbox } from "src/components/form/field-checkbox";
import FieldSwitch from "src/components/form/field-switch";
import FieldDatePicker from "src/components/form/field-datePicker";
import FieldText from "src/components/form/field-text-field";
import FieldMul from "src/components/form/field-mul";
import {
    FieldUpload,
    FieldUploadAvatar,
    FieldUploadBox,
} from "src/components/form/field-upload";
import FieldRadioGroup from "src/components/form/field-radio-group";
import {
    FieldMultiSelect,
    FieldSelect,
} from "src/components/form/field-select";
import FieldEditor from "src/components/form/field-editor";
import FieldAutocompleteGoogle from "src/components/form/field-autocompleteGoogle";

const FormMapObj = {
    switch: FieldSwitch,
    radio: FieldRadioGroup,
    select: FieldSelect,
    editer: FieldEditor,
    autoCompleteGoogle: FieldAutocompleteGoogle,
    checkbox: FieldCheckbox,
    datePicker: FieldDatePicker,
    string: FieldText,
    multiple: FieldMul,
    upload: FieldUpload,
    uploadBox: FieldUploadBox,
    uploadAvatar: FieldUploadAvatar,
    multiSelect: FieldMultiSelect,
};

export type InputType = keyof typeof FormMapObj;

export const getField = <T extends InputType>(type: T) => {
    return FormMapObj[type];
};
