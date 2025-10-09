import logging
import sys
from .config import settings


def configure_logging(name: str, level: str | None = None) -> logging.Logger:
    """Настройка логгера"""
    log_level = level or ("DEBUG" if settings.DEBUG else "INFO")
    datefmt = "%Y-%m-%d %H:%M:%S"
    log_format = "[%(asctime)s.%(msecs)03d] %(module)10s:%(lineno)-3d %(levelname)-7s - %(message)s"
    logger = logging.getLogger(name)
    logger.setLevel(getattr(logging, log_level.upper()))
    if not logger.handlers:
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setLevel(getattr(logging, log_level.upper()))
        formatter = logging.Formatter(log_format, datefmt)
        console_handler.setFormatter(formatter)
        logger.addHandler(console_handler)

    return logger


logger = configure_logging("PixForge")
