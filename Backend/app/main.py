from fastapi import FastAPI
from app.core.database import engine, Base
from app.models import user, pengajuan, notifikasi  

# Membuat tabel di Supabase berdasarkan model yang ada
Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "Online", "database": "Terhubung ke Supabase"}