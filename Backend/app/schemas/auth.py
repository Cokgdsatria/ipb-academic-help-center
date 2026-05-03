from pydantic import BaseModel, EmailStr, Field

class LoginRequest(BaseModel):
    email: EmailStr = Field(..., description="Email pengguna yang sudah terdaftar", example="user@apps.ipb.ac.id")
    password: str = Field(..., description="Password akun pengguna")

# Schema untuk data yang dikembalikan Back-end jika Login berhasil
class TokenResponse(BaseModel):
    access_token: str = Field(..., description="JWT Bearer Token untuk otentikasi API selanjutnya")
    token_type: str = Field(default="bearer", description="Tipe token")
    role: str = Field(..., description="Role user(misal: mahasiswa atau dosen)")
    nama: str = Field(..., description="Nama lengkap pengguna")

class ForgotPasswordRequest(BaseModel):
    email: EmailStr = Field(..., description="Email pengguna yang ingin direset passwordnya", example="user@apps.ipb.ac.id")


