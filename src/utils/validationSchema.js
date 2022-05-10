import * as Yup from "yup";

export const validationSchema = Yup.object({
  anemia: Yup.number()
    .integer()
    .min(0, "Очень коротко!")
    .max(50, "Слишком длинно!")
    .typeError("Данные должны быть числом")
    .required("Не внесены данные"),
  creatin: Yup.number()
    .integer()
    .min(0, "Очень коротко!")
    .max(50, "Слишком длинно!")
    .typeError("Данные должны быть числом")
    .required("Не внесены данные"),
  triglecirid: Yup.number()
    .integer()
    .min(0, "Очень коротко!")
    .max(50, "Слишком длинно!")
    .typeError("Данные должны быть числом")
    .required("Не внесены данные"),
  cpb: Yup.number()
    .integer()
    .min(0, "Очень коротко!")
    .max(50, "Слишком длинно!")
    .typeError("Данные должны быть числом")
    .required("Не внесены данные"),
  frakcia: Yup.number()
    .integer()
    .min(0, "Очень коротко!")
    .max(50, "Слишком длинно!")
    .typeError("Данные должны быть числом")
    .required("Не внесены данные"),
  infarct: Yup.number()
    .integer()
    .min(0, "Очень коротко!")
    .max(50, "Слишком длинно!")
    .typeError("Данные должны быть числом")
    .required("Не внесены данные"),
  porajenie: Yup.number()
    .integer()
    .min(0, "Очень коротко!")
    .max(50, "Слишком длинно!")
    .typeError("Данные должны быть числом")
    .required("Не внесены данные"),
  killip: Yup.number()
    .integer()
    .min(0, "Очень коротко!")
    .max(50, "Слишком длинно!")
    .typeError("Данные должны быть числом")
    .required("Не внесены данные"),
  pnevmonia: Yup.number()
    .integer()
    .min(0, "Очень коротко!")
    .max(50, "Слишком длинно!")
    .typeError("Данные должны быть числом")
    .required("Не внесены данные"),
});
