export const emailRule = (v: string) => /.+@.+\..+/.test(v) || 'Введите корректный Email'

export const requiredRule = (v: string) => !!v || 'Это обязательное поле'

export const phoneRule = (v: string) => /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(v)  || 'Введите корректный телефон'

export const limitRule = (v: string, limit: number) => v.length <= limit || `Поле не должно содержать более ${ limit } символов`

export const notEmptyRule = (v: []) => v.length !== 0 || 'Необходимо выбрать хотя бы один элемент'