from fastapi import APIRouter, Depends, HTTPException, status 
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.auth import LoginRequest, TokenResponse, ForgotPasswordRequest
from app.services.auth_service import AuthService

router = APIRouter()

@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    auth_service = AuthService(db)

    user = auth_service.authenticate(data)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email atau password salah"
        )
    
    return{
        "access_token": user.access_token,
        "token_type": "bearer",
        "role": user.role,
        "nama": user.nama
    }

@router.post("/forgot-password")
def forgot_password(data: ForgotPasswordRequest, db: Session = Depends(get_db)):
    auth_service = AuthService(db)
    success = auth_service.initiate_forgot_password(data.email)

    if not success:
        raise HTTPException(
            status_code=404,
            detail="Email tidak terdaftar"
        )
    
    return {"message": "Instruksi reset password telah dikirim ke email Anda"}