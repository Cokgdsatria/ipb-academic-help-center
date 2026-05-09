from fastapi import FastAPI
from app.core.database import engine, Base
from app.models import user, pengajuan, notifikasi 
from app.api.v1.endpoints import auth, ticket
from fastapi.middleware.cors import CORSMiddleware

# Membuat tabel di Supabase berdasarkan model yang ada
Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173", # Default port untuk Vite/React
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(ticket.router, prefix="/api/v1/tickets", tags=["Tickets"])

@app.get("/")
def read_root():
    return {"status": "Online", "database": "Terhubung ke Supabase"}
