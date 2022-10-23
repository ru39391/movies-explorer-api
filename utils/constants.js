const VALIDATION_ERROR_CODE = 400;
const AUTH_ERROR_CODE = 401;
const ACCESS_ERROR_CODE = 403;
const NOT_FOUND_ERROR_CODE = 404;
const CONFLICT_ERROR_CODE = 409;
const BAD_REQUEST_ERROR_CODE = 500;

const NODE_ENV_DEFAULT = 'development';
const JWT_SECRET_DEFAULT = 'dev-secret';

const errMessageNotFound = {
  user: 'Пользователь не найден',
  movie: 'Объекта с таким ID не существует',
  request: 'Такого ресурса не существует',
};

const errMessageValidation = {
  required: 'Это поле обязательно для заполнения',
  min: 'Введено значение меньше минимально допустимого',
  max: 'Введено значение больше максимально допустимого',
  email: 'Указан некорректный e-mail',
  url: 'Указана некорректная ссылка',
};

const actionMessages = {
  successMovieRemoved: 'Данные удалены',
  successAuth: 'Авторизация прошла успешно',
  errorId: 'Некорректный формат ID объекта',
  errorRequest: 'На сервере произошла ошибка',
  errorAuth: 'Неправильные почта или пароль',
  errorLogin: 'Необходима авторизация',
  errorUser: 'Пользователь с таким e-mail уже существует',
  errorMovieAccess: 'Невозможно удалить данные: недостаточно прав для совершения операции',
  errorCrashTest: 'Сервер сейчас упадёт',
};

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const allowedCors = [
  'https://ru39391-d.students.nomoredomains.icu',
  'http://ru39391-d.students.nomoredomains.icu',
  'http://130.193.49.197',
  'http://localhost:3000',
];

// eslint-disable-next-line no-useless-escape
const patterUrl = /^(https?:\/\/)([w\.]{4})?([a-z0-9\.\-]{3,})([a-z]+)([\Wa-z0-9]+)#?/;

module.exports = {
  patterUrl,
  allowedCors,
  actionMessages,
  errMessageNotFound,
  errMessageValidation,
  NODE_ENV_DEFAULT,
  JWT_SECRET_DEFAULT,
  VALIDATION_ERROR_CODE,
  AUTH_ERROR_CODE,
  ACCESS_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE,
  DEFAULT_ALLOWED_METHODS,
};
