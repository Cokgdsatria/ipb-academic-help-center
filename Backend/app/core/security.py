from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from app.core.config import settings
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class SecurityHandler:

    SECRET_KEY = settings.SECRET_KEY
    ALGORITHM = settings.ALGORITHM
    ACCESS_TOKEN_EXPIRE_MINUTES = 30

    @staticmethod
    def get_password_hash(password: str) -> str:
        # Truncate password to 72 bytes (bcrypt limitation)
        password_truncated = password[:72]
        return pwd_context.hash(password_truncated)
    
    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        # Truncate password to 72 bytes (bcrypt limitation)
        plain_password_truncated = plain_password[:72]
        return pwd_context.verify(plain_password_truncated, hashed_password)
    
    @staticmethod
    def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
        to_encode = data.copy()

        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else: 
            expire = datetime.now(timezone.utc) + timedelta(minutes=SecurityHandler.ACCESS_TOKEN_EXPIRE_MINUTES)

        to_encode.update({"exp": expire})

        encoded_jwt = jwt.encode(to_encode, SecurityHandler.SECRET_KEY, algorithm=SecurityHandler.ALGORITHM)
        return encoded_jwt