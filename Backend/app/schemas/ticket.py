from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional

class TicketCreate(BaseModel):
    judul: str
    deskripsi: str
    id_jenis_pengajuan: int
    id_dosen: int
    tanggal_bimbingan: Optional[date] = None  # Optional, hanya untuk bimbingan

class TicketResponse(BaseModel):
    id: int
    subjek: str
    created_at: datetime
    status: str

    deskripsi: Optional[str] = None
    dosen_id: Optional[int] = None
    tanggal_bimbingan: Optional[date] = None
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