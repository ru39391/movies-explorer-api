const VALIDATION_ERROR_CODE = 400;
const AUTH_ERROR_CODE = 401;
const ACCESS_ERROR_CODE = 403;
const NOT_FOUND_ERROR_CODE = 404;
const CONFLICT_ERROR_CODE = 409;
const BAD_REQUEST_ERROR_CODE = 500;

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

module.exports = {
  actionMessages,
  errMessageNotFound,
  errMessageValidation,
  VALIDATION_ERROR_CODE,
  AUTH_ERROR_CODE,
  ACCESS_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE,
};
