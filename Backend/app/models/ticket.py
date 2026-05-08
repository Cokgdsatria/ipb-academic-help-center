from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.core.database import Base

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    mahasiswa_id = Column(Integer, ForeignKey("users.id_user"), nullable=False)
    dosen_id = Column(Integer, ForeignKey("users.id_user"), nullable=True)
    topik = Column(String, nullable=False)
    subjek = Column(String, nullable=False)
    deskripsi = Column(Text, nullable=True)
    status = Column(String, default="PENDING")
    komentar_dosen = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
