from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TicketCreate(BaseModel):
    topik: str
    dosen_id: Optional[int] = None
    subjek: str
    deskripsi: Optional[str] = None

class TicketResponse(BaseModel):
    id: int
    topik: str
    created_at: datetime
    status: str #MENUNGGU, SELESAI, DITOLAK

    # Field modal Detail
    subjek: str
    deskripsi: Optional[str] = None # Detail Masalah
    dosen_id: Optional[int] = None
    komentar_dosen: Optional[str] = None

    class Config:
        from_attributes = True

class DashboardStats(BaseModel):
    total_tickets: int
    pending_tickets: int
    completed_tickets: int
    rejected_tickets: int

class TicketUpdateStatus(BaseModel):
    status: str
    komentar_dosen: Optional[str] = None