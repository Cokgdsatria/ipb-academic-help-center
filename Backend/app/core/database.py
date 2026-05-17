import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Memuat variabel dari file .env
load_dotenv()

# Mengambil URL database dari .env
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

# Membuat engine koneksi
# Jika menggunakan database lokal, tidak perlu parameter tambahan. 
# Untuk Supabase, konfigurasi standar ini sudah cukup, namun menambahkan pool_pre_ping membantu.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_pre_ping=True, # Mengecek apakah koneksi masih hidup sebelum digunakan
    pool_size=10,       # Jumlah koneksi yang dipertahankan dalam pool
    max_overflow=20     # Tambahan koneksi maksimal jika pool penuh
)

# Membuat sesi database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class untuk model-model database (User, Mahasiswa, Dosen)
Base = declarative_base()

# Fungsi bantuan untuk mendapatkan akses database di setiap request API
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()