import bcrypt


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Проверяет, совпадает ли пароль с его хешем

    Args:
            plain_password (str): Пароль в открытом виде
            hashed_password (str): Захешированный пароль

    Returns:
            bool: True or False
    """
    return bcrypt.checkpw(plain_password.encode(), hashed_password.encode())


def hashing_password(password: str) -> str:
    """Хеширует пароль и возвращает строку хеша.
    Args:
            password (str): Пароль в открытом видe
    Returns:
            str: Строка хеша
    """
    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    return hashed.decode()
