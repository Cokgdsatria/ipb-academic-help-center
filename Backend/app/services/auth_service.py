from sqlalchemy.orm import Session
from app.repositories.user_repository import UserRepository
from app.schemas.auth import LoginRequest
from app.core.security import SecurityHandler

class AuthService:
    def __init__(self, db: Session):
        self.user_repository = UserRepository(db)
        self.security_handler = SecurityHandler()

    def authenticate(self, login_data: LoginRequest):
        user = self.user_repository.get_user_by_email(login_data.email)

        if not user:
            return None
        
        is_valid = self.security_handler.verify_password(
            login_data.password, 
            user.password)
        
        if not is_valid:
            return None
        
        token_data = {
            "sub": user.email,
            "id": user.id_user,
            "role": user.role,
            "nama": user.nama
        }
        access_token = self.security_handler.create_access_token(data=token_data)
        
        user.access_token = access_token
        return user
    
    def initiate_forgot_password(self, email: str):
        user = self.user_repository.get_user_by_email(email)
        if not user:
            return False
        return True